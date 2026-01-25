"use client"

import { useTranslations, useLocale } from "next-intl"
import { motion } from "framer-motion"
import { ArrowRight, Download } from "lucide-react"

export default function Hero() {
  const t = useTranslations()
  const locale = useLocale()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as const,
      },
    },
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/cv.pdf"
    link.download = "Fares_Ben_Khalifa_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-card/30 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut" as const,
        }}
      />
      <motion.div
        className="absolute bottom-32 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut" as const,
          delay: 2,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Text */}
          <motion.div className={`space-y-8 ${locale === "ar" ? "text-right" : ""}`} variants={itemVariants}>
            {/* Name */}
            <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight" variants={itemVariants}>
              <span className="text-foreground">{t("hero.name")}</span>
            </motion.h1>

            {/* Title with accent */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary mb-4">{t("hero.title")}</h2>
              <p className="text-lg text-muted/80 leading-relaxed">{t("hero.subtitle")}</p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className={`flex flex-col sm:flex-row gap-4 pt-4 ${locale === "ar" ? "sm:flex-row-reverse justify-end" : ""}`} variants={itemVariants}>
              {/* Primary CTA Button */}
              <motion.button
                onClick={downloadCV}
                className={`group relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-background transition-all duration-300 ${locale === "ar" ? "flex flex-row-reverse items-center justify-center gap-2" : "flex items-center justify-center gap-2"}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-primary bg-size-200 animate-gradient" />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                
                {/* Content */}
                <div className="relative z-10 flex items-center gap-2">
                  <Download size={20} />
                  {t("hero.cta")}
                </div>

                {/* Hover effect shadow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/40 to-primary-dark/40 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300 -z-10" />
              </motion.button>

              {/* Secondary Button */}
              <motion.button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className={`group relative px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 ${locale === "ar" ? "flex flex-row-reverse items-center justify-center gap-2" : "flex items-center justify-center gap-2"}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Border and background */}
                <div className="absolute inset-0 rounded-xl border-2 border-primary/50 group-hover:border-primary transition-colors duration-300" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-2 text-primary group-hover:text-primary transition-colors">
                  {t("nav.contact")}
                  <ArrowRight size={20} />
                </div>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div className={`flex gap-8 pt-8 border-t border-border ${locale === "ar" ? "flex-row-reverse justify-end" : ""}`} variants={itemVariants}>
              <div>
                <p className="text-3xl font-bold text-primary">2+</p>
                <p className="text-muted text-sm">{t("hero.experience-years")}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-muted text-sm">{t('hero.projects-completed')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-muted text-sm">{t("hero.client-satisfaction")}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image/Animation */}
          <motion.div className="relative h-96 sm:h-full flex items-center justify-center" variants={itemVariants}>
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />

            {/* Profile Image Placeholder with Animation */}
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-primary/50 shadow-2xl"
              variants={floatingVariants}
              animate="animate"
            >
              <img src="/faress.png" alt="Fares Ben Khalifa" className="w-full h-full object-cover" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </motion.div>

            {/* Floating elements around image */}
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 border-2 border-primary/50 rounded-lg"
              animate={{
                rotate: [0, 360],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut" as const,
              }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-32 h-32 border-2 border-primary/30 rounded-full"
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut" as const,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut" as const,
        }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-primary rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut" as const,
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}