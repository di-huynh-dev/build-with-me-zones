"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useI18n } from "@/lib/i18n-context";
import { useTranslation } from "@/lib/i18n";

export function Hero() {
  const { language } = useI18n();
  const { t } = useTranslation(language);
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgShapesRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const [displayedText, setDisplayedText] = useState("");

  const typewriterWords =
    language === "vi"
      ? ["Kiến Thức Dev", "Best Practices", "Web Performance", "React Patterns"]
      : [
          "Dev Knowledge",
          "Best Practices",
          "Web Performance",
          "React Patterns",
        ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Badge animation
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      // Typewriter effect simulation
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );

      // Subtitle animation
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      // CTA buttons animation
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

      // Background shapes animation
      if (bgShapesRef.current) {
        gsap.to(bgShapesRef.current?.querySelectorAll("div"), {
          y: (i) => (i === 0 ? -20 : 20),
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Typewriter effect
  useEffect(() => {
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingTimer: NodeJS.Timeout;

    const typewriterEffect = () => {
      const currentWord = typewriterWords[currentWordIndex];

      if (!isDeleting && currentCharIndex < currentWord.length) {
        // Typing forward
        setDisplayedText(currentWord.slice(0, currentCharIndex + 1));
        currentCharIndex++;
        typingTimer = setTimeout(typewriterEffect, 80);
      } else if (isDeleting && currentCharIndex > 0) {
        // Deleting backward
        currentCharIndex--;
        setDisplayedText(currentWord.slice(0, currentCharIndex));
        typingTimer = setTimeout(typewriterEffect, 50);
      } else if (!isDeleting && currentCharIndex === currentWord.length) {
        // Start deleting after 2 seconds
        typingTimer = setTimeout(() => {
          isDeleting = true;
          typewriterEffect();
        }, 2000);
      } else if (isDeleting && currentCharIndex === 0) {
        // Move to next word
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % typewriterWords.length;
        typewriterEffect();
      }
    };

    typewriterEffect();

    return () => clearTimeout(typingTimer);
  }, [language]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden py-20 md:py-32 lg:py-40"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-background to-blue-500/5" />

      {/* Animated background elements */}
      <div ref={bgShapesRef} className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <div
            ref={badgeRef}
            className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 text-sm backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{t("home.badge")}</span>
          </div>

          <h1
            ref={titleRef}
            className="mb-6 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
          >
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              {displayedText}
            </span>
            <span className="text-cyan-400 animate-pulse">|</span>
            <br />
            <span className="text-foreground">
              {language === "vi" ? "Chia sẻ & Phát triển" : "Share & Grow"}
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-2xl mx-auto"
          >
            {language === "vi"
              ? "Nền tảng chia sẻ kiến thức lập trình, best practices, và kinh nghiệm thực tế từ cộng đồng developers. Học tập từ những bài viết, tutorials, và case studies từ các chuyên gia."
              : "A knowledge-sharing platform for developers. Explore best practices, tutorials, and real-world insights from experienced engineers. Build better, faster, and smarter."}
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/blog">
              <Button
                size="lg"
                className="group bg-red-500 hover:bg-red-600 text-white"
              >
                {language === "vi" ? "Khám Phá Bài Viết" : "Explore Articles"}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/guides">
              <Button size="lg" variant="outline">
                {language === "vi" ? "Hướng Dẫn" : "Guides"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
