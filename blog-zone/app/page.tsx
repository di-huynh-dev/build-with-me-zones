"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { JourneySection } from "@/components/home/journey-section";
import { FocusSection } from "@/components/home/focus-section";
import { LatestPostsSection } from "@/components/home/latest-posts-section";
import { CtaSection } from "@/components/home/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <JourneySection />
        <FocusSection />
        <LatestPostsSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
