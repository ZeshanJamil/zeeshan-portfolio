export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

const base =
  "group/button inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-contrast shadow-[0_8px_24px_-12px_var(--glow)] hover:bg-accent-hover",
  secondary:
    "border border-line-strong bg-surface/60 text-ink hover:border-accent-text/60 hover:bg-surface-2",
  ghost: "text-ink hover:bg-surface-2",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.9375rem]",
};

/**
 * Builds the class list shared by every button-styled link or button.
 */
export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = "",
): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}
