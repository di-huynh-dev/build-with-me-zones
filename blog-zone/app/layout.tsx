import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/i18n-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000"
  ),
  title: {
    default: "DevBlog - Modern Blog Platform",
    template: "%s | DevBlog",
  },
  description:
    "A modern, SEO-optimized blog platform built with Next.js, Shadcn UI, and GSAP animations. Share your knowledge and stories with the world.",
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
  authors: [{ name: "DevBlog Team" }],
  creator: "DevBlog",
  publisher: "DevBlog",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: "DevBlog - Modern Blog Platform",
    description: "A modern, SEO-optimized blog platform for developers",
    siteName: "DevBlog",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevBlog - Modern Blog Platform",
    description: "A modern, SEO-optimized blog platform for developers",
    creator: "@devblog",
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
        <body className={`${inter.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <I18nProvider defaultLanguage="vi">{children}</I18nProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
