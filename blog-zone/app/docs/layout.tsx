import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Sidebar } from "@/components/docs/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Docs",
    default: "Documentation",
  },
  description:
    "Comprehensive documentation and guides for building modern web applications",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8 py-8">
          <Sidebar />
          <main className="flex-1 min-w-0" id="main-content">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
