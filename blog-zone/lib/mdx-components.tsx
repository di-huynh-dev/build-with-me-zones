import Image from "next/image";
import { Admonition } from "@/components/mdx/admonition";
import { MdxTabs, TabItem } from "@/components/mdx/mdx-tabs";

/**
 * Custom MDX components for enhanced rendering
 * Optimized for performance and accessibility
 */
export const mdxComponents = {
  // Custom components
  Admonition,
  Tabs: MdxTabs,
  TabItem,

  // Optimized image component
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { src, alt = "", width, height, ...rest } = props;

    // Use Next.js Image for external images
    if (typeof src === "string" && src.startsWith("http")) {
      return (
        <span className="block rounded-lg overflow-hidden border my-8 shadow-sm bg-muted">
          <Image
            src={src}
            alt={alt}
            width={typeof width === "number" ? width : 800}
            height={typeof height === "number" ? height : 400}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </span>
      );
    }

    // Fallback for local images using Next.js Image
    const imageSrc = typeof src === "string" ? src : "";
    return (
      <span className="block rounded-lg overflow-hidden border my-8 shadow-sm bg-muted">
        <Image
          src={imageSrc}
          alt={alt}
          width={typeof width === "number" ? width : 800}
          height={typeof height === "number" ? height : 400}
          className="w-full h-auto object-cover"
          loading="lazy"
          {...rest}
        />
      </span>
    );
  },

  // Enhanced pre/code blocks
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="relative my-6 rounded-lg overflow-hidden border bg-muted/50">
      <pre {...props} className="m-0 p-4 overflow-x-auto text-sm" />
    </div>
  ),

  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const { className, children, ...rest } = props;

    // Inline code
    if (!className) {
      return (
        <code
          className="px-1.5 py-0.5 rounded-md bg-muted text-sm font-mono"
          {...rest}
        >
          {children}
        </code>
      );
    }

    // Code blocks (handled by pre wrapper)
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },

  // Collapsible details/summary
  details: (props: React.DetailsHTMLAttributes<HTMLDetailsElement>) => (
    <details
      {...props}
      className="my-4 rounded-lg border bg-muted/30 p-4 transition-colors open:bg-muted/50"
    />
  ),

  summary: (props: React.HTMLAttributes<HTMLElement>) => (
    <summary
      {...props}
      className="cursor-pointer font-medium select-none hover:text-primary transition-colors"
    />
  ),

  // Enhanced table
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table {...props} className="w-full border-collapse" />
    </div>
  ),

  // Links with external indicator
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, children, ...rest } = props;
    const isExternal = href?.startsWith("http");

    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-primary hover:underline"
        {...rest}
      >
        {children}
        {isExternal && <span className="inline-block ml-1 text-xs">↗</span>}
      </a>
    );
  },

  // Blockquote
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="border-l-4 border-primary/50 pl-4 italic my-6 text-muted-foreground"
    />
  ),
};
