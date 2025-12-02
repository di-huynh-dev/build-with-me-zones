"use client";

import Image from "next/image";
import Link from "next/link";
import { TiltCard } from "./tilt-card";
import { forwardRef } from "react";

interface BlogPostCardProps {
  slug: string;
  coverImage: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  tags?: string[];
  language: string;
}

export const BlogPostCard = forwardRef<HTMLDivElement, BlogPostCardProps>(
  (
    {
      slug,
      coverImage,
      category,
      title,
      excerpt,
      publishedAt,
      readingTime,
      tags,
      language,
    },
    ref
  ) => {
    return (
      <TiltCard className="h-full">
        <Link href={`/blog/${slug}`}>
          <div
            ref={ref}
            className="group h-full flex flex-col rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 bg-background hover:bg-muted/50"
          >
            {/* Image with overlay gradient */}
            <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-muted">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <span className="text-[10px] sm:text-xs font-bold text-white bg-red-500 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
                  {category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col">
              <h3 className="text-sm sm:text-base md:text-lg font-black mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 sm:mb-4 flex-1">
                {excerpt}
              </p>

              {/* Meta info */}
              <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4">
                <div className="flex gap-2 sm:gap-4 flex-wrap">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    📅{" "}
                    <span className="hidden sm:inline">
                      {new Date(publishedAt).toLocaleDateString(
                        language === "vi" ? "vi-VN" : "en-US"
                      )}
                    </span>
                    <span className="sm:hidden">
                      {new Date(publishedAt).toLocaleDateString(
                        language === "vi" ? "vi-VN" : "en-US",
                        { month: "short", day: "numeric" }
                      )}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    ⏱️ {readingTime}m
                  </span>
                </div>
              </div>

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-primary/10">
                  {tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-xs bg-primary/5 text-primary px-1.5 py-0.5 sm:px-2 sm:py-1 rounded hover:bg-primary/10 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Link>
      </TiltCard>
    );
  }
);

BlogPostCard.displayName = "BlogPostCard";
