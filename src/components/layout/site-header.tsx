"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigation, profile } from "@/content/profile";
import { buttonClass } from "@/components/ui/button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { ThemeToggle } from "./theme-toggle";
import { Wordmark } from "./wordmark";

/**
 * Tracks which home-page section is currently in view so the matching nav link can be highlighted.
 */
function useActiveSection(enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const ids = [...navigation.map((item) => item.href.split("#")[1]), "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      setActive(null);
    };
  }, [enabled]);

  return enabled ? active : null;
}

/**
 * Sticky site header with active-section indication, theme toggle and an accessible mobile menu.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) closeMenu(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, closeMenu]);

  const elevated = compact || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-300 ${
          elevated
            ? "border-b border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`container-page flex items-center justify-between gap-6 transition-[height] duration-300 ${
            compact ? "h-16" : "h-20"
          }`}
        >
          <Link href="/" className="rounded-md" aria-label={`${profile.name} — home`}>
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const id = item.href.split("#")[1];
                const isActive = active === id;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                        isActive ? "text-ink" : "text-muted hover:text-ink"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`bg-accent-text absolute inset-x-3.5 -bottom-0.5 h-px origin-left transition-transform duration-300 ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <span className="hidden sm:block">
              <Link href="/#contact" className={buttonClass("primary", "md")}>
                Let&apos;s talk
              </Link>
            </span>
            <button
              ref={menuButtonRef}
              type="button"
              className="text-ink hover:bg-surface-2 inline-flex size-10 items-center justify-center rounded-full md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            >
              {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!menuOpen}
        className="bg-bg fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line md:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col justify-between py-8">
          <ul className="flex flex-col">
            {[...navigation, { label: "Contact", href: "/#contact" }].map((item, index) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => closeMenu(false)}
                  className="display flex items-baseline justify-between py-4 text-3xl"
                >
                  {item.label}
                  <span className="text-subtle font-mono text-xs">0{index + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3">
            <a href={`mailto:${profile.email}`} className="text-muted text-sm">
              {profile.email}
            </a>
            <Link href="/#contact" onClick={() => closeMenu(false)} className={buttonClass("primary", "lg")}>
              Let&apos;s talk
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
