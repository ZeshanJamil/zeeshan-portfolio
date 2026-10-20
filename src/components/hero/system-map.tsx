import type { CSSProperties, ReactNode } from "react";
import { ParallaxStage } from "./parallax-stage";

/**
 * Builds the transform style for a parallax layer at the given depth (in pixels of travel).
 */
function depth(amount: number): CSSProperties {
  return {
    transform: `translate3d(calc(var(--px) * ${amount}px), calc(var(--py) * ${amount}px), 0)`,
  };
}

interface LayerProps {
  className: string;
  amount: number;
  delay: number;
  children: ReactNode;
}

/**
 * Positions a parallax layer; the inner element owns the entrance animation so it never fights the parallax transform.
 */
function Layer({ className, amount, delay, children }: LayerProps) {
  return (
    <div aria-hidden="true" className={`absolute will-change-transform ${className}`} style={depth(amount)}>
      <div className="animate-fade-rise" style={{ animationDelay: `${delay}ms` }}>
        {children}
      </div>
    </div>
  );
}

const rings = [
  { label: "UI", value: 0.72 },
  { label: "API", value: 0.9 },
  { label: "Data", value: 0.56 },
  { label: "Ops", value: 0.82 },
];

const codeLines = [
  { indent: 0, tokens: [["k", "export async function "], ["f", "buildFeature"], ["p", "(spec: Spec) {"]] },
  { indent: 1, tokens: [["k", "const "], ["p", "data = "], ["k", "await "], ["f", "api"], ["p", ".fetch(spec)"]] },
  { indent: 1, tokens: [["k", "const "], ["p", "view = "], ["f", "compose"], ["p", "(data)"]] },
  { indent: 1, tokens: [["k", "return "], ["f", "review"], ["p", "(view)"]] },
  { indent: 0, tokens: [["p", "}"]] },
] as const;

const tokenClass: Record<string, string> = {
  k: "text-accent-text",
  f: "text-ink",
  p: "text-muted",
};

/**
 * Original, illustrative hero composition: code, a service graph and a dashboard layer.
 * It is decorative and intentionally abstract — not a screenshot of any product.
 */
