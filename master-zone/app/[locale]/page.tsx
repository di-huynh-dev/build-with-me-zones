"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/hero";
import SmoothScroller from "@/components/smooth-scroller";
import Navbar from "@/components/navbar";
import DottedBackground from "@/components/dotted-background";

// Lazy load below-the-fold components
const ZonesShowcase = dynamic(() => import("@/components/zones-showcase"));
const About = dynamic(() => import("@/components/about"));
const Footer = dynamic(() => import("@/components/footer"));
const Manifesto = dynamic(() => import("@/components/manifesto"));

export default function Home() {
  return (
    <main className="relative min-h-screen text-zinc-900 dark:text-white selection:bg-blue-500/30">
      <DottedBackground />
      <SmoothScroller />
      <Navbar />
      <Hero />
      <Manifesto />
      <ZonesShowcase />
      <About />
      <Footer />
    </main>
  );
}
