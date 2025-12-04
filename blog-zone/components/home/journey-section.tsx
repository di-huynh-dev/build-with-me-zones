"use client";

import { useRef, useEffect } from "react";
import { Sparkles, TrendingUp, Users } from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import { SectionHeader } from "@/components/section-header";
import { useI18n } from "@/lib/i18n-context";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function JourneySection() {
  const { language } = useI18n();
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Blog Showcases data
  const blogShowcases = [
    {
      icon: Sparkles,
      iconColor: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
      level: language === "vi" ? "✨ Nổi Bật" : "✨ Featured",
      levelColor: "text-yellow-600 dark:text-yellow-500",
      title: language === "vi" ? "Dự Án Cá Nhân" : "Personal Projects",
      description:
        language === "vi"
          ? "Những dự án tâm huyết, open source và các sản phẩm mình đã xây dựng"
          : "Pet projects, open source contributions, and products I've built",
      href: "/blog?filter=projects",
      buttonText: language === "vi" ? "Xem Chi Tiết" : "View Details",
    },
    {
      icon: TrendingUp,
      iconColor: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      level: language === "vi" ? "🔥 Ghi Chép" : "🔥 Notes",
      levelColor: "text-green-600 dark:text-green-500",
      title: language === "vi" ? "Ghi Chép Học Tập" : "Learning Notes",
      description:
        language === "vi"
          ? "Tổng hợp kiến thức, tips & tricks và những điều mình học được mỗi ngày"
          : "Knowledge base, tips & tricks, and things I learn every day",
      href: "/blog?filter=notes",
      buttonText: language === "vi" ? "Đọc Ngay" : "Read Now",
    },
    {
      icon: Users,
      iconColor: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      level: language === "vi" ? "💭 Góc Nhìn" : "💭 Perspective",
      levelColor: "text-blue-600 dark:text-blue-500",
      title: language === "vi" ? "Góc Nhìn Dev" : "Dev Perspective",
      description:
        language === "vi"
          ? "Chia sẻ quan điểm về nghề, career path và cuộc sống của một developer"
          : "Sharing thoughts on career, career path, and the life of a developer",
      href: "/blog?filter=perspective",
      buttonText: language === "vi" ? "Xem Thêm" : "See More",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Resources animation with stagger
      if (resourcesRef.current) {
        gsap.fromTo(
          resourcesRef.current.querySelectorAll(".resource-card-wrapper"),
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: resourcesRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, resourcesRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={resourcesRef}
      className="py-12 sm:py-16 md:py-24 bg-muted/30 relative overflow-hidden"
    >
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-6xl">
        <SectionHeader
          title={language === "vi" ? "Hành Trình" : "My"}
          highlight={language === "vi" ? "Của Tôi" : "Journey"}
          description={
            language === "vi"
              ? "Những điều mình đang làm, đang học và muốn chia sẻ"
              : "What I'm doing, learning, and sharing with you"
          }
        />

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogShowcases.map((showcase, index) => (
            <div key={index} className="resource-card-wrapper">
              <ResourceCard {...showcase} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
