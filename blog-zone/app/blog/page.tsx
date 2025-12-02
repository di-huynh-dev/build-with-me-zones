"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categories, searchPosts } from "@/lib/fake-data";
import { useTranslation } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n-context";
import gsap from "gsap";
import { ArrowRight, Calendar, Clock, Eye, SearchIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Client component for dynamic content
export default function BlogPage() {
  const { language } = useI18n();
  const { t } = useTranslation(language);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showCategories, setShowCategories] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredPosts = searchPosts(searchQuery, selectedCategory || undefined);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on load/filter change
      gsap.fromTo(
        cardsRef.current.filter((card) => card !== null),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [filteredPosts]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header Section */}
        <section className="relative py-8 sm:py-12 md:py-16 border-b">
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary/5 to-blue-500/5" />

          <div className="w-full px-4 sm:px-6 md:px-8 mx-auto">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                {t("blog.title")}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                {t("blog.subtitle")}
              </p>
            </div>

            {/* Search and Filter */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <Input
                  placeholder={t("blog.search")}
                  className="pl-9 sm:pl-10 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-full justify-between text-sm"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  {selectedCategory || t("blog.filter")}
                  {selectedCategory && (
                    <X
                      className="h-3 w-3 sm:h-4 sm:w-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory("");
                      }}
                    />
                  )}
                </Button>
                {showCategories && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSelectedCategory("");
                        setShowCategories(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-muted"
                    >
                      {t("blog.allCategories")}
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowCategories(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-muted"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section ref={containerRef} className="py-12 sm:py-16 md:py-24">
          <div className="w-full px-4 sm:px-6 md:px-8 mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, index) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card
                      ref={(el) => {
                        cardsRef.current[index] = el;
                      }}
                      className="overflow-hidden group cursor-pointer h-full flex flex-col hover:shadow-lg transition-shadow"
                    >
                      {/* Cover Image */}
                      <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-muted">
                        <Image
                          src={post.cover_image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      <CardHeader className="px-3 sm:px-4 py-3 sm:py-4">
                        {/* Meta Information */}
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                            {new Date(post.publishedAt).toLocaleDateString(
                              language === "vi" ? "vi-VN" : "en-US"
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                            {post.readingTime} {t("blog.readingTime")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            {post.views}
                          </span>
                        </div>

                        <CardTitle className="line-clamp-2 text-base sm:text-lg group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>

                        <CardDescription className="line-clamp-3 text-xs sm:text-sm">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="flex-1 px-3 sm:px-4 pb-3 sm:pb-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs text-muted-foreground">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </CardContent>

                      {/* Footer */}
                      <div className="border-t px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="text-sm">
                            <p className="font-medium">{post.author.name}</p>
                            <p className="text-muted-foreground text-xs">
                              {post.author.bio}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <p className="text-base sm:text-lg text-muted-foreground mb-4">
                  {t("blog.noResults")}
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                  }}
                  variant="outline"
                  size="sm"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 sm:py-8 md:py-12 bg-muted/50">
        <div className="w-full px-4 sm:px-6 md:px-8 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t("footer.copyright")}
            </p>
            <div className="flex gap-4 sm:gap-6 flex-wrap justify-center sm:justify-end">
              <Link
                href="/about"
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("footer.about")}
              </Link>
              <Link
                href="/privacy"
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/contact"
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("footer.contact")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
