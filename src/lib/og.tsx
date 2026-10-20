import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

interface OgContent {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  footer: string;
}

const fontDirectory = join(process.cwd(), "src/assets/fonts");

const [serifRegular, serifItalic] = await Promise.all([
  readFile(join(fontDirectory, "InstrumentSerif-Regular.ttf")),
  readFile(join(fontDirectory, "InstrumentSerif-Italic.ttf")),
]);

const fonts = [
  { name: "Instrument Serif", data: serifRegular, style: "normal" as const, weight: 400 as const },
  { name: "Instrument Serif", data: serifItalic, style: "italic" as const, weight: 400 as const },
];

/**
 * Renders the branded 1200×630 Open Graph image shared by the home page and case studies.
 */
export function renderOgImage({ eyebrow, title, accent, subtitle, footer }: OgContent) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#0a0d0e",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(26,127,131,0.45), transparent 45%), linear-gradient(to right, rgba(236,231,221,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,231,221,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 72px 72px, 72px 72px",
          color: "#ece7dd",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: 16,
                border: "1px solid rgba(236,231,221,0.2)",
                backgroundColor: "#131a1b",
                fontFamily: "Instrument Serif",
                fontSize: 38,
              }}
            >
              <span style={{ color: "#72c9c5" }}>Z</span>
              <span>J</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 26, fontWeight: 600 }}>Zeeshan Jamil</span>
              <span style={{ fontSize: 18, color: "#a9a398" }}>Senior Full-Stack Software Engineer</span>
            </div>
          </div>
          <span style={{ fontSize: 18, letterSpacing: 3, textTransform: "uppercase", color: "#72c9c5" }}>{eyebrow}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "Instrument Serif",
              fontSize: 78,
              lineHeight: 1.04,
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            {title}
            {accent ? <span style={{ fontStyle: "italic", color: "#72c9c5", marginLeft: 18 }}>{accent}</span> : null}
          </div>
          <span style={{ fontSize: 26, color: "#a9a398", maxWidth: 900, lineHeight: 1.4 }}>{subtitle}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(236,231,221,0.14)",
            paddingTop: 24,
            fontSize: 20,
            color: "#a9a398",
          }}
        >
          <span>{footer}</span>
          <span>Lahore, Pakistan</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
