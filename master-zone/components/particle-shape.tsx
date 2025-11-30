"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Point {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
}

interface ParticleShapeProps {
  type: "cube" | "sphere" | "torus";
  className?: string;
}

export default function ParticleShape({ type, className }: ParticleShapeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, systemTheme } = useTheme();
  const isDarkRef = useRef(true);
  const isVisibleRef = useRef(false);

  // Update isDark ref when theme changes
  useEffect(() => {
    isDarkRef.current =
      theme === "dark" || (theme === "system" && systemTheme === "dark");
  }, [theme, systemTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disable on mobile
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: Point[] = [];
    let animationId: number;
    let rotationX = 0;
    let rotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Intersection Observer to pause animation when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Shape generation
    const initShape = () => {
      points = [];
      const density = 0.5; // Adjust for more/less points

      if (type === "cube") {
        const size = 100;
        for (let x = -size; x <= size; x += size * density) {
          for (let y = -size; y <= size; y += size * density) {
            for (let z = -size; z <= size; z += size * density) {
              if (
                Math.abs(x) === size ||
                Math.abs(y) === size ||
                Math.abs(z) === size
              ) {
                // Add some jitter
                points.push({
                  x,
                  y,
                  z,
                  baseX: x,
                  baseY: y,
                  baseZ: z,
                });
              }
            }
          }
        }
      } else if (type === "sphere") {
        const radius = 100;
        const count = 800;
        for (let i = 0; i < count; i++) {
          const theta = Math.random() * 2 * Math.PI;
          const phi = Math.acos(2 * Math.random() - 1);
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);
          points.push({ x, y, z, baseX: x, baseY: y, baseZ: z });
        }
      }
    };

    const project = (p: Point, width: number, height: number) => {
      // Rotation
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      let x = p.x * cosY - p.z * sinY;
      let z = p.z * cosY + p.x * sinY;
      let y = p.y * cosX - z * sinX;
      z = z * cosX + p.y * sinX;

      // Perspective
      const scale = 400 / (400 + z);
      return {
        x: x * scale + width / 2,
        y: y * scale + height / 2,
        scale,
        z,
      };
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      // Skip rendering if not visible
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const isDark = isDarkRef.current;

      // Update rotation based on mouse
      const targetRotX = (mouseY - height / 2) * 0.0005;
      const targetRotY = (mouseX - width / 2) * 0.0005;

      rotationX += (targetRotX - rotationX) * 0.1;
      rotationY += (targetRotY - rotationY) * 0.1;

      // Auto rotation
      rotationY += 0.005;

      points.forEach((p) => {
        const proj = project(p, width, height);

        // Draw particle
        const alpha = (proj.z + 200) / 400; // Depth based opacity
        if (alpha > 0) {
          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${alpha})`
            : `rgba(0, 0, 0, ${alpha})`;

          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 1.5 * proj.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const resize = () => {
      // Handle high DPI
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `${parent.clientHeight}px`;
        ctx.scale(dpr, dpr);
      }
      initShape();
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [type]); // Removed theme dependency

  return <canvas ref={canvasRef} className={className} />;
}
