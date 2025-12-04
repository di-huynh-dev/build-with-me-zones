"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";

interface AdmonitionProps {
  type: "note" | "tip" | "info" | "warning" | "danger";
  title?: string;
  children: React.ReactNode;
}

const icons = {
  note: Info,
  tip: CheckCircle2,
  info: Info,
  warning: AlertCircle,
  danger: XCircle,
};

const styles = {
  note: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200",
  tip: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-200",
  info: "bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200",
  warning: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-200",
  danger: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200",
};

export function Admonition({ type = "note", title, children }: AdmonitionProps) {
  const Icon = icons[type] || icons.note;
  const style = styles[type] || styles.note;

  return (
    <div className={cn("my-6 rounded-lg border p-4", style)}>
      <div className="flex items-center gap-2 font-bold mb-2">
        <Icon className="h-5 w-5" />
        <span className="capitalize">{title || type}</span>
      </div>
      <div className="text-sm [&>p]:last:mb-0">{children}</div>
    </div>
  );
}
