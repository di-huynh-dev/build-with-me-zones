"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

import { ThemeToggle } from "@/components/theme-toggle";
import LanguageSwitcher from "@/components/language-switcher";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const t = useTranslations("nav");

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-b border-white/10 dark:border-white/5 supports-backdrop-filter:bg-white/5"
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="BuildZones Logo"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        <div className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-white">
          BuildZones
        </div>
      </Link>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link
            href="/"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            {t("home")}
          </Link>
          <Link
            href="#zones"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            {t("zones")}
          </Link>
          <Link
            href="/blog"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            {t("blog")}
          </Link>
        </div>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
}
