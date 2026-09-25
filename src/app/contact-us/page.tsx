import type { Metadata } from "next";
import DemoPage from "@/app/demo/page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Talk to the Factro team and see the platform run on your manufacturing workflows and data.",
  path: "/contact-us",
});

export default DemoPage;
