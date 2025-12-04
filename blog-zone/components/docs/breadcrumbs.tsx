import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { memo } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumbs navigation component
 * Optimized with semantic HTML and ARIA labels for SEO and accessibility
 */
export const Breadcrumbs = memo(function Breadcrumbs({
  items,
}: BreadcrumbsProps) {
  return (
    <nav
      className="flex items-center space-x-1 text-sm text-muted-foreground mb-6"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        <li>
          <Link
            href="/"
            className="flex items-center hover:text-foreground transition-colors"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-foreground font-medium"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
