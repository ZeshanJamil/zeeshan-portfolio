import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Zeeshan Jamil — Senior Full-Stack Software Engineer building reliable web products with React and Node.js.";
export const size = ogSize;
export const contentType = "image/png";

/**
 * Generates the default social preview image for the site.
 */
export default async function Image() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: "I build reliable web products, from complex interfaces to full-stack",
    accent: "systems.",
    subtitle: "5+ years with React, Node.js and TypeScript — including trucking compliance software like MyDriverBook and LogELD.",
    footer: "React · Node.js · TypeScript · Next.js",
  });
}
