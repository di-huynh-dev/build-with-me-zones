import { BlogPost } from "./supabase";

export function generateBlogPostSchema(
  post: BlogPost,
  authorName: string = "Blog Zone"
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image || `${baseUrl}/og-image.jpg`,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Blog Zone",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", ") || "",
    wordCount: post.content.split(/\s+/).length,
    articleBody: post.content,
  };
}

export function generateWebsiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Blog Zone",
    description: "Modern blog platform with SEO optimization",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Blog Zone",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: ["https://twitter.com/blogzone", "https://github.com/blogzone"],
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
