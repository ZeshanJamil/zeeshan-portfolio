import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AssistantLauncher } from "@/components/assistant/assistant-launcher";
import { JsonLd } from "@/components/seo/json-ld";
import { profile } from "@/content/profile";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.setAttribute('data-theme',t)}catch(e){}})()`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${profile.name}`,
  },
  description: site.description,
  applicationName: site.shortTitle,
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  keywords: [
    "Zeeshan Jamil",
    "Senior Full-Stack Engineer",
    "Senior React Engineer",
    "React developer",
    "Node.js developer",
    "TypeScript",
    "Next.js",
    "ELD software",
    "Hours of Service",
    "Lahore",
  ],
  alternates: site.hasProductionUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.shortTitle,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d0e" },
    { media: "(prefers-color-scheme: light)", color: "#f5f2ec" },
  ],
  colorScheme: "dark light",
};

/**
 * Root layout: fonts, theme bootstrapping, header, footer and site-wide helpers.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="bg-accent text-accent-contrast fixed top-3 left-3 z-[100] -translate-y-24 rounded-full px-4 py-2 text-sm font-medium transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <AssistantLauncher />
      </body>
    </html>
  );
}
