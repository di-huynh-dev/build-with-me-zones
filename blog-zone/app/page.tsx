"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Zap,
  Palette,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n-context";
import { useTranslation } from "@/lib/i18n";
import { fakeBlogPosts } from "@/lib/fake-data";
import { FeatureCard } from "@/components/feature-card";
import { BlogPostCard } from "@/components/blog-post-card";
import { SectionHeader } from "@/components/section-header";
import { ShowcaseSection } from "@/components/showcase-section";
import { InteractiveShowcase } from "@/components/interactive-showcase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const { language } = useI18n();
  const { t } = useTranslation(language);
  const featuresRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const latestPosts = fakeBlogPosts.slice(0, 6);

  // Key topics data
  const keyTopics = [
    {
      icon: Zap,
      title: t("home.features.performance.title"),
      description: t("home.features.performance.desc"),
    },
    {
      icon: Palette,
      title: t("home.features.design.title"),
      description: t("home.features.design.desc"),
    },
    {
      icon: BookOpen,
      title: language === "vi" ? "Case Studies" : "Case Studies",
      description:
        language === "vi"
          ? "Những dự án thực tế và giải pháp cho các thách thức phổ biến"
          : "Real-world projects and solutions for common challenges",
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

      // Posts animation with 3D effect
      if (postsRef.current) {
        gsap.fromTo(
          cardsRef.current.filter((card) => card !== null),
          {
            opacity: 0,
            y: 80,
            rotateY: -20,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: postsRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

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
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Showcase Section */}
        <ShowcaseSection t={t} />

        {/* Interactive Showcase */}
        <InteractiveShowcase t={t} />

        {/* Key Topics Grid */}
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
              title={language === "vi" ? "Các Chủ Đề" : "Key"}
              highlight={language === "vi" ? "Chính" : "Topics"}
              description={
                language === "vi"
                  ? "Tìm hiểu về các công nghệ và patterns phổ biến"
                  : "Explore common technologies and patterns"
              }
            />

            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
              {keyTopics.map((topic, index) => (
                <FeatureCard key={index} {...topic} />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section
          ref={postsRef}
          className="py-12 sm:py-16 md:py-24 bg-muted/30 relative overflow-hidden"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 -z-10 opacity-20">
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-linear-to-r from-primary/20 to-red-500/20 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-1/3 right-0 w-96 h-96 bg-linear-to-l from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-2">
                  {t("home.latestPosts")}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t("home.latestPostsDesc")}
                </p>
              </div>
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="group hidden sm:inline-flex whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  {t("home.viewAll")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post, index) => (
                <BlogPostCard
                  key={post.id}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  slug={post.slug}
                  coverImage={post.cover_image}
                  category={post.category}
                  title={post.title}
                  excerpt={post.excerpt}
                  publishedAt={post.publishedAt}
                  readingTime={post.readingTime}
                  tags={post.tags}
                  language={language}
                />
              ))}
            </div>

            <div className="flex sm:hidden mt-8">
              <Link href="/blog" className="w-full">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  {t("home.viewAll")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
              {language === "vi" ? "Bắt Đầu Học Tập " : "Start Learning "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-primary">
                {language === "vi" ? "Hôm Nay" : "Today"}
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              {language === "vi"
                ? "Tham gia cộng đồng developers và nâng cao kỹ năng của bạn"
                : "Join our developer community and level up your skills"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button
                  size="lg"
                  className="group text-sm sm:text-base w-full sm:w-auto bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all"
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
      </main>

      {/* Footer */}
      <footer className="border-t py-6 sm:py-8 md:py-12 bg-muted/50">
        <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-black mb-4">
                {language === "vi" ? "Về Chúng Tôi" : "About"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "vi"
                  ? "Hub kiến thức cho developers"
                  : "Knowledge hub for developers"}
              </p>
            </div>
            <div>
              <h3 className="font-black mb-4">
                {language === "vi" ? "Tài Nguyên" : "Resources"}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="hover:text-primary transition-colors"
                  >
                    {language === "vi" ? "Hướng Dẫn" : "Guides"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-primary transition-colors"
                  >
                    {language === "vi" ? "Tài Liệu" : "Documentation"}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-black mb-4">
                {language === "vi" ? "Cộng Đồng" : "Community"}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-black mb-4">
                {language === "vi" ? "Pháp Lý" : "Legal"}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-primary transition-colors"
                  >
                    {language === "vi" ? "Bảo Mật" : "Privacy"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-primary transition-colors"
                  >
                    {language === "vi" ? "Điều Khoản" : "Terms"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs sm:text-sm text-muted-foreground">
            <p>
              © 2025{" "}
              {language === "vi" ? "Dev Knowledge Hub" : "Dev Knowledge Hub"}.{" "}
              {language === "vi"
                ? "Bản quyền được bảo vệ."
                : "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
