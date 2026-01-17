"use client"

import type React from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { useRef, useState } from "react"

interface Skill {
  name: string
  icon: string
  category: string
}

export default function Skills() {
  const t = useTranslations()
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const skills: Skill[] = [
    { name: "React Native", icon: "/react-native.png", category: t("skills.mobile") || "Mobile" },
    { name: "React", icon: "/React-icon.png", category: t("skills.frontend") || "Frontend" },
    { name: "Next.js", icon: "/next_js_logo.png", category: t("skills.frontend") || "Frontend" },
    { name: "TypeScript", icon: "/typescript.png", category: t("skills.language") || "Language" },
    { name: "Node.js", icon: "/Node.js_logo.svg.png", category: t("skills.backend") || "Backend" },
    { name: "tRPC", icon: "/trpc.png", category: t("skills.backend") || "Backend" },
    { name: "MongoDB", icon: "/mongoDb.png", category: t("skills.database") || "Database" },
    { name: "Prisma ORM", icon: "/prisma-logo.png", category: t("skills.orm") || "ORM" },
    { name: "WordPress", icon: "/wordpress-logo.png", category: t("skills.cms") || "CMS" },
    { name: "Shopify", icon: "/shopify.png", category: t("skills.ecommerce") || "E-commerce" },
  ]

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0))
    setScrollLeft(scrollRef.current?.scrollLeft || 0)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-background border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">{t("skills.title")}</h2>
          <p className="text-muted text-lg">{t("skills.description")}</p>
          <p className="text-sm text-primary mt-3 font-medium">← {t("skills.dragInfo") || "Drag to explore"} →</p>
        </motion.div>

        <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-6 pb-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollBehavior: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                className="flex-shrink-0 w-64 h-64"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Clean gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl" />

                  {/* Subtle border */}
                  <div className="absolute inset-0 rounded-2xl border border-primary/30 group-hover:border-primary/60 transition-colors duration-300" />

                  {/* Content container */}
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-8">
                    {/* Icon */}
                    <motion.div
                      className="mb-4 "
                      whileHover={{
                        scale: 1.3,
                        rotate: 12,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </motion.div>

                    {/* Skill name */}
                    <h3 className="text-lg font-bold text-foreground mb-3">{skill.name}</h3>

                    {/* Category badge */}
                    <motion.span
                      className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold border border-primary/40 group-hover:bg-primary/30 transition-all duration-300"
                      whileHover={{
                        backgroundColor: "rgba(0, 217, 255, 0.3)",
                      }}
                    >
                      {skill.category}
                    </motion.span>
                  </div>

                  {/* Hover glow effect on right side */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_-20px_0_40px_rgba(0,217,255,0.2)]" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Gradient fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background via-background/50 to-transparent z-10 rounded-l-2xl" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background via-background/50 to-transparent z-10 rounded-r-2xl" />

          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-border/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { label: t("skills.languages"), value: "3+" },
            { label: t("skills.frameworks"), value: "4+" },
            { label: t("skills.tools"), value: "10+" },
            { label: t("skills.platforms"), value: "10+" },
          ].map((stat, index) => (
            <motion.div key={index} className="text-center" whileHover={{ scale: 1.05 }}>
              <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-muted text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
