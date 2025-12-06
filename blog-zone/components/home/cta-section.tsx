"use client";

import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CtaSection() {
  const { language } = useI18n();
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA section animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          {
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ctaRef}
      className="py-12 sm:py-16 md:py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-background to-red-500/5" />
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6">
          {language === "vi" ? "Kết Nối Với " : "Connect With "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-primary">
            {language === "vi" ? "Tôi" : "Me"}
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
          {language === "vi"
            ? "Cùng nhau trao đổi, học hỏi và phát triển. Đừng ngần ngại liên hệ nếu bạn có câu hỏi hay ý tưởng thú vị."
            : "Let's discuss, learn, and grow together. Don't hesitate to reach out if you have questions or interesting ideas."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/blog">
            <Button
              size="lg"
              className="group text-sm sm:text-base w-full sm:w-auto bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all"
            >
              {language === "vi" ? "Khám Phá Bài Viết" : "Explore Articles"}
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/guides">
            <Button
              size="lg"
              variant="outline"
              className="group text-sm sm:text-base w-full sm:w-auto hover:bg-primary hover:text-primary-foreground transition-all"
            >
              {language === "vi" ? "Xem Hướng Dẫn" : "View Guides"}
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
