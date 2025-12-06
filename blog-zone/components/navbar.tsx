"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  Menu,
  X,
  Truck,
  Shield,
  Wrench,
  Smartphone,
  Lock,
  FileText,
  Layers,
  Video,
  Database,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n-context";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const solutions = [
  {
    title: "Introduction",
    href: "/docs/intro",
    description: "Getting started with our documentation.",
    icon: Layers,
  },
  {
    title: "TanStack Query",
    href: "/docs/tanstack-query",
    description: "Powerful asynchronous state management.",
    icon: Database,
  },
];

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
    { href: "/blog", label: t("nav.blog") },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="w-full px-4 sm:px-6 md:px-8 mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight">
              Code & Tales
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-transparent focus:bg-transparent font-mono font-bold tracking-tight uppercase"
                      )}
                    >
                      {t("nav.home")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent font-mono font-bold tracking-tight uppercase">
                    {t("nav.docs")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px] bg-[#FFF5EB]">
                      {solutions.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/blog"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-transparent focus:bg-transparent font-mono font-bold tracking-tight uppercase"
                      )}
                    >
                      {t("nav.blog")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem> */}
              </NavigationMenuList>
            </NavigationMenu>
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
              aria-label="Toggle theme"
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
          {/* <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex uppercase font-bold tracking-tight"
              >
                {t("nav.signIn")}
              </Button>
            </SignInButton>
          </SignedOut> */}

          {/* <SignedIn>
            <Link href="/dashboard" className="hidden sm:inline-block">
              <Button variant="outline" size="sm">
                {t("nav.dashboard")}
              </Button>
            </Link>
            <div className="hidden sm:block">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn> */}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label="Toggle mobile menu"
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
                    "block py-2 text-sm font-medium transition-colors hover:text-primary font-mono",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile Solutions List */}
              <div className="pl-4 space-y-2 mt-2 border-l-2 border-muted">
                <p className="text-xs font-mono uppercase text-muted-foreground mb-2">
                  Solutions
                </p>
                {solutions.slice(0, 4).map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block py-1 text-sm text-foreground/80 hover:text-primary font-mono"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
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
            {/* <div className="pt-3 border-t space-y-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full font-mono uppercase"
                  >
                    {t("nav.signIn")}
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard" className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full font-mono uppercase"
                  >
                    {t("nav.dashboard")}
                  </Button>
                </Link>
                <div className="flex justify-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div> */}
          </div>
        </div>
      )}
    </nav>
  );
}

const ListItem = ({
  className,
  title,
  children,
  href,
  icon: Icon,
  ...props
}: any) => {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-sm font-bold leading-none">
          {Icon && (
            <Icon className="h-4 w-4 text-foreground group-hover:text-primary transition-colors" />
          )}
          <span className="font-mono uppercase tracking-tight">{title}</span>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pl-6 font-sans">
          {children}
        </p>
      </Link>
    </li>
  );
};
