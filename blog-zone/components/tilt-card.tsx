"use client";

import { useRef, useState, useEffect } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function TiltCard({
  children,
  className = "",
  glowColor = "hsl(var(--primary))",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${className} relative`}
      style={{
        transform: isMobile
          ? "none"
          : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Animated border glow - hidden on mobile */}
      {!isMobile && (
        <>
          <div
            className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: `conic-gradient(
                from 0deg at 50% 50%,
                transparent 0deg,
                transparent 60deg,
                ${glowColor} 90deg,
                ${glowColor.replace(")", " / 0.9)")} 110deg,
                ${glowColor} 130deg,
                transparent 160deg,
                transparent 360deg
              )`,
              padding: "2px",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              animation: isHovered
                ? "rotate-border 2.5s linear infinite"
                : "none",
              filter: "blur(0.5px)",
            }}
          />
          {/* Extra glow layer */}
          <div
            className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
              isHovered ? "opacity-50" : "opacity-0"
            }`}
            style={{
              boxShadow: `0 0 20px ${glowColor.replace(
                ")",
                " / 0.3)"
              )}, inset 0 0 20px ${glowColor.replace(")", " / 0.1)")}`,
            }}
          />
        </>
      )}
      {children}
    </div>
  );
}
