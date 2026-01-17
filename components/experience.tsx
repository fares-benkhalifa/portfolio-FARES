"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";

interface ExperienceItem {
  id: number;
  technologies: string[];
}

export default function Experience() {
  const t = useTranslations();
  const locale = useLocale();

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      technologies: [
        "Next.js",
        "Node.js",
        "WordPress",
        "tRPC",
        "TypeScript",
        "Shopify",
        "React Native",
        "Expo",
        "PostgreSQL",
        "Prisma ORM",
      ],
    },
    {
      id: 2,
      technologies: [
        "React Native",
        "Expo",
        "Laravel",
        "PHP",
        "REST APIs",
        "MySQL",
        "TypeScript",
      ],
    },
    {
      id: 3,
      technologies: [
        "React",
        "HTML/CSS",
        "WordPress",
        "JavaScript",
        "PostgreSQL",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
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
            {t("experience.title")}
          </h2>
          <p className="text-muted text-lg">{t("experience.description")}</p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Timeline line - only visible on medium screens and up */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent transform -translate-x-1/2" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start ${
                  index % 2 === 1 ? "md:direction-rtl" : ""
                }`}
                variants={itemVariants}
              >
                {/* Left Side - Content */}
                <motion.div
                  className={`${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group ${
                    locale === "ar" ? "text-right" : "text-left"
                  }`}>
                    {/* Header */}
                    <div className={`flex items-start gap-3 mb-4 ${locale === "ar" ? "flex-row-reverse" : ""}`}>
                      <motion.div
                        className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/40 transition-colors"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <Briefcase className="text-primary" size={24} />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold">
                          {t(`experiences.${exp.id}.title`)}
                        </h3>
                        <p className="text-primary font-semibold">
                          {t(`experiences.${exp.id}.company`)}
                        </p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className={`flex flex-wrap gap-4 mb-4 text-sm text-muted ${locale === "ar" ? "justify-end" : ""}`}>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-primary" />
                        {t(`experiences.${exp.id}.period`)}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-primary" />
                        {t(`experiences.${exp.id}.location`)}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-foreground/80 mb-4">
                      {t(`experiences.${exp.id}.description`)}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className={`font-semibold text-primary mb-2 ${locale === "ar" ? "text-right" : ""}`}>
                        {t("experience.key-achievements")}:
                      </h4>
                      <ul className="space-y-1">
                        {t
                          .raw(`experiences.${exp.id}.achievements`)
                          .map((achievement: string, i: number) => (
                            <motion.li
                              key={i}
                              className={`flex items-start gap-2 text-sm text-foreground/70 ${locale === "ar" ? "flex-row-reverse" : ""}`}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <ArrowRight
                                size={14}
                                className="text-primary mt-1 flex-shrink-0"
                              />
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium hover:bg-primary/40 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Timeline Dot and Connector (Desktop Only) */}
                <motion.div
                  className={`hidden md:flex justify-center items-start ${
                    index % 2 === 1 ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <motion.div
                    className="w-8 h-8 bg-primary rounded-full border-4 border-background shadow-lg z-10 relative"
                    whileHover={{
                      scale: 1.3,
                      boxShadow: "0 0 30px rgba(6, 182, 212, 0.8)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
