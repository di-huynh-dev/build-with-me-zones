import { redirect } from "next/navigation";

/**
 * Redirect /docs to /docs/intro (default documentation page)
 */
export default function DocsIndexPage() {
  redirect("/docs/intro");
}
