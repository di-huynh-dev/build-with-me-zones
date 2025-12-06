import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { StickyScrollSection } from "@/components/home/sticky-scroll-section";
import { BentoGridSection } from "@/components/home/bento-grid";
import { CtaSection } from "@/components/home/cta-section";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Code & Tales - Trang chủ",
  description:
    "Nền tảng chia sẻ kiến thức lập trình, dự án cá nhân và góc nhìn về nghề Developer. Khám phá các bài viết về Next.js, React, GSAP và nhiều công nghệ hiện đại khác.",
  alternates: {
    canonical: "https://codeandtales.com",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <StickyScrollSection />
        <BentoGridSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
