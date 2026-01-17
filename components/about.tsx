"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Heart, Target, Zap, Users, Code, Globe } from "lucide-react";

export default function About() {
  const t = useTranslations();
  const locale = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const features = [
    {
      icon: Code,
      title: t("features.1.title"),
      description: t("features.1.description"),
    },
    {
      icon: Zap,
      title: t("features.2.title"),
      description: t("features.2.description"),
    },
    {
      icon: Users,
      title: t("features.3.title"),
      description: t("features.3.description"),
    },
    {
      icon: Globe,
      title: t("features.4.title"),
      description: t("features.4.description"),
    },
    {
      icon: Heart,
      title: t("features.5.title"),
      description: t("features.5.description"),
    },
    {
      icon: Target,
      title: t("features.6.title"),
      description: t("features.6.description"),
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t("about.title")}
          </h2>
          <p className="text-muted text-lg">{t("about.description")}</p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left - Text Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <p
              className={`text-lg text-justify text-foreground/80 leading-relaxed ${locale === "ar" ? "text-right" : ""}`}
            >
              {t("about.fullDescription")}
            </p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-primary text-background rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("about.getInTouch")}
              </motion.a>

              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("about.linkedInConnect")}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right - Image */}
          <motion.div className="relative justify-self-center self-start" variants={itemVariants}>
            <motion.div
              className="relative  w-full h-[550px] rounded-2xl overflow-hidden border-2 border-primary/50"
              animate={{
                borderColor: [
                  "rgba(6, 182, 212, 0.5)",
                  "rgba(6, 182, 212, 0.8)",
                  "rgba(6, 182, 212, 0.5)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <img
                src="/faress.png"
                alt="Fares Ben Khalifa"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-primary/40 rounded-lg"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <motion.div
              className="absolute -top-4 -right-4 w-32 h-32 border-2 border-primary/40 rounded-full"
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className={`group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 ${locale === "ar" ? "" : ""}`}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
                }}
              >
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/40 transition-colors"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Icon className="text-primary" size={24} />
                </motion.div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-3 ${locale === "ar" ? "text-right" : ""}`}>{feature.title}</h3>

                {/* Description */}
                <p className={`text-foreground/70 text-sm leading-relaxed ${locale === "ar" ? "text-right" : ""}`}>
                  {feature.description}
                </p>

                {/* Animated line */}
                <motion.div className="w-0 h-1 bg-gradient-to-r from-primary to-primary-dark mt-4 group-hover:w-full transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
