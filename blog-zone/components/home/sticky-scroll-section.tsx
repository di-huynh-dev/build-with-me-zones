"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

// Image paths (Local Assets)
const projectImage = "/assets/project-feature.png";
const notesImage = "/assets/knowledge-graph.png";
const perspectiveImage = "/assets/dev-lifestyle.png";

export function StickyScrollSection() {
  const { language } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const steps = [
    {
      id: "projects",
      title: language === "vi" ? "Dự Án Cá Nhân" : "Personal Projects",
      subtitle: language === "vi" ? "Đam Mê" : "Built with Passion",
      description:
        language === "vi"
          ? "Bộ sưu tập các dự án mã nguồn mở, các ứng dụng SaaS và công cụ giải quyết vấn đề thực tế. Từ ý tưởng đến triển khai, đảm bảo chất lượng và hiệu suất cao."
          : "A collection of open-source contributions, SaaS experiments, and tools built to solve real-world problems. From initial concept to deployment, ensuring high quality and performance.",
      icon: Sparkles,
      color: "bg-orange-500",
      image: projectImage,
      stats:
        language === "vi"
          ? ["10+ Dự Án", "5k+ Stars", "Live"]
          : ["10+ Projects", "5k+ Stars", "Live"],
    },
    {
      id: "notes",
      title: language === "vi" ? "Ghi Chép Học Tập" : "Learning Notes",
      subtitle: language === "vi" ? "Kiến Thức" : "Knowledge Base",
      description:
        language === "vi"
          ? "Tài liệu hóa hành trình học tập. Các bài viết chuyên sâu, mẹo nhanh và hướng dẫn toàn diện về các công nghệ web hiện đại bao gồm Next.js, React và GSAP."
          : "Documentation of my learning journey. Technical deep dives, quick tips, and comprehensive guides on modern web technologies including Next.js, React, and GSAP.",
      icon: TrendingUp,
      color: "bg-green-500",
      image: notesImage,
      stats:
        language === "vi"
          ? ["100+ Bài", "Cập Nhật", "Wiki"]
          : ["100+ Articles", "Daily Updates", "Wiki"],
    },
    {
      id: "perspective",
      title: language === "vi" ? "Góc Nhìn Dev" : "Dev Perspective",
      subtitle: language === "vi" ? "Sự Nghiệp" : "Career & Life",
      description:
        language === "vi"
          ? "Những góc nhìn về nghề kỹ sư phần mềm, quản lý burnout, hack năng suất và triết lý đằng sau việc viết code tốt."
          : "Insights into the software engineering career, managing burnout, productivity hacks, and the philosophy behind writing good code.",
      icon: Users,
      color: "bg-blue-500",
      image: perspectiveImage,
      stats:
        language === "vi"
          ? ["Bài Viết Tuần", "Cộng Đồng", "Phát Triển"]
          : ["Weekly Essays", "Community", "Growth"],
    },
  ];

  useGSAP(
    () => {
      const cards = cardsRef.current;

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
          scrub: true,
        });
      });

      // Pinning logic
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftPanelRef.current,
        pinSpacing: false, // Right side handles scroll space
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col md:flex-row bg-background"
    >
      {/* Left: Sticky Visual Panel */}
      <div
        ref={leftPanelRef}
        className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center p-8 lg:p-16 border-r border-border/50"
      >
        <div className="relative w-full h-full max-h-[600px] rounded-3xl overflow-hidden bg-muted border border-border/50 shadow-2xl transition-all duration-700 ease-out">
          {/* Background Image Transition */}
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out",
                activeIndex === index ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="relative w-full h-full">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-black/40" />
              {/* Overlay */}

              <div className="absolute bottom-0 left-0 p-8 w-full text-white transform transition-transform duration-700 translate-y-0">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${step.color} text-white`}
                >
                  <step.icon className="w-3 h-3" />
                  {step.subtitle}
                </div>
                <p className="text-4xl font-black tracking-tighter mb-2">
                  {step.title}
                </p>
                <div className="flex gap-4 mt-6">
                  {step.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-lg font-bold">{stat}</span>
                      <span className="text-xs text-white/60 uppercase tracking-widest">
                        Stat
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Scrolling Text Panel */}
      <div ref={rightPanelRef} className="w-full md:w-1/2 flex flex-col">
        {steps.map((step, index) => (
          <div
            key={step.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="min-h-screen flex flex-col justify-center p-8 lg:p-24"
          >
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">
              0{index + 1} / 03
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
              {step.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {step.description}
            </p>

            <div className="bg-muted/50 p-6 rounded-xl border border-border">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <step.icon className="w-5 h-5 text-primary" />
                {language === "vi" ? "Tính Năng Chính" : "Key Features"}
              </h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Feature A specific to {step.title}
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Feature B specific to {step.title}
                </li>
              </ul>
              <Button variant="default" className="group">
                {language === "vi" ? "Khám Phá" : "Explore"} {step.title}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
