"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
  Database,
  Layout,
  Server,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

export function BentoGridSection() {
  const { language } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const bentoItems = [
    {
      title: language === "vi" ? "Công Nghệ" : "The Tech Stack",
      description:
        language === "vi"
          ? "Xây dựng với công nghệ tiên tiến"
          : "Built with the bleeding edge",
      className: "col-span-1 md:col-span-2 row-span-2",
      content: (
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 p-6 flex flex-col items-center justify-center gap-4 group-hover:scale-105 transition-transform duration-500">
          <div className="grid grid-cols-2 gap-4 opacity-50">
            <Layout className="w-12 h-12 text-indigo-500" />
            <Database className="w-12 h-12 text-pink-500" />
            <Server className="w-12 h-12 text-blue-500" />
            <Cpu className="w-12 h-12 text-orange-500" />
          </div>
        </div>
      ),
    },
    {
      title: "Open Source",
      description:
        language === "vi"
          ? "Đóng góp cho cộng đồng"
          : "Giving back to the community",
      className: "col-span-1 md:col-span-1 row-span-1",
      content: (
        <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-emerald-500/10 p-6 flex items-center justify-center">
          <Github className="w-24 h-24 text-green-600/20 group-hover:text-green-600/40 transition-colors" />
        </div>
      ),
    },
    {
      title: language === "vi" ? "Cộng Đồng" : "Community",
      description:
        language === "vi" ? "Tham gia thảo luận" : "Join the discussion",
      className: "col-span-1 md:col-span-1 row-span-1",
      content: (
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 p-6 flex items-center justify-center gap-4">
          <Twitter className="w-10 h-10 text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
          <Linkedin className="w-10 h-10 text-blue-700 opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>
      ),
    },
    {
      title: language === "vi" ? "Về Tôi" : "About Me",
      description:
        language === "vi"
          ? "Nhà phát triển đằng sau mã nguồn"
          : "The developer behind the code",
      className: "col-span-1 md:col-span-2 row-span-1",
      content: (
        <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-red-500/10 p-6 flex items-center">
          <div className="flex -space-x-4 ml-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full border-2 border-background bg-gray-300"
              />
            ))}
          </div>
        </div>
      ),
    },
  ];

  useGSAP(
    () => {
      const validCards = cardsRef.current.filter(Boolean);

      if (validCards.length === 0) return;

      gsap.fromTo(
        validCards,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">
            {language === "vi"
              ? "Hệ Sinh Thái Toàn Diện"
              : "Comprehensive Ecosystem"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === "vi"
              ? "Một hệ sinh thái hoàn chỉnh cho phát triển hiện đại."
              : "A complete ecosystem for modern development."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          {bentoItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-black/10 bg-muted/30 transition-all duration-500 hover:shadow-2xl hover:border-black/20",
                item.className
              )}
            >
              {/* Content Layer */}
              {item.content}

              {/* Text Layer */}
              <div className="absolute bottom-0 left-0 p-6 z-10 w-full bg-linear-to-t from-background/80 to-transparent backdrop-blur-[2px]">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {item.description}
                    </p>
                  </div>
                  <div className="bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
