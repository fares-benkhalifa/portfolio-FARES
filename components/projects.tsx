"use client"

import { useTranslations, useLocale } from "next-intl"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { useState } from "react"

interface Project {
  id: number;
  image: string;
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
  featured: boolean;
}


export default function Projects() {
  const t = useTranslations()
  const locale = useLocale()
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

const projects: Project[] = [
  {
    id: 1,
    image: "/images.jpg",
    technologies: ["React Native Cross-Platform", "Expo", "Rest APIs", "TypeScript"],
    featured: true,
  },
  {
    id: 2,
    image: "/Repam.webp",
    technologies: ["React Native Cross-Platform", "Expo", "Rest APIs", "TypeScript"],
    featured: true,
  },
  {
    id: 3,
    image: "/etoile-assurance.png",
    technologies: ["WordPress", "Accessibility", "Performance"],
    featured: true,
  },
  {
    id: 4,
    image: "/croquettes-assurance.png",
    technologies: ["WordPress", "Accessibility", "Performance"],
    featured: true,
  },
  {
    id: 5,
    image: "/Logo-TUSQO.webp",
    technologies: ["Shopify"],
    featured: true,
  },
  {
    id: 6,
    image: "/logo-microcosme.png",
    technologies: ["React Native", "Laravel"],
    featured: true,
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
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t("projects.title")}</h2>
          <p className="text-muted text-lg">{t("projects.description")}</p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          className={`mb-16 ${locale === "ar" ? "text-right" : ""}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-primary">{t("projects.featured-work")}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group relative"
                  variants={itemVariants}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                >
                  {/* Project Card */}
                  <motion.div
                    className="relative bg-card border border-border rounded-xl overflow-hidden h-full flex flex-col hover:border-primary/50 transition-all duration-300"
                    whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(6, 182, 212, 0.15)" }}
                  >
                    {/* Image Container */}
                    <div className="relative w-full h-64 overflow-hidden bg-card/50">
                      <motion.img
                        src={project.image}
                        alt={t(`projects.${project.id}.title`)}
                        className="w-full h-full object-contain"
                      />
                      {/* Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0,
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className={`p-6 flex flex-col flex-grow ${locale === "ar" ? "text-right" : ""}`}>
                      <h3 className="text-xl font-bold mb-3 text-foreground">{t(`projects.${project.id}.title`)}</h3>
                      <p className="text-foreground/70 text-sm mb-4 flex-grow">{t(`projects.${project.id}.description`)}</p>

                      {/* Technologies */}
                      <div className={`flex flex-wrap gap-2 mb-6 ${locale === "ar" ? "justify-end" : ""}`}>
                        {project.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium hover:bg-primary/40 transition-colors"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      {/* <div className="flex gap-3 pt-4 border-t border-border">
                        {project.demoUrl && (
                          <motion.a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/40 transition-colors font-medium text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink size={16} />
                            {t("projects.viewDemo")}
                          </motion.a>
                        )}
                        {project.codeUrl && (
                          <motion.a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github size={16} />
                            {t("projects.viewCode")}
                          </motion.a>
                        )}
                      </div> */}
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <motion.div
                          className="px-3 py-1 bg-primary text-background rounded-full text-xs font-bold uppercase"
                          whileHover={{ scale: 1.1 }}
                        >
                          {t("projects.featured")}
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
          </div>
        </motion.div>


      </div>
    </section>
  )
}
