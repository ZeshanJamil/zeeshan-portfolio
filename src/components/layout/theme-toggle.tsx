"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

type Theme = "light" | "dark";

/**
 * Reads the theme currently applied to the document.
 */
function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/**
 * Resolves the stored theme, falling back to the operating system preference.
 */
function resolvePreferredTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/**
 * Subscribes to theme attribute changes on the root element.
 */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

/**
 * Toggles between the dark and light themes and persists the choice.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark");

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", resolvePreferredTheme());
    document.documentElement.classList.add("js");

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {}
      document.documentElement.setAttribute("data-theme", event.matches ? "light" : "dark");
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  /**
   * Switches to the opposite theme and remembers it.
   */
  function toggle() {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`text-muted hover:text-ink hover:bg-surface-2 inline-flex size-10 items-center justify-center rounded-full border border-transparent transition-colors hover:border-line ${className}`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
