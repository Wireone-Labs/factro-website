import type { CSSProperties } from "react";

export const INDUSTRY_THEMES = {
  pharmaceuticals: { accent: "#555bff", soft: "#eef0ff" },
  "medical-devices": { accent: "#299ab5", soft: "#e1f3f7" },
  "food-beverage": { accent: "#ca721d", soft: "#fff1dd" },
  nutraceuticals: { accent: "#339c80", soft: "#e0f2ea" },
  cosmetics: { accent: "#d94b91", soft: "#fce6f1" },
  veterinary: { accent: "#9c7b3d", soft: "#f3eddf" },
  "api-cdmo": { accent: "#8060dc", soft: "#eee9fd" },
};

export type IndustrySlug = keyof typeof INDUSTRY_THEMES;

export function industryTheme(slug: string): CSSProperties {
  const theme = INDUSTRY_THEMES[slug as IndustrySlug];
  return {
    "--accent": `color-mix(in srgb, ${theme.accent}, black 22%)`,
    "--soft": theme.soft,
    "--tint": `color-mix(in srgb, ${theme.soft}, white 55%)`,
    "--industry-line": `color-mix(in srgb, ${theme.accent} 24%, white)`,
  } as CSSProperties;
}
