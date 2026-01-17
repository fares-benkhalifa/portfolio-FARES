"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Download, Heart } from "lucide-react";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "Fares_Ben_Khalifa_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "experience", label: t("nav.experience") },
    { id: "skills", label: t("nav.skills") },
    { id: "projects", label: t("nav.projects") },
    { id: "about", label: t("nav.about") },
    { id: "contact", label: t("nav.contact") },
  ];

  const socialLinks = [
    {
      icon: "/LinkedIn_icon.svg.png",
      name: "LinkedIn",
      url: "https://linkedin.com",
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <div className="mb-4">
              <Image
                src="/logo-fbk.png"
                alt="FBK Logo"
                width={90}
                height={40}
                className="object-contain"
              />
            </div>
            <p className={`text-foreground/60 text-sm leading-relaxed ${locale === "ar" ? "text-right" : ""}`}>
              {t("footer.description")}{" "}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <h3 className={`font-semibold mb-4 text-foreground ${locale === "ar" ? "text-right" : ""}`}>{t("footer.navigation")}</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`text-foreground/60 hover:text-primary transition-colors text-sm ${locale === "ar" ? "block text-right w-full" : ""}`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <h3 className={`font-semibold mb-4 text-foreground ${locale === "ar" ? "text-right" : ""}`}>{t('footer.social')}</h3>
            <div className={`space-y-2 ${locale === "ar" ? "text-right flex flex-col items-end" : ""}`}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors text-sm ${locale === "ar" ? "flex-row-reverse justify-end" : ""}`}
                  whileHover={{ x: 5 }}
                >
                  {typeof social.icon === "string" &&
                  social.icon.startsWith("/") ? (
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-lg">{social.icon}</span>
                  )}
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <h3 className={`font-semibold mb-4 text-foreground ${locale === "ar" ? "text-right" : ""}`}>{t("footer.actions")}</h3>
            <div className="space-y-3">
              <motion.button
                onClick={downloadCV}
                className={`flex items-center gap-2 w-full px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/40 transition-colors text-sm font-medium ${locale === "ar" ? "flex-row-reverse justify-center" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                {t("footer.downloadCv")}
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("contact")}
                className={`w-full px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium ${locale === "ar" ? "text-right" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("footer.contactMe")}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Bottom Footer */}
        <motion.div
          className={`flex flex-col sm:flex-row items-center justify-between text-foreground/60 text-sm ${locale === "ar" ? "text-right" : ""}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p className="mb-4 sm:mb-0" variants={itemVariants}>
            {locale === "ar" ? `${t("footer.rights")} © Fares Ben Khalifa. ${new Date().getFullYear()}` : `${new Date().getFullYear()} © Fares Ben Khalifa. ${t("footer.rights")}`}
            .
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
