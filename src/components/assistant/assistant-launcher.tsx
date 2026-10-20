"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { SparkleIcon } from "@/components/ui/icons";

const loadPanel = () => import("./assistant-panel").then((module) => module.AssistantPanel);

const AssistantPanel = dynamic(loadPanel, { ssr: false });

/**
 * Floating entry point for the portfolio assistant; the panel code loads only on first interaction.
 */
export function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /**
   * Mounts and opens the assistant panel.
   */
  function openPanel() {
    setMounted(true);
    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        onPointerEnter={() => void loadPanel()}
        onFocus={() => void loadPanel()}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`group/launcher border-line-strong bg-bg-elevated/90 text-ink hover:border-accent-text/60 fixed right-4 bottom-4 z-40 inline-flex h-12 items-center gap-2.5 rounded-full border pr-5 pl-4 text-sm font-medium shadow-[var(--shadow-3)] backdrop-blur-xl transition-[border-color,transform,opacity] duration-300 sm:right-6 sm:bottom-6 ${
          open ? "pointer-events-none translate-y-2 opacity-0" : "opacity-100"
        }`}
      >
        <span className="bg-accent text-accent-contrast inline-flex size-7 items-center justify-center rounded-full transition-transform duration-500 group-hover/launcher:rotate-45">
          <SparkleIcon size={15} />
        </span>
        <span>
          Ask about my work
        </span>
      </button>
      {mounted ? <AssistantPanel open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
