import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@sites/ui/theme';
import { themeNoFlashScript } from '@sites/ui/no-flash';
import { AdsAutoScript, adSenseMeta } from '@sites/ui/ads';
import { ErrorMonitor } from '@sites/ui/monitoring';
import { siteUrl } from '@sites/ui/seo';
import { getDictionary } from './i18n/dictionaries';
import { defaultLocale } from './i18n/config';

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: dict.home.metaTitle,
    template: '%s | Example Toolkit',
  },
  description: dict.home.metaDescription,
  icons: { icon: '/favicon.svg' },
  // AdSense account meta — empty object when NEXT_PUBLIC_ADSENSE_CLIENT is unset.
  other: { ...adSenseMeta() },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Auto Ads loader — raw <script>, renders nothing when the client id is unset. */}
        <AdsAutoScript />
        {/* Set the dark class before paint to avoid a flash of light theme. */}
        <script dangerouslySetInnerHTML={themeNoFlashScript()} />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <ErrorMonitor />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
