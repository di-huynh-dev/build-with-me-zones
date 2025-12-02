"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "./tilt-card";

interface ResourceCardProps {
  icon: LucideIcon;
  iconColor: string;
  level: string;
  levelColor: string;
  title: string;
  description: string;
  href: string;
  buttonText: string;
}

export function ResourceCard({
  icon: Icon,
  iconColor,
  level,
  levelColor,
  title,
  description,
  href,
  buttonText,
}: ResourceCardProps) {
  return (
    <TiltCard className="h-full">
      <div className="group h-full p-4 sm:p-6 md:p-8 rounded-xl bg-background border border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon
              className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor
                .replace("bg-", "text-")
                .replace("/10", "")}`}
            />
          </div>
          <span
            className={`text-[10px] sm:text-xs font-bold ${levelColor} ${levelColor
              .replace("text-", "bg-")
              .replace(
                /\s.*/,
                "/10"
              )} px-2 sm:px-3 py-1 rounded-full whitespace-nowrap`}
          >
            {level}
          </span>
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-black mb-2 sm:mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
          {description}
        </p>
        <Link href={href}>
          <Button
            variant="outline"
            size="sm"
            className="group/btn w-full text-xs sm:text-sm"
          >
            {buttonText}
            <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </TiltCard>
  );
}
