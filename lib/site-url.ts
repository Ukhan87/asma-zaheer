export function resolveSiteUrl(
  explicit: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
  vercelHost: string | undefined = process.env.VERCEL_URL,
): string {
  const trimmed = explicit?.trim();
  if (trimmed) {
    try {
      return new URL(trimmed).origin;
    } catch {
      // Invalid NEXT_PUBLIC_SITE_URL — fall through.
    }
  }

  const host = vercelHost?.trim();
  if (host) {
    return `https://${host.replace(/^https?:\/\//, "")}`;
  }

  return "http://localhost:3000";
}
