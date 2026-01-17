"use client"

import type React from "react"

import { useTranslations, useLocale } from "next-intl"
import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, MapPin, Phone, Send, Loader } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const t = useTranslations()
  const locale = useLocale()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 5000)
      }
    } catch (error) {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.emailAddress"),
      value: "fbenkhalifa9@gmail.com",
      href: "mailto:fbenkhalifa9@gmail.com",
    },
    {
      icon: MapPin,
      title: t("contact.location"),
      value: "Tunis, Tunisia",
      href: "#",
    },
    {
      icon: Phone,
      title: t("contact.phone"),
      value: "+216 XX XXX XXX",
      href: "tel:+216",
    },
  ]
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/40 border-y border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t("contact.title")}</h2>
          <p className="text-muted text-lg">{t("contact.description")}</p>
        </motion.div>

        {/* Contact Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Info Cards */}
          <motion.div className="lg:col-span-1 space-y-6" variants={containerVariants}>
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.a
                  key={index}
                  href={info.href}
                  className={`group flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 ${
                    locale === "ar" ? "flex-row-reverse" : ""
                  }`}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)",
                  }}
                >
                  <motion.div
                    className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/40 transition-colors"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Icon className="text-primary" size={24} />
                  </motion.div>
                  <div className={`flex-grow ${locale === "ar" ? "text-right" : ""}`}>
                    <h3 className={`${locale === "ar" ? "text-right" : ""} font-semibold mb-1`}>{info.title}</h3>
                    <p className={`text-foreground/70 text-sm break-all ${locale === "ar" ? "text-right" : ""}`}>{info.value}</p>
                  </div>
                </motion.a>
              )
            })}

            {/* Social Links */}
            <motion.div className="pt-4" variants={itemVariants}>
              <h3 className={`font-semibold mb-4 ${locale === "ar" ? "text-right" : ""}`}>{t("contact.followMe")}</h3>
                <div className={`flex gap-4 ${locale === "ar" ? "justify-end" : ""}`}>
                  {[
                    { name: "LinkedIn", url: "https://linkedin.com", icon: "/LinkedIn_icon.svg.png" },
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all text-xl"
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      title={social.name}
                    >
                      {typeof social.icon === "string" && social.icon.startsWith("/") ? (
                        <Image src={social.icon} alt={social.name} width={20} height={20} className="object-contain" />
                      ) : (
                        social.icon
                      )}
                    </motion.a>
                  ))}
                </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            dir={locale === "ar" ? "rtl" : "ltr"}
            className={`lg:col-span-2 bg-card border border-border rounded-xl p-8 ${
              locale === "ar" ? "text-right" : ""
            }`}
            variants={itemVariants}
            whileHover={{ boxShadow: "0 20px 40px rgba(6, 182, 212, 0.1)" }}
          >
            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name Input */}
              <motion.div
                className="group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className={`block text-sm font-medium mb-2 ${locale === "ar" ? "text-right" : ""}`}>{t("contact.name")}</label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder={t("contact.namePlaceholder")}
                  whileFocus={{ borderColor: "rgba(6, 182, 212, 1)" }}
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                className="group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className={`block text-sm font-medium mb-2 ${locale === "ar" ? "text-right" : ""}`}>{t("contact.email")}</label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder={t("contact.emailPlaceholder")}
                  whileFocus={{ borderColor: "rgba(6, 182, 212, 1)" }}
                />
              </motion.div>

              {/* Message Textarea */}
              <motion.div
                className="group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className={`block text-sm font-medium mb-2 ${locale === "ar" ? "text-right" : ""}`}>{t("contact.message")}</label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder={t("contact.messagePlaceholder")}
                  whileFocus={{ borderColor: "rgba(6, 182, 212, 1)" }}
                />
              </motion.div>

              {/* Status Messages */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: status !== "idle" ? 1 : 0 }}
                className={`p-4 rounded-lg text-sm font-medium ${
                  status === "success"
                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                    : "bg-red-500/20 text-red-400 border border-red-500/50"
                } ${locale === "ar" ? "text-right" : ""}`}
              >
                {status === "success" && (
                  <>
                    <p>{t("contact.success")}</p>
                  </>
                )}
                {status === "error" && (
                  <>
                    <p>{t("contact.error")}</p>
                  </>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary-dark text-background rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    {t("contact.sending")}
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {t("contact.send")}
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
