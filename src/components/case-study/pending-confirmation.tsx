/**
 * Development-only checklist of case-study details that still need the owner's confirmation.
 * Hidden in production builds so unverified gaps never reach visitors.
 */
export function PendingConfirmation({ items, file }: { items: string[]; file: string }) {
  if (process.env.NODE_ENV === "production" || items.length === 0) return null;

  return (
    <aside
      aria-label="Content to confirm"
      className="border-warn/50 bg-warn/10 rounded-2xl border border-dashed p-6 text-sm"
    >
      <p className="text-warn font-mono text-xs tracking-[0.14em] uppercase">TODO · visible in development only</p>
      <p className="text-ink mt-2">
        Confirm these details in <code className="font-mono">{file}</code> before publishing:
      </p>
      <ul className="text-muted mt-3 list-disc space-y-1.5 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
