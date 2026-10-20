import { profile } from "@/content/profile";

/**
 * Monogram plus name lockup used in the header and footer.
 */
export function Wordmark() {
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="border-line-strong bg-surface relative inline-flex size-9 items-center justify-center overflow-hidden rounded-[10px] border"
      >
        <span className="display text-accent-text text-[1.35rem] leading-none">Z</span>
        <span className="display text-ink -ml-0.5 text-[1.35rem] leading-none">J</span>
        <span className="bg-accent-text absolute right-1.5 bottom-1.5 size-1 rounded-full" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-ink text-[0.9375rem] font-medium tracking-tight whitespace-nowrap">{profile.name}</span>
        <span className="text-subtle hidden font-mono text-[0.6875rem] tracking-wide lg:block">
          React · Node.js · TypeScript
        </span>
      </span>
    </span>
  );
}
