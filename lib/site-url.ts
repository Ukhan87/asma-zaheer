export const PUBLIC_SITE_URL = "https://asma-zaheer-portfolio.vercel.app";

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

  if (vercelHost?.trim()) {
    return PUBLIC_SITE_URL;
  }

  return "http://localhost:3000";
}
