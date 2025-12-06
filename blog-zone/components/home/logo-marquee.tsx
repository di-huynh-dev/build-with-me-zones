"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const logos = [
  {
    name: "Next.js",
    src: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png",
  },
  {
    name: "Vercel",
    src: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
  },
  {
    name: "Tailwind",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    name: "React",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    name: "Stripe",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
  },
  { name: "Prisma", src: "https://cdn.worldvectorlogo.com/logos/prisma-3.svg" },
  {
    name: "Supabase",
    src: "https://cdn.worldvectorlogo.com/logos/supabase.svg",
  },
  {
    name: "GSAP",
    src: "https://greensock.com/uploads/monthly_2020_03/gsap-trans-logo-color.png.0927357731778931751c9112247AA52.png",
  },
];

export function LogoMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Alternative GSAP approach for robust infinite scroll without complex math:
  // Animate from 0 to -50% (if doubled content)
  useGSAP(
    () => {
      if (!scrollerRef.current) return;

      gsap.to(scrollerRef.current, {
        xPercent: -25,
        ease: "none",
        duration: 40,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      className="w-full py-10 bg-background border-y border-black/5 overflow-hidden"
      ref={containerRef}
    >
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
          Powering Next-Gen Applications
        </p>
      </div>
      <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          ref={scrollerRef}
          className="flex min-w-full shrink-0 gap-16 items-center w-max py-4 flex-nowrap"
        >
          {/* Render 4 sets of logos to ensure seamless loop on wide screens */}
          {Array.from({ length: 4 }).map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0 gap-16 items-center">
              {logos.map((logo, idx) => (
                <div
                  key={`${setIndex}-${idx}`}
                  className="flex items-center justify-center h-12 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-8 w-auto object-contain max-w-[120px]"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
