"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  highlight?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeader({
  title,
  description,
  highlight,
  align = "center",
}: SectionHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: descRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <div ref={headerRef} className={`mb-8 sm:mb-12 md:mb-16 ${alignClass}`}>
      <h2
        ref={titleRef}
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight mb-3 sm:mb-4"
      >
        {highlight ? (
          <>
            {title}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-red-500">
              {highlight}
            </span>
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p
          ref={descRef}
          className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0"
        >
          {description}
        </p>
      )}
    </div>
  );
}
