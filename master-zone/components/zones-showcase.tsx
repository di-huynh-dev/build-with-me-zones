"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Layout,
  BookOpen,
  Code,
  Layers,
  Box,
  Cpu,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ParticleShape from "@/components/particle-shape";

import { useTranslations } from "next-intl";

export default function ZonesShowcase() {
  const t = useTranslations("zones");
  const containerRef = useRef<HTMLDivElement>(null);

  const zones = [
    {
      id: "master",
      title: t("items.master.title"),
      subtitle: t("items.master.subtitle"),
      description: t("items.master.description"),
      features: [
        t("items.master.features.0"),
        t("items.master.features.1"),
        t("items.master.features.2"),
      ],
      icon: Layout,
      href: "/",
      shape: "cube",
      color: "blue",
    },
    {
      id: "blog",
      title: t("items.blog.title"),
      subtitle: t("items.blog.subtitle"),
      description: t("items.blog.description"),
      features: [
        t("items.blog.features.0"),
        t("items.blog.features.1"),
        t("items.blog.features.2"),
      ],
      icon: BookOpen,
      href: "/blog",
      shape: "sphere",
      color: "purple",
    },
  ];

  useGSAP(
    () => {
      gsap.from(".zone-row", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="zones" ref={containerRef} className="py-32 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter text-zinc-900 dark:text-white">
            {t("title")}
          </h2>
          <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-32">
          {zones.map((zone, index) => (
            <ZoneRow
              key={zone.id}
              zone={zone}
              index={index}
              ctaText={t("cta")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ZoneRow({
  zone,
  index,
  ctaText,
}: {
  zone: any;
  index: number;
  ctaText: string;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`zone-row flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
        !isEven ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Visual Side */}
      <div className="w-full lg:w-1/2 relative group">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 rounded-[3rem] blur-3xl transform group-hover:scale-105 transition-transform duration-700" />
        <div className="relative aspect-square rounded-[3rem] border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <ParticleShape
              type={zone.shape}
              className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <zone.icon className="w-4 h-4" />
          <span>{zone.subtitle}</span>
        </div>

        <h3 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white leading-tight">
          {zone.title}
        </h3>

        <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {zone.description}
        </p>

        <ul className="space-y-4">
          {zone.features.map((feature: string, i: number) => (
            <li
              key={i}
              className="flex items-center gap-3 text-zinc-800 dark:text-zinc-200"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <ChevronRight className="w-4 h-4" />
              </div>
              {feature}
            </li>
          ))}
        </ul>

        <div className="pt-4">
          <Link
            href={zone.href}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            {ctaText}
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