export function SystemMap() {
  return (
    <figure className="relative mx-auto w-full max-w-136" aria-labelledby="system-map-caption">
      <ParallaxStage className="relative aspect-[5/5.4] w-full">
        <div
          aria-hidden="true"
          className="absolute -inset-10 rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
        />

        <Layer className="top-[4%] right-0 left-[10%]" amount={6} delay={80}>
          <div className="card overflow-hidden rounded-2xl shadow-3">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex gap-1.5">
                <span className="bg-surface-3 size-2.5 rounded-full" />
                <span className="bg-surface-3 size-2.5 rounded-full" />
                <span className="bg-surface-3 size-2.5 rounded-full" />
              </div>
              <span className="text-subtle font-mono text-[0.625rem] tracking-wider uppercase">
                product / overview
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3 p-4">
              {rings.map((ring, index) => {
                const circumference = 2 * Math.PI * 16;
                return (
                  <div key={ring.label} className="bg-surface-2 flex flex-col items-center gap-2 rounded-xl py-3">
                    <svg viewBox="0 0 40 40" className="size-12 -rotate-90">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="var(--border-strong)" strokeWidth="3" />
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke={index === 2 ? "var(--warn)" : "var(--accent-text)"}
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="animate-draw"
                        style={
                          {
                            "--dash": circumference,
                            strokeDasharray: `${circumference * ring.value} ${circumference}`,
                            animationDelay: `${400 + index * 120}ms`,
                          } as CSSProperties
                        }
                      />
                    </svg>
                    <span className="text-subtle font-mono text-[0.625rem] tracking-wider uppercase">
                      {ring.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="px-4 pb-4">
              <div className="bg-surface-2 rounded-xl p-3">
                <svg viewBox="0 0 300 70" className="h-16 w-full" preserveAspectRatio="none">
                  <path
                    d="M0 55 C 30 50, 45 30, 75 34 S 120 58, 150 40 S 200 12, 230 22 S 275 40, 300 18"
                    fill="none"
                    stroke="var(--accent-text)"
                    strokeWidth="2"
                    className="animate-draw"
                    style={{ "--dash": 420, animationDelay: "700ms" } as CSSProperties}
                  />
                  <path
                    d="M0 55 C 30 50, 45 30, 75 34 S 120 58, 150 40 S 200 12, 230 22 S 275 40, 300 18 L300 70 L0 70 Z"
                    fill="var(--accent-soft)"
                  />
                </svg>
              </div>
              <div className="mt-3 space-y-2">
                {[78, 64, 88].map((width, index) => (
                  <div key={width} className="flex items-center gap-3">
                    <span className="bg-surface-3 h-2 w-10 rounded-full" />
                    <span
                      className="h-2 rounded-full"
                      style={{
                        width: `${width}%`,
                        background: index === 1 ? "var(--surface-3)" : "var(--border-strong)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layer>

        <Layer className="bottom-[6%] left-0 w-[70%]" amount={16} delay={220}>
          <div className="rounded-2xl border border-line-strong bg-bg-elevated/95 p-4 shadow-3 backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-subtle font-mono text-[0.625rem] tracking-wider uppercase">feature.ts</span>
              <span className="text-accent-text font-mono text-[0.625rem]">TypeScript</span>
            </div>
            <pre className="overflow-hidden font-mono text-[0.6875rem] leading-[1.7] sm:text-xs">
              {codeLines.map((line, index) => (
                <div key={index} style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
                  {line.tokens.map(([kind, text], tokenIndex) => (
                    <span key={tokenIndex} className={tokenClass[kind]}>
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </pre>
          </div>
        </Layer>

        <Layer className="right-[-3%] bottom-[30%] w-[38%]" amount={26} delay={360}>
          <div className="rounded-2xl border border-line-strong bg-surface/95 p-4 shadow-2 backdrop-blur-md">
            <span className="text-subtle font-mono text-[0.625rem] tracking-wider uppercase">system</span>
            <svg viewBox="0 0 160 92" className="mt-2 w-full">
              <path
                d="M24 22 L80 46 L136 22 M80 46 L80 76"
                fill="none"
                stroke="var(--border-strong)"
                strokeWidth="1.5"
                strokeDasharray="3 4"
              />
              <path
                d="M24 22 L80 46 L136 22 M80 46 L80 76"
                fill="none"
                stroke="var(--accent-text)"
                strokeWidth="1.5"
                className="animate-draw"
                style={{ "--dash": 220, animationDelay: "900ms" } as CSSProperties}
              />
              {[
                { x: 24, y: 22, label: "UI" },
                { x: 136, y: 22, label: "API" },
                { x: 80, y: 46, label: "" },
                { x: 80, y: 76, label: "DB" },
              ].map((node) => (
                <g key={`${node.x}-${node.y}`}>
                  <circle cx={node.x} cy={node.y} r={node.label ? 9 : 4} fill="var(--surface-2)" stroke="var(--accent-text)" strokeWidth="1.5" />
                  {node.label ? (
                    <text
                      x={node.x}
                      y={node.y + 3}
                      textAnchor="middle"
                      fontSize="7"
                      fontFamily="var(--font-mono)"
                      fill="var(--text)"
                    >
                      {node.label}
                    </text>
                  ) : null}
                </g>
              ))}
            </svg>
          </div>
        </Layer>

        <div aria-hidden="true" className="absolute top-[1%] left-[2%] flex flex-col gap-2" style={depth(34)}>
          {["React", "Node.js"].map((label, index) => (
            <span
              key={label}
              className="chip animate-fade-rise bg-bg-elevated/90 text-ink shadow-2 backdrop-blur"
              style={{ animationDelay: `${500 + index * 120}ms` }}
            >
              <span className="bg-accent-text size-1.5 rounded-full" />
              {label}
            </span>
          ))}
        </div>
      </ParallaxStage>
      <figcaption id="system-map-caption" className="text-subtle mt-4 text-center font-mono text-[0.6875rem] tracking-wide">
        Illustration — interface, API and data layers working as one product.
      </figcaption>
    </figure>
  );
}
