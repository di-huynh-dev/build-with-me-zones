"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

/**
 * Table of Contents component with optimized intersection observer
 * Tracks active heading and provides smooth scroll navigation
 */
export const TableOfContents = memo(function TableOfContents({
  headings,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings.length) return;

    // Optimized intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break; // Only track the first intersecting element
          }
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0.1,
      }
    );

    // Observe all headings
    const elements: HTMLElement[] = [];
    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) {
        elements.push(element);
        observer.observe(element);
      }
    }

    return () => {
      for (const element of elements) {
        observer.unobserve(element);
      }
    };
  }, [headings]);

  const handleClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveId(id);
      // Update URL without page reload
      window.history.replaceState(null, "", `#${id}`);
    }
  }, []);

  if (!headings.length) return null;

  return (
    <nav className="space-y-2 pb-8" aria-label="Table of contents">
      <p className="font-semibold text-sm mb-3">On This Page</p>
      <ul className="space-y-1 text-sm border-l-2 border-border">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const indent = (heading.level - 2) * 12; // 12px per level

          return (
            <li key={heading.id} style={{ paddingLeft: `${indent}px` }}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={cn(
                  "block py-1.5 px-3 -ml-px border-l-2 transition-all",
                  "hover:text-foreground hover:border-foreground",
                  isActive
                    ? "text-foreground font-medium border-primary"
                    : "text-muted-foreground border-transparent"
                )}
                aria-current={isActive ? "location" : undefined}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});
