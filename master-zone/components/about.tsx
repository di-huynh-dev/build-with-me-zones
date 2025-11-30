"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const t = useTranslations("about");
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(textRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        imageRef.current,
        {
          x: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-16 md:py-20 lg:py-24 px-4"
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
        <div ref={textRef} className="space-y-6 md:space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-zinc-900 dark:text-white">
            {t("heading")}{" "}
            <span className="text-blue-500 dark:text-blue-400">
              {t("headingHighlight")}
            </span>
            ?
          </h2>
          <div className="space-y-4 md:space-y-6 text-base md:text-lg text-zinc-600 dark:text-zinc-400">
            <p>{t("paragraph1")}</p>
            <p>
              <strong className="text-zinc-900 dark:text-white">
                {t("paragraph2Bold")}
              </strong>{" "}
              {t("paragraph2")}
            </p>
            <p>{t("paragraph3")}</p>
          </div>
          <Link
            href="https://github.com/di-huynh-dev/build-with-me-zones"
            className="inline-flex items-center gap-2 text-sm md:text-base text-blue-600 hover:text-blue-500 transition-colors dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("cta")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div ref={imageRef} className="relative">
          <div className="aspect-square overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/30 p-6 md:p-8 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
            <div className="h-full w-full rounded-4xl bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-white/20 flex items-center justify-center dark:border-white/5">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-zinc-900/20 dark:text-white/20 mb-2">
                  100%
                </div>
                <div className="text-zinc-500 uppercase tracking-widest text-xs md:text-sm">
                  {t("badge")}
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 h-32 w-32 md:h-40 md:w-40 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 md:h-40 md:w-40 rounded-full bg-purple-500/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
