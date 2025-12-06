"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
  const { language } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Initial Entrance
      // Note: Removed image entrance animation to optimize LCP
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      )
        .fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          buttonsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );

      // Scroll Parallax Effect
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(textContainerRef.current, {
        yPercent: -10,
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#FFF5EB] pt-20 md:pt-0"
    >
      <div className="container mx-auto grid h-full max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:items-center md:gap-8 md:px-8">
        {/* Left Column: Text */}
        <div
          ref={textContainerRef}
          className="flex flex-col items-start pt-10 md:pt-0 z-10"
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-sm font-medium text-black backdrop-blur-sm">
            <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-black/70" />
            {language === "vi"
              ? "Phiên bản 2.0 đã ra mắt"
              : "New Version 2.0 Released"}
          </div>

          <h1
            ref={titleRef}
            className="text-5xl font-extrabold tracking-tight text-black sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] selection:bg-black/10"
          >
            {language === "vi" ? "Kiến Tạo" : "Build"}{" "}
            <span className="block text-black/70">
              {language === "vi" ? "Tương Lai" : "The Future"}
            </span>
            {language === "vi" ? "Bằng Code" : "With Code"}
          </h1>

          <p
            ref={descRef}
            className="mt-6 max-w-[600px] text-lg font-medium leading-relaxed text-black/60 sm:text-xl md:text-2xl"
          >
            {language === "vi"
              ? "Nền tảng chia sẻ kiến thức, dự án và kinh nghiệm lập trình. Tối ưu hóa quy trình phát triển của bạn với những công cụ hiện đại nhất."
              : "A platform for sharing knowledge, projects, and coding experiences. Optimize your development workflow with the most modern tools."}
          </p>

          <div
            ref={buttonsRef}
            className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:w-auto"
          >
            <Link href="/blog">
              <Button
                size="xl"
                className="group w-full bg-black text-white hover:bg-black/80 sm:w-auto px-8 py-6 text-lg rounded-none"
              >
                {language === "vi" ? "Đọc Blog Ngay" : "Read Blog Now"}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/projects">
              <Button
                variant="outline"
                size="xl"
                className="group w-full border-black/20 bg-transparent text-black hover:bg-black/5 sm:w-auto px-8 py-6 text-lg rounded-none"
              >
                <Terminal className="mr-2 h-5 w-5 opacity-70" />
                {language === "vi" ? "Xem Dự Án" : "View Projects"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Image */}
        <div
          ref={imageRef}
          className="relative flex h-full w-full items-center justify-center md:h-[80vh]"
        >
          <div className="relative h-[400px] w-full md:h-[600px] lg:h-[700px]">
            <Image
              src="/images/hero-tractor.png"
              alt="Productivity Machine"
              fill
              priority
              quality={80}
              className="object-contain object-center drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Decorative gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-linear-to-t from-[#FFF5EB] to-transparent pointer-events-none" />
    </section>
  );
}
