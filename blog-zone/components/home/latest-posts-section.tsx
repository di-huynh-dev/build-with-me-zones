"use client";

import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/blog-post-card";
import { useI18n } from "@/lib/i18n-context";
import { useTranslation } from "@/lib/i18n";
import { fakeBlogPosts } from "@/lib/fake-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function LatestPostsSection() {
  const { language } = useI18n();
  const { t } = useTranslation(language);
  const postsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const latestPosts = fakeBlogPosts.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Posts animation - Removed 3D rotation as requested for "cleaner" look
      if (postsRef.current) {
        gsap.fromTo(
          cardsRef.current.filter((card) => card !== null),
          {
            opacity: 0,
            y: 40, // Reduced movement
            // rotateY: -20, // Removed 3D rotation
            // scale: 0.8, // Removed scale
          },
          {
            opacity: 1,
            y: 0,
            // rotateY: 0,
            // scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out", // Softer ease
            scrollTrigger: {
              trigger: postsRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, postsRef);

    return () => ctx.revert();
  }, []);

  return (
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
  );
}
