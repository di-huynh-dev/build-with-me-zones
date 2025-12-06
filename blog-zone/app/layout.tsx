import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/i18n-provider";
import { GSAPProvider } from "@/components/gsap-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000"
  ),
  title: {
    default: "Code & Tales - Modern Blog Platform",
    template: "%s | DeCode & Tales vBlog",
  },
  description:
    "A modern blog platform built with Next.js, Shadcn UI. Share my knowledge and stories with the world.",
  keywords: [
    "blog",
    "nextjs",
    "react",
    "typescript",
    "shadcn ui",
    "gsap",
    "seo",
    "programming",
    "development",
  ],
  authors: [{ name: "Code & Tales Team" }],
  creator: "Code & Tales",
  publisher: "Code & Tales",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: "Code & Tales - Modern Blog Platform",
    description: "A modern, SEO-optimized blog platform for developers",
    siteName: "Code & Tales",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code & Tales - Modern Blog Platform",
    description: "A modern, SEO-optimized blog platform for developers",
    creator: "@Code & Tales",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="vi" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${ibmPlexMono.variable} font-sans antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <I18nProvider defaultLanguage="vi">
              <GSAPProvider>{children}</GSAPProvider>
            </I18nProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
