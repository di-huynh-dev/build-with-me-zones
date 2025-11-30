"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ParticleShape from "@/components/particle-shape";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          "-=0.6"
        )
        .from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 md:py-16 lg:pt-20"
    >
      {/* DottedBackground handled globally in page.tsx */}
      {/* Background Gradient/Shapes */}
      <div
        ref={shapesRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-50"
      >
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl filter" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl filter" />
        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 blur-3xl filter" />
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <ParticleShape type="sphere" className="w-[800px] h-[800px]" />
        </div>
      </div>

      <div className="z-10 flex max-w-4xl flex-col items-center text-center">
        <h1
          ref={titleRef}
          className="mb-4 text-4xl font-bold tracking-tighter sm:text-6xl lg:text-8xl text-zinc-900 dark:text-white"
        >
          {t("title")} <br />
          <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            {t("subtitle")}
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="mb-6 md:mb-10 max-w-2xl text-base sm:text-lg md:text-xl text-zinc-700 dark:text-zinc-300"
        >
          {t("description")}
        </p>
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Link
            href="#zones"
            className="group flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3 sm:px-8 text-sm sm:text-base text-white transition-all hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="https://github.com/di-huynh-dev/build-with-me-zones"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-200 bg-white/50 px-6 py-3 sm:px-8 text-sm sm:text-base text-zinc-900 backdrop-blur-sm transition-all hover:bg-white/80 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:bg-zinc-800"
          >
            {t("viewGitHub")}
          </a>
        </div>
      </div>
    </section>
  );
}
