"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPostBySlug, getRelatedPosts } from "@/lib/fake-data";
import { useTranslation } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n-context";
import gsap from "gsap";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Share2,
  ThumbsUp
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getPostBySlug(slug);
  const relatedPosts = post ? getRelatedPosts(slug) : [];

  const { language } = useI18n();
  const { t } = useTranslation(language);

  const [liked, setLiked] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      ).fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("blog.noResults")}
            </h1>
            <Link href="/blog">
              <Button size="sm" className="text-sm">
                {t("blog.title")}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const publishDate = new Date(post.publishedAt).toLocaleDateString(
    language === "vi" ? "vi-VN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Back Button */}
        <div className="w-full px-4 sm:px-6 md:px-8 mx-auto py-4 sm:py-6">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="text-sm">
              <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {t("post.backToBlog")}
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article ref={headerRef} className="pb-12 sm:pb-16">
          <header className="mb-6 sm:mb-8 w-full">
            {/* Cover Image */}
            {post.cover_image && (
              <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] mb-6 sm:mb-8 overflow-hidden rounded-lg">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-4xl">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  {publishDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  {post.readingTime} {t("blog.readingTime")}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  {post.views} {t("blog.views")}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6">
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 py-4 sm:py-6 border-t border-b">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full w-12 h-12 sm:w-12 sm:h-12"
                  />
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      {post.author.name}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {post.author.bio}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLiked(!liked)}
                    className={`text-xs sm:text-sm ${
                      liked ? "bg-primary/10 border-primary" : ""
                    }`}
                  >
                    <ThumbsUp
                      className={`h-3 w-3 sm:h-4 sm:w-4 mr-2 ${
                        liked ? "fill-primary" : ""
                      }`}
                    />
                    {liked ? "Liked" : "Like"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    {t("post.share")}
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div
            ref={contentRef}
            className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-4xl"
          >
            <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-8 sm:prose-h2:mt-12 prose-h2:mb-3 sm:prose-h2:mb-4 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-6 sm:prose-h3:mt-8 prose-h3:mb-2 sm:prose-h3:mb-3 prose-p:text-foreground/90 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-img:rounded-lg prose-img:shadow-lg prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-ul:list-disc prose-ol:list-decimal prose-li:text-foreground/90 mb-8 sm:mb-12">
              {/* Rendered HTML content from fake data */}
              <div
                dangerouslySetInnerHTML={{
                  __html: convertMarkdownToHtml(post.content),
                }}
              />
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 sm:py-16 md:py-24 border-t">
            <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                {t("post.relatedPosts")}
              </h2>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="overflow-hidden group cursor-pointer h-full hover:shadow-lg transition-shadow">
                      <div className="relative h-32 sm:h-40 w-full overflow-hidden bg-muted">
                        <Image
                          src={relatedPost.cover_image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-3 sm:p-6">
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                          {new Date(relatedPost.publishedAt).toLocaleDateString(
                            language === "vi" ? "vi-VN" : "en-US"
                          )}
                        </p>
                        <h3 className="text-sm sm:text-base font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Comments Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-muted/50">
          <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
              {t("post.comments")}
            </h2>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  {t("post.noComments")}
                </p>
                <Button size="sm" className="text-sm">
                  {t("post.comment")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 sm:py-8 md:py-12 bg-background">
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

// Simple markdown to HTML converter
function convertMarkdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>");

  // Code blocks
  html = html.replace(/```(.*?)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>");

  // Inline code
  html = html.replace(/`(.*?)`/g, "<code>$1</code>");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Line breaks
  html = html.replace(/\n\n/g, "</p><p>");
  html = "<p>" + html + "</p>";

  // Lists
  html = html.replace(/^\- (.*?)$/gm, "<li>$1</li>");
  html = html.replace(/<li>[\s\S]*?<\/li>/g, (match) => `<ul>${match}</ul>`);

  return html;
}
