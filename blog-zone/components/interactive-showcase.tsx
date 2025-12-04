"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Palette, Layers, Zap, Shield, Monitor } from "lucide-react";
import { Button } from "./ui/button";

interface InteractiveShowcaseProps {
  t: (key: string) => string;
}

export function InteractiveShowcase({ t }: InteractiveShowcaseProps) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Monitor,
      title: t("interactive.features.responsive.title"),
      description: t("interactive.features.responsive.desc"),
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Smartphone,
      title: t("interactive.features.mobile.title"),
      description: t("interactive.features.mobile.desc"),
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Palette,
      title: t("interactive.features.design.title"),
      description: t("interactive.features.design.desc"),
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: Layers,
      title: t("interactive.features.components.title"),
      description: t("interactive.features.components.desc"),
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: Zap,
      title: t("interactive.features.performance.title"),
      description: t("interactive.features.performance.desc"),
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Shield,
      title: t("interactive.features.security.title"),
      description: t("interactive.features.security.desc"),
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-500/20 to-purple-500/20",
    },
  ];

  const currentFeature = features[activeFeature];

  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            {t("interactive.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-primary">
              {t("interactive.subtitle")}
            </span>
          </h2>
        </motion.div>

        {/* Interactive Feature Showcase */}
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* Feature Buttons */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={activeFeature === index ? "ghost" : "outline"}
                  className={`w-full justify-start text-left h-auto py-4 px-6 transition-all duration-300 ${
                    activeFeature === index
                      ? `bg-gradient-to-r ${feature.gradient} text-white border-0 shadow-lg hover:opacity-90`
                      : "hover:border-primary/30"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <feature.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm sm:text-base truncate">
                      {feature.title}
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Feature Display */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`p-8 sm:p-10 rounded-2xl bg-gradient-to-br ${currentFeature.bgGradient} backdrop-blur-sm border border-primary/10 shadow-2xl`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${currentFeature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <currentFeature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4">
                  {currentFeature.title}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {currentFeature.description}
                </p>
                
                {/* Animated dots indicator */}
                <div className="flex gap-2 mt-8">
                  {features.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeFeature
                          ? `w-8 bg-gradient-to-r ${currentFeature.gradient}`
                          : "w-2 bg-muted-foreground/30"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
