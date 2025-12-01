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
  Code2,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useI18n } from "@/lib/i18n-context";
import { useTranslation } from "@/lib/i18n";
import { fakeBlogPosts } from "@/lib/fake-data";
import Image from "next/image";

export default function HomePage() {
  const { language } = useI18n();
  const { t } = useTranslation(language);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const latestPosts = fakeBlogPosts.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Resources animation
      if (resourcesRef.current) {
        gsap.fromTo(
          resourcesRef.current.querySelectorAll(".resource-card"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      // Features animation
      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current.querySelectorAll(".feature-card"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          }
        );
      }

      // Posts animation
      if (postsRef.current) {
        gsap.fromTo(
          cardsRef.current.filter((card) => card !== null),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
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

        {/* Learning Path / Resources Section - Docusaurus Style */}
        <section
          ref={resourcesRef}
          className="py-12 sm:py-16 md:py-24 bg-muted/30"
        >
          <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4">
                {language === "vi" ? "Lộ Trình Học Tập" : "Learning Paths"}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                {language === "vi"
                  ? "Các hướng dẫn có cấu trúc từ cơ bản đến nâng cao"
                  : "Structured learning paths from basics to advanced"}
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Path 1 */}
              <div className="resource-card group p-6 sm:p-8 rounded-xl bg-background border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">
                    {language === "vi" ? "Cơ Bản" : "Beginner"}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-3">
                  React & Next.js
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  {language === "vi"
                    ? "Học React hooks, component patterns, Server Components, và App Router"
                    : "Learn React hooks, component patterns, Server Components, and App Router"}
                </p>
                <Link href="/guides/react-nextjs">
                  <Button
                    variant="outline"
                    size="sm"
                    className="group/btn w-full"
                  >
                    {language === "vi" ? "Bắt Đầu" : "Get Started"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>

              {/* Path 2 */}
              <div className="resource-card group p-6 sm:p-8 rounded-xl bg-background border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-500" />
                  </div>
                  <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-3 py-1 rounded-full">
                    {language === "vi" ? "Trung Bình" : "Intermediate"}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-3">
                  {language === "vi"
                    ? "Performance & Optimization"
                    : "Performance & Optimization"}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  {language === "vi"
                    ? "Web Vitals, code splitting, caching strategies, và performance profiling"
                    : "Web Vitals, code splitting, caching strategies, and performance profiling"}
                </p>
                <Link href="/guides/performance">
                  <Button
                    variant="outline"
                    size="sm"
                    className="group/btn w-full"
                  >
                    {language === "vi" ? "Bắt Đầu" : "Get Started"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>

              {/* Path 3 */}
              <div className="resource-card group p-6 sm:p-8 rounded-xl bg-background border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-green-500" />
                  </div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                    {language === "vi" ? "Nâng Cao" : "Advanced"}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-3">
                  {language === "vi"
                    ? "Architecture & Patterns"
                    : "Architecture & Patterns"}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  {language === "vi"
                    ? "Scalable architecture, design patterns, testing strategies, và DevOps"
                    : "Scalable architecture, design patterns, testing strategies, and DevOps"}
                </p>
                <Link href="/guides/architecture">
                  <Button
                    variant="outline"
                    size="sm"
                    className="group/btn w-full"
                  >
                    {language === "vi" ? "Bắt Đầu" : "Get Started"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Topics Grid */}
        <section ref={featuresRef} className="py-12 sm:py-16 md:py-24">
          <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4">
                {language === "vi" ? "Các Chủ Đề Chính" : "Key Topics"}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                {language === "vi"
                  ? "Tìm hiểu về các công nghệ và patterns phổ biến"
                  : "Explore common technologies and patterns"}
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
              <div className="feature-card p-6 sm:p-8 rounded-xl bg-background border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-3">
                  {t("home.features.performance.title")}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t("home.features.performance.desc")}
                </p>
              </div>

              <div className="feature-card p-6 sm:p-8 rounded-xl bg-background border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-3">
                  {t("home.features.design.title")}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t("home.features.design.desc")}
                </p>
              </div>

              <div className="feature-card p-6 sm:p-8 rounded-xl bg-background border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-3">
                  {language === "vi" ? "Case Studies" : "Case Studies"}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {language === "vi"
                    ? "Những dự án thực tế và giải pháp cho các thách thức phổ biến"
                    : "Real-world projects and solutions for common challenges"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section ref={postsRef} className="py-12 sm:py-16 md:py-24 bg-muted/30">
          <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-2">
                  {t("home.latestPosts")}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t("home.latestPostsDesc")}
                </p>
              </div>
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="group hidden sm:inline-flex whitespace-nowrap"
                >
                  {t("home.viewAll")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <div
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el;
                    }}
                    className="group h-full flex flex-col rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all bg-background hover:bg-muted/50"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden bg-muted">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-bold text-white bg-red-500 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 p-6 sm:p-6 flex flex-col">
                      <h3 className="text-base sm:text-lg font-black mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex gap-4">
                          <span>
                            📅{" "}
                            {new Date(post.publishedAt).toLocaleDateString(
                              language === "vi" ? "vi-VN" : "en-US"
                            )}
                          </span>
                          <span>⏱️ {post.readingTime} min</span>
                        </div>
                      </div>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-primary/5 text-primary px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
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
        <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-background to-red-500/5" />
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
          </div>

          <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-4xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4 sm:mb-6">
              {language === "vi" ? "Bắt Đầu Học Tập " : "Start Learning "}
              <span className="text-red-500">
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
                  className="group text-sm sm:text-base w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
                >
                  {language === "vi" ? "Khám Phá Bài Viết" : "Explore Articles"}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/guides">
                <Button
                  size="lg"
                  variant="outline"
                  className="group text-sm sm:text-base w-full sm:w-auto"
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
                  <Link href="/blog" className="hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-primary">
                    {language === "vi" ? "Hướng Dẫn" : "Guides"}
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-primary">
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
                  <a href="#" className="hover:text-primary">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
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
                  <Link href="/privacy" className="hover:text-primary">
                    {language === "vi" ? "Bảo Mật" : "Privacy"}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary">
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
