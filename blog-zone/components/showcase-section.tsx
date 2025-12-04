"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Target, TrendingUp, Users, FileText, FolderKanban, HeartHandshake } from "lucide-react";
import { TiltCard } from "./tilt-card";

interface ShowcaseSectionProps {
  t: (key: string) => string;
}

export function ShowcaseSection({ t }: ShowcaseSectionProps) {
  const showcaseItems = [
    {
      icon: Sparkles,
      iconColor: "bg-purple-500/10",
      textColor: "text-purple-500",
      title: t("showcase.items.creative.title"),
      description: t("showcase.items.creative.desc"),
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Zap,
      iconColor: "bg-yellow-500/10",
      textColor: "text-yellow-500",
      title: t("showcase.items.fast.title"),
      description: t("showcase.items.fast.desc"),
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Target,
      iconColor: "bg-blue-500/10",
      textColor: "text-blue-500",
      title: t("showcase.items.precise.title"),
      description: t("showcase.items.precise.desc"),
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: TrendingUp,
      iconColor: "bg-green-500/10",
      textColor: "text-green-500",
      title: t("showcase.items.growth.title"),
      description: t("showcase.items.growth.desc"),
      gradient: "from-green-500/20 to-emerald-500/20",
    },
  ];

  const achievements = [
    {
      icon: Users,
      value: "10K+",
      label: t("showcase.achievements.users"),
      color: "text-purple-500",
    },
    {
      icon: FileText,
      value: "500+",
      label: t("showcase.achievements.articles"),
      color: "text-blue-500",
    },
    {
      icon: FolderKanban,
      value: "200+",
      label: t("showcase.achievements.projects"),
      color: "text-green-500",
    },
    {
      icon: HeartHandshake,
      value: "24/7",
      label: t("showcase.achievements.support"),
      color: "text-red-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
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
            {t("showcase.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              {t("showcase.subtitle")}
            </span>
          </h2>
        </motion.div>

        {/* Showcase Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-16"
        >
          {showcaseItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <TiltCard className="h-full">
                <div className={`group h-full p-6 rounded-xl bg-gradient-to-br ${item.gradient} backdrop-blur-sm border border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300`}>
                  <div className={`w-12 h-12 rounded-lg ${item.iconColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.textColor}`} />
                  </div>
                  <h3 className={`text-lg font-black mb-2 ${item.textColor}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid gap-6 md:gap-8 grid-cols-2 lg:grid-cols-4"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 text-center"
            >
              <achievement.icon className={`w-8 h-8 ${achievement.color} mx-auto mb-3`} />
              <div className={`text-3xl font-black ${achievement.color} mb-2`}>
                {achievement.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {achievement.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
