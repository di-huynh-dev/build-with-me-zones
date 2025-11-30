"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Dot {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  opacity: number;
  angle: number;
  distance: number;
  speed: number;
}

export default function MouseFluidDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize dots in a circle pattern
    const initDots = () => {
      dotsRef.current = [];
      const numDots = 30;
      const baseRadius = 80;

      for (let i = 0; i < numDots; i++) {
        const angle = (i / numDots) * Math.PI * 2;
        const distance = baseRadius + Math.random() * 40;

        dotsRef.current.push({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          targetX: 0,
          targetY: 0,
          size: Math.random() * 3 + 2,
          opacity: Math.random() * 0.5 + 0.3,
          angle,
          distance,
          speed: Math.random() * 0.05 + 0.03,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");
      const mouse = mouseRef.current;

      dotsRef.current.forEach((dot, index) => {
        // Update angle for rotation
        dot.angle += dot.speed;

        // Calculate target position around mouse with fluid motion
        const offsetX = Math.cos(dot.angle) * dot.distance;
        const offsetY = Math.sin(dot.angle) * dot.distance;

        dot.targetX = mouse.x + offsetX;
        dot.targetY = mouse.y + offsetY;

        // Smooth follow with easing (liquid effect)
        const easing = 0.08;
        dot.x += (dot.targetX - dot.x) * easing;
        dot.y += (dot.targetY - dot.y) * easing;

        // Pulsating size
        const pulse = Math.sin(Date.now() * 0.002 + index) * 0.5 + 1;
        const currentSize = dot.size * pulse;

        // Draw dot
        ctx.fillStyle = isDark
          ? `rgba(59, 130, 246, ${dot.opacity})`
          : `rgba(37, 99, 235, ${dot.opacity})`;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections between nearby dots
        dotsRef.current.forEach((otherDot, otherIndex) => {
          if (otherIndex <= index) return;

          const dx = dot.x - otherDot.x;
          const dy = dot.y - otherDot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 60) {
            const opacity = (1 - distance / 60) * 0.3;
            ctx.strokeStyle = isDark
              ? `rgba(59, 130, 246, ${opacity})`
              : `rgba(37, 99, 235, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    initDots();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
}
