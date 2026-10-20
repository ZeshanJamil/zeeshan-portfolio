"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Exposes pointer position as `--px` / `--py` CSS variables (-1 to 1) so child layers can parallax.
 * Skipped entirely for touch-first devices and visitors who prefer reduced motion.
 */
export function ParallaxStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    const host = element.closest<HTMLElement>("[data-parallax-host]") ?? element;
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      element.style.setProperty("--px", currentX.toFixed(4));
      element.style.setProperty("--py", currentY.toFixed(4));
      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      schedule();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      schedule();
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ ["--px" as string]: 0, ["--py" as string]: 0 }}>
      {children}
    </div>
  );
}
