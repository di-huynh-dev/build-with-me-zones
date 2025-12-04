import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const docsDirectory = path.join(process.cwd(), "content/docs");

export interface Doc {
  slug: string;
  title: string;
  description: string;
  order: number;
  content: string;
  category?: string;
  sidebar_label?: string;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Get all documentation files
 * Cached for performance
 */
export const getAllDocs = cache((): Doc[] => {
  if (!fs.existsSync(docsDirectory)) {
    return [];
  }

  try {
    const fileNames = fs.readdirSync(docsDirectory);
    const allDocsData = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(docsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title || slug,
          description: data.description || "",
          order: data.order || 99,
          content,
          category: data.category,
          sidebar_label: data.sidebar_label,
        };
      });

    return allDocsData.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error loading docs:", error);
    return [];
  }
});

/**
 * Get a single doc by slug
 * Cached for performance
 */
export const getDocBySlug = cache((slug: string): Doc | null => {
  try {
    const fullPath = path.join(docsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      order: data.order || 99,
      content,
      category: data.category,
      sidebar_label: data.sidebar_label,
    };
  } catch (error) {
    console.error(`Error loading doc: ${slug}`, error);
    return null;
  }
});

/**
 * Extract headings from markdown content for table of contents
 * Optimized with proper typing
 */
export const getHeadings = cache(
  async (content: string): Promise<Heading[]> => {
    try {
      const { remark } = await import("remark");
      const { visit } = await import("unist-util-visit");
      const Slugger = (await import("github-slugger")).default;
      const slugger = new Slugger();

      const headings: Heading[] = [];

      // Remark plugin to extract headings
      const headingExtractor = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (tree: any) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          visit(tree, "heading", (node: any) => {
            // Only include h2 and h3 for cleaner ToC
            if (node.depth === 2 || node.depth === 3) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const text = node.children
                .filter(
                  (c: any) => c.type === "text" || c.type === "inlineCode"
                )
                .map((c: any) => c.value)
                .join("");

              if (text) {
                headings.push({
                  id: slugger.slug(text),
                  text,
                  level: node.depth,
                });
              }
            }
          });
        };
      };

      await remark().use(headingExtractor).process(content);

      return headings;
    } catch (error) {
      console.error("Error extracting headings:", error);
      return [];
    }
  }
);
