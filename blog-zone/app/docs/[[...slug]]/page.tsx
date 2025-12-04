import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import { remarkAdmonition } from "@/lib/remark-admonition";
import { remarkMdxCodeBlock } from "@/lib/remark-mdx-code-block";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getDocBySlug, getHeadings, getAllDocs } from "@/lib/docs";
import { TableOfContents } from "@/components/docs/table-of-contents";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { mdxComponents } from "@/lib/mdx-components";

interface DocsPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

const DEFAULT_SLUG = "intro" as const;

export async function generateStaticParams() {
  const docs = getAllDocs();
  return [
    // Empty slug for /docs root
    { slug: [] },
    // Individual doc pages
    ...docs.map((doc) => ({
      slug: [doc.slug],
    })),
  ];
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.[0] || DEFAULT_SLUG;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return {
      title: "Page Not Found",
    };
  }

  const title = `${doc.title} | Documentation`;
  const description = doc.description || `Learn about ${doc.title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/docs/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/docs/${slug}`,
    },
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const resolvedParams = await params;
  
  // If no slug provided, use default (intro)
  const slug = resolvedParams.slug?.[0] || DEFAULT_SLUG;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  // Generate headings for table of contents
  const headings = await getHeadings(doc.content);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: doc.title,
            description: doc.description,
            url: `/docs/${slug}`,
          }),
        }}
      />

      <div className="flex flex-col xl:flex-row gap-10">
        {/* Main Content */}
        <article className="flex-1 min-w-0">
          <Breadcrumbs
            items={[{ label: "Docs", href: "/docs" }, { label: doc.title }]}
          />

          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {doc.description}
              </p>
            )}
            <hr className="mt-6 border-border" />
          </header>

          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24">
            <MDXRemote
              source={doc.content}
              components={mdxComponents}
              options={{
                parseFrontmatter: false,
                mdxOptions: {
                  remarkPlugins: [
                    remarkGfm,
                    remarkDirective,
                    remarkAdmonition,
                    remarkMdxCodeBlock,
                  ],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                  format: "mdx",
                },
              }}
            />
          </div>
        </article>

        {/* Table of Contents - Only show if headings exist */}
        {headings.length > 0 && (
          <aside
            className="hidden xl:block w-64 shrink-0"
            aria-label="Table of contents"
          >
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        )}
      </div>
    </>
  );
}
