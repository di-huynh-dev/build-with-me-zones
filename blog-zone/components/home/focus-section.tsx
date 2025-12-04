"use client";

import { useRef, useEffect } from "react";
import { Code2, Zap, BookOpen } from "lucide-react";
import { FeatureCard } from "@/components/feature-card";
import { SectionHeader } from "@/components/section-header";
import { useI18n } from "@/lib/i18n-context";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FocusSection() {
  const { language } = useI18n();
  const featuresRef = useRef<HTMLDivElement>(null);

  // Key topics data
  const keyTopics = [
    {
      icon: Code2,
      title: "Frontend & UI/UX",
      description:
        language === "vi"
          ? "React, Next.js, Tailwind CSS và tư duy thiết kế giao diện"
          : "React, Next.js, Tailwind CSS and UI/UX design thinking",
    },
    {
      icon: Zap,
      title: "Backend & System",
      description:
        language === "vi"
          ? "Node.js, Database, System Design và tối ưu hiệu năng"
          : "Node.js, Database, System Design and performance optimization",
    },
    {
      icon: BookOpen,
      title: language === "vi" ? "Dev Life" : "Dev Life",
      description:
        language === "vi"
          ? "Kỹ năng mềm, quản lý thời gian và cân bằng cuộc sống"
          : "Soft skills, time management and work-life balance",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Features animation with rotation
      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current.querySelectorAll(".feature-card"),
          {
            opacity: 0,
            y: 50,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, featuresRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={featuresRef} className="py-12 sm:py-16 md:py-24 relative">
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-6xl">
        <SectionHeader
          title={language === "vi" ? "Lĩnh Vực" : "Focus"}
          highlight={language === "vi" ? "Chính" : "Areas"}
          description={
            language === "vi"
              ? "Những mảng công nghệ mình tập trung nghiên cứu và phát triển"
              : "Tech stacks and areas I focus on researching and developing"
          }
        />

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
          {keyTopics.map((topic, index) => (
            <FeatureCard key={index} {...topic} />
          ))}
        </div>
      </div>
    </section>
  );
}
