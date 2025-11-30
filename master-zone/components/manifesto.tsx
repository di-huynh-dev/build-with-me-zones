"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const t = useTranslations("manifesto");
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray(".manifesto-line");

      lines.forEach((line: any) => {
        gsap.from(line, {
          opacity: 0.1,
          y: 20,
          duration: 1,
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-16 md:py-20 lg:py-24 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 md:mb-16">
          <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest">
            {t("vision")}
          </h2>
        </div>

        <div ref={textRef} className="space-y-8 md:space-y-12">
          <p className="manifesto-line text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-zinc-900 dark:text-white">
            {t("title1")}
          </p>
          <p className="manifesto-line text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-zinc-500 dark:text-zinc-500">
            {t("title2")}
          </p>
          <p className="manifesto-line text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-zinc-900 dark:text-white">
            {t("title3")}
          </p>
          <p className="manifesto-line text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-zinc-500 dark:text-zinc-500">
            {t("title4")}
          </p>
        </div>

        <div className="mt-16 md:mt-24 lg:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-zinc-200 dark:border-zinc-800 pt-12 md:pt-16">
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
              {t("points.modular.title")}
            </h3>
            <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300">
              {t("points.modular.description")}
            </p>
          </div>
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
              {t("points.scalable.title")}
            </h3>
            <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300">
              {t("points.scalable.description")}
            </p>
          </div>
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
              {t("points.limitless.title")}
            </h3>
            <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300">
              {t("points.limitless.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
