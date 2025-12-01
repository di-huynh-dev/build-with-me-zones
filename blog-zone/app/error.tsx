"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold mb-4">Có lỗi xảy ra</h2>
        <p className="text-muted-foreground mb-8">
          Đã có lỗi xảy ra khi tải trang này. Vui lòng thử lại.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Thử lại</Button>
          <Link href="/">
            <Button variant="outline">Về trang chủ</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
