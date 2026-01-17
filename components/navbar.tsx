"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { Menu, X, Download } from "lucide-react"

export default function Navbar() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      const sections = ["experience", "skills", "projects", "about", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const changeLanguage = (newLocale: string) => {
    if (newLocale !== locale) {
      router.push("/", { locale: newLocale })
    }
  }

  const navLinks = [
    { id: "experience", label: t("nav.experience") },
    { id: "skills", label: t("nav.skills") },
    { id: "projects", label: t("nav.projects") },
    { id: "about", label: t("nav.about") },
    { id: "contact", label: t("nav.contact") },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
      setIsOpen(false)
    }
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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                router.push("/")
              }}
              className="h-16 w-24 relative hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo-fbk.png"
                alt="FBK Logo"
                width={90}
                height={60}
                className="object-cover"
              />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.id ? "text-primary" : "text-foreground/70 hover:text-primary"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 bg-card rounded-full p-1.5 border border-border">
              {["en", "fr", "ar"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    locale === lang
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-foreground/70 hover:text-primary hover:bg-card/50"
                  }`}
                  aria-label={`Switch to ${lang.toUpperCase()}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={downloadCV}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-primary/50"
            >
              <Download size={18} />
              {t("nav.downloadCV")}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-card hover:bg-card/80 border border-border transition-colors text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6 border-t border-border bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-4 mt-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left px-4 py-2 rounded-lg hover:bg-card/60 transition-colors text-foreground/70 hover:text-primary font-medium"
                >
                  {link.label}
                </button>
              ))}

              <div className="px-4 py-2 border-t border-border pt-4">
                <p className="text-xs text-muted mb-2 font-semibold uppercase">Language</p>
                <div className="flex gap-2">
                  {["en", "fr", "ar"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        locale === lang
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-card/60 hover:bg-card border border-border text-foreground/70 hover:text-primary"
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={downloadCV}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold mx-4 mt-2 shadow-lg"
              >
                <Download size={18} />
                {t("nav.downloadCV")}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
