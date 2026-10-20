import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

/**
 * Web app manifest used for install prompts and browser theming.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Portfolio`,
    short_name: profile.name,
    description: profile.headline,
    start_url: "/",
    display: "browser",
    background_color: "#0a0d0e",
    theme_color: "#0a0d0e",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
