import { NextResponse } from "next/server";

interface DemoRequestBody {
  name: string;
  email: string;
  company: string;
  size: string;
  interests: string[];
  message?: string;
}

function isDemoRequestBody(value: unknown): value is DemoRequestBody {
  if (!value || typeof value !== "object") return false;
  const body = value as Record<string, unknown>;
  return (
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.email === "string" &&
    body.email.trim().length > 0 &&
    typeof body.company === "string" &&
    body.company.trim().length > 0 &&
    typeof body.size === "string" &&
    body.size.trim().length > 0 &&
    Array.isArray(body.interests) &&
    body.interests.every((i) => typeof i === "string")
  );
}

function buildMessage(body: DemoRequestBody) {
  const interests = body.interests.length > 0 ? body.interests.join(", ") : "—";
  const message = body.message?.trim() || "—";

  return [
    `**New demo request — ${body.company}**`,
    "",
    `**Name:** ${body.name}`,
    `**Email:** ${body.email}`,
    `**Company size:** ${body.size}`,
    `**Interested in:** ${interests}`,
    `**Message:** ${message}`,
  ].join("\n");
}

export async function POST(request: Request) {
  const token = process.env.CLICKUP_API_TOKEN;
  const workspaceId = process.env.CLICKUP_WORKSPACE_ID;
  const channelId = process.env.CLICKUP_CHANNEL_ID;

  if (!token || !workspaceId || !channelId) {
    console.error("Missing ClickUp environment variables");
    return NextResponse.json(
      { error: "Server is not configured to receive demo requests." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isDemoRequestBody(body)) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://api.clickup.com/api/v3/workspaces/${workspaceId}/chat/channels/${channelId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "message",
          content_format: "text/md",
          content: buildMessage(body),
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ClickUp API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Could not deliver your request. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ClickUp API request failed:", error);
    return NextResponse.json(
      { error: "Could not deliver your request. Please try again." },
      { status: 502 },
    );
  }
}
