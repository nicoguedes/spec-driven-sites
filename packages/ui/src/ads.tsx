/**
 * AdSense Auto Ads wiring — entirely env-gated and no-op without a client id.
 *
 * We use Google **Auto Ads**, which place ads automatically: there are NO manual
 * ad slots / placeholders in this codebase (manual `<ins>` slots cause layout
 * shift and aren't needed). See CLAUDE.md → "no manual ad placeholders".
 *
 * The publisher id comes ONLY from the environment:
 *   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
 * When it's unset, every export here is a no-op and no ad markup is emitted.
 */

/** The configured AdSense client id, or null when unset. */
export const adsenseClientId: string | null =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.startsWith('ca-pub-')
    ? process.env.NEXT_PUBLIC_ADSENSE_CLIENT
    : null;

/**
 * The `google-adsense-account` meta tag value for Next.js `metadata.other`.
 * Returns an empty object when unset, so spreading it is always safe.
 */
export function adSenseMeta(): Record<string, string> {
  return adsenseClientId ? { 'google-adsense-account': adsenseClientId } : {};
}

/**
 * The Auto Ads loader script for the document <head>.
 *
 * IMPORTANT: this is a raw <script>, NOT `next/script`. Under `output: 'export'`
 * `next/script` degrades to `<link rel="preload">` and the ad script never
 * executes. Place this inside <head> in the root layout.
 *
 * Renders nothing when NEXT_PUBLIC_ADSENSE_CLIENT is unset.
 */
export function AdsAutoScript() {
  if (!adsenseClientId) return null;
  return (
    // eslint-disable-next-line @next/next/no-sync-scripts
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
      crossOrigin="anonymous"
    />
  );
}
