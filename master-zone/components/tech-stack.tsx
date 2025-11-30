"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    name: "React",
    icon: "/icons/React_light.svg",
  },
  {
    name: "Next.js",
    icon: "/icons/nextjs_icon_dark.svg",
  },
  {
    name: "Claude",
    icon: "/icons/claude-ai-icon.svg",
  },
  {
    name: "Bun",
    icon: "/icons/bun.svg",
  },
  {
    name: "NestJS",
    icon: "/icons/nestjs.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "/icons/tailwindcss.svg",
  },
  {
    name: "N8N",
    icon: "/icons/n8n_wordmark_dark.svg",
  },
  {
    name: "Hugging Face",
    icon: "/icons/hugging_face.svg",
  },
  {
    name: "NestJS",
    icon: "/icons/nestjs.svg",
  },
  {
    name: "Vue",
    icon: "/icons/vue.svg",
  },
];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // Clone items for infinite loop
      const items = Array.from(track.children);
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
      });

      // Horizontal scroll animation
      gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      // Fade in on scroll
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-y border-white/10 bg-white/5 py-12 backdrop-blur-sm dark:border-white/5 dark:bg-black/5"
    >
      <div className="absolute inset-0 bg-linear-to-r from-zinc-50 via-transparent to-zinc-50 z-10 pointer-events-none dark:from-black dark:to-black" />

      <div className="mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Powered By Modern Tech
        </p>
      </div>

      <div className="flex overflow-hidden">
        <div ref={trackRef} className="flex min-w-full gap-12 px-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex shrink-0 items-center gap-3 rounded-full border border-zinc-200 bg-white/50 px-6 py-3 backdrop-blur-md dark:border-white/10 dark:bg-white/5"
            >
              <div className="relative h-5 w-5 flex items-center justify-center">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
