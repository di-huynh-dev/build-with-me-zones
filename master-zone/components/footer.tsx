"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tZones = useTranslations("zones");

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="mb-4 block text-2xl font-bold text-zinc-900 dark:text-white"
            >
              BuildZones
            </Link>
            <p className="mb-6 max-w-sm text-sm md:text-base">
              {t("description")}
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/di-huynh-dev"
                aria-label="GitHub"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:hello@example.com"
                aria-label="Email"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base md:text-lg font-bold text-zinc-900 dark:text-white">
              {t("sections.zones")}
            </h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link
                  href="/"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  {tZones("items.master.title")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  {tZones("items.blog.title")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base md:text-lg font-bold text-zinc-900 dark:text-white">
              {t("sections.resources")}
            </h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link
                  href="https://nextjs.org"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Next.js Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://tailwindcss.com"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Tailwind CSS
                </Link>
              </li>
              <li>
                <Link
                  href="https://gsap.com"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  GSAP
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/di-huynh-dev/build-with-me-zones"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Source Code
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-8 md:flex-row">
          <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} Di Huynh. {t("rights")}.
          </p>
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
            <Link
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              {t("sections.legal.privacy")}
            </Link>
            <Link
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              {t("sections.legal.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
