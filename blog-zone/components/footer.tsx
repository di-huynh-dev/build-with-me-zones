"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

export function Footer() {
  const { language } = useI18n();

  return (
    <footer className="border-t py-6 sm:py-8 md:py-12 bg-muted/50">
      <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-black mb-4">
              {language === "vi" ? "Về Tôi" : "About Me"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === "vi"
                ? "Developer đam mê chia sẻ kiến thức và xây dựng sản phẩm."
                : "Developer passionate about sharing knowledge and building products."}
            </p>
          </div>
          <div>
            <h3 className="font-black mb-4">
              {language === "vi" ? "Tài Nguyên" : "Resources"}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="hover:text-primary transition-colors"
                >
                  {language === "vi" ? "Hướng Dẫn" : "Guides"}
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="hover:text-primary transition-colors"
                >
                  {language === "vi" ? "Tài Liệu" : "Documentation"}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-black mb-4">
              {language === "vi" ? "Cộng Đồng" : "Community"}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-black mb-4">
              {language === "vi" ? "Pháp Lý" : "Legal"}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  {language === "vi" ? "Bảo Mật" : "Privacy"}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  {language === "vi" ? "Điều Khoản" : "Terms"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs sm:text-sm text-muted-foreground">
          <p>
            © 2025{" "}
            {language === "vi" ? "My Personal Blog" : "My Personal Blog"}.{" "}
            {language === "vi"
              ? "Bản quyền được bảo vệ."
              : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
