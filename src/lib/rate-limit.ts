interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Map<string, Bucket>>();

/**
 * Best-effort, in-memory sliding-window rate limiter keyed by scope and client identifier.
 * State lives per server instance, so use a shared store (e.g. Redis) for multi-instance deployments.
 */
export function rateLimit(scope: string, key: string, limit: number, windowMs: number): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  let scoped = buckets.get(scope);
  if (!scoped) {
    scoped = new Map();
    buckets.set(scope, scoped);
  }

  const bucket = scoped.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((time) => now - time < windowMs);

  if (bucket.hits.length >= limit) {
    scoped.set(key, bucket);
    const retryAfter = Math.ceil((windowMs - (now - bucket.hits[0])) / 1000);
    return { allowed: false, retryAfter };
  }

  bucket.hits.push(now);
  scoped.set(key, bucket);

  if (scoped.size > 5000) {
    for (const [entryKey, entry] of scoped) {
      if (entry.hits.every((time) => now - time >= windowMs)) scoped.delete(entryKey);
    }
  }

  return { allowed: true, retryAfter: 0 };
}

/**
 * Extracts a client identifier from proxy headers for rate limiting; never logged or stored beyond memory.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous";
}
