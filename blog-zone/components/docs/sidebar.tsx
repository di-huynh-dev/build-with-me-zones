"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState, useMemo, memo } from "react";
import { sidebarConfig, SidebarItem } from "@/config/sidebar";

/**
 * Sidebar link component
 * Optimized with memoization to prevent unnecessary re-renders
 */
const SidebarLink = memo(function SidebarLink({ item }: { item: SidebarItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href || "#"}
      className={cn(
        "group flex items-center justify-between px-3 py-2 text-sm rounded-md transition-all",
        isActive
          ? "bg-primary text-primary-foreground font-medium shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span>{item.label}</span>
      {isActive && <ChevronRight className="h-4 w-4" aria-hidden="true" />}
    </Link>
  );
});

/**
 * Sidebar category component with collapsible sections
 * Optimized with memoization and useMemo for active state
 */
const SidebarCategory = memo(function SidebarCategory({
  item,
}: {
  item: SidebarItem;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(!item.collapsed);

  // Memoize active state check
  const isActiveSection = useMemo(() => {
    const hasActiveChild = (items: SidebarItem[] | undefined): boolean => {
      if (!items) return false;
      return items.some((child) => {
        if (child.type === "link") {
          return pathname === child.href;
        }
        return hasActiveChild(child.items);
      });
    };
    return hasActiveChild(item.items);
  }, [pathname, item.items]);

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-md transition-colors",
          isActiveSection ? "text-primary" : "text-foreground hover:bg-muted/50"
        )}
        aria-expanded={isOpen}
        aria-label={`Toggle ${item.label} section`}
      >
        <span>{item.label}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      {isOpen && item.items && (
        <div className="ml-2 mt-1 space-y-1 border-l-2 border-muted pl-2">
          {item.items.map((child, index) => (
            <SidebarItemComponent
              key={`${child.label}-${index}`}
              item={child}
            />
          ))}
        </div>
      )}
    </div>
  );
});

const SidebarItemComponent = memo(function SidebarItemComponent({
  item,
}: {
  item: SidebarItem;
}) {
  if (item.type === "link") {
    return <SidebarLink item={item} />;
  }
  return <SidebarCategory item={item} />;
});

/**
 * Main sidebar navigation component
 * Sticky positioning with scroll container
 */
export const Sidebar = memo(function Sidebar() {
  return (
    <aside
      className="w-full md:w-64 shrink-0 hidden md:block"
      aria-label="Documentation navigation"
    >
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 pb-8 scrollbar-thin">
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4 px-3">Documentation</h2>

          <nav className="space-y-1" aria-label="Docs sidebar">
            {sidebarConfig.map((item, index) => (
              <SidebarItemComponent key={`sidebar-${index}`} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
});
