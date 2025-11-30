"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
}

export default function DottedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const { theme, systemTheme } = useTheme();
  const isDarkRef = useRef(true);

  // Update isDark ref when theme changes
  useEffect(() => {
    isDarkRef.current =
      theme === "dark" || (theme === "system" && systemTheme === "dark");
  }, [theme, systemTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Adjust spacing based on screen size
    const isMobile = window.innerWidth < 768;
    const spacing = isMobile ? 60 : 40; // Much fewer dots on mobile
    const dotSize = isMobile ? 1 : 1.5;
    const influenceRadius = isMobile ? 100 : 150;
    const repelStrength = isMobile ? 10 : 20;

    const resize = () => {
      // Handle high DPI displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      initDots();
    };

    const initDots = () => {
      dotsRef.current = [];
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          dotsRef.current.push({
            baseX: x,
            baseY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            opacity: 0.1,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const isDark = isDarkRef.current;
      const mouse = mouseRef.current;

      // Batch drawing for better performance
      ctx.beginPath();

      dotsRef.current.forEach((dot) => {
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const distanceSq = dx * dx + dy * dy;
        const influenceRadiusSq = influenceRadius * influenceRadius;

        if (distanceSq < influenceRadiusSq) {
          const distance = Math.sqrt(distanceSq);
          const force = (1 - distance / influenceRadius) * repelStrength;
          const angle = Math.atan2(dy, dx);

          dot.vx = -Math.cos(angle) * force;
          dot.vy = -Math.sin(angle) * force;
          dot.opacity = 0.1 + (1 - distance / influenceRadius) * 0.4;
        } else {
          dot.vx = (dot.baseX - dot.x) * 0.1;
          dot.vy = (dot.baseY - dot.y) * 0.1;
          dot.opacity = 0.1;
        }

        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.vx *= 0.9;
        dot.vy *= 0.9;

        // Draw main dot
        const alpha = isDark ? dot.opacity : dot.opacity * 0.8;
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(0, 0, 0, ${alpha})`;

        ctx.moveTo(dot.x + dotSize, dot.y);
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
      });

      ctx.fill();

      // Separate pass for glows to avoid state changes in main loop
      // Only draw glows for active dots
      dotsRef.current.forEach((dot) => {
        if (dot.opacity > 0.15) {
          const dx = mouse.x - dot.baseX;
          const dy = mouse.y - dot.baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < influenceRadius) {
            const glowSize = dotSize + (1 - distance / influenceRadius) * 8;
            const glowAlpha = (1 - distance / influenceRadius) * 0.2;

            const gradient = ctx.createRadialGradient(
              dot.x,
              dot.y,
              0,
              dot.x,
              dot.y,
              glowSize
            );

            if (isDark) {
              gradient.addColorStop(0, `rgba(59, 130, 246, ${glowAlpha})`);
              gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
            } else {
              gradient.addColorStop(0, `rgba(37, 99, 235, ${glowAlpha})`);
              gradient.addColorStop(1, "rgba(37, 99, 235, 0)");
            }

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, glowSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
}
