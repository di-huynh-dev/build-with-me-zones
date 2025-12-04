"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n-context";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language } = useI18n();
  const { t } = useTranslation(language);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/docs", label: t("nav.docs") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="w-full px-4 sm:px-6 md:px-8 mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-bold gradient-text">
              DevBlog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher - Desktop Only */}
          {mounted && (
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
          )}

          {/* Theme Toggle - Desktop Only */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}

          {/* Auth Buttons - Desktop Only */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex"
              >
                {t("nav.signIn")}
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard" className="hidden sm:inline-block">
              <Button variant="outline" size="sm">
                {t("nav.dashboard")}
              </Button>
            </Link>
            <div className="hidden sm:block">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t">
          <div className="w-full px-4 sm:px-6 md:px-8 mx-auto py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-3 pb-4 border-b">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block py-2 text-sm font-medium transition-colors hover:text-primary",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Language Switcher */}
            {mounted && (
              <div className="py-3 border-b">
                <p className="text-xs font-medium text-muted-foreground mb-3">
                  Language
                </p>
                <LanguageSwitcher />
              </div>
            )}

            {/* Mobile Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full flex items-center gap-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            )}

            {/* Mobile Auth Buttons */}
            <div className="pt-3 border-t space-y-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm" className="w-full">
                    {t("nav.signIn")}
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    {t("nav.dashboard")}
                  </Button>
                </Link>
                <div className="flex justify-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
