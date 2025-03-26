"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./navbar.module.css"
import ManjiroLogo from "@/assets/Manjiro_Tech_Logo.png"
import Image from "next/image"

const Navbar = ({ onNavClick }: { onNavClick: (section: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Determine active section based on scroll position
      const sections = ["hero", "about", "whyChooseUs", "services", "clientJourney", "contact"]
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (section: string) => {
    onNavClick(section)
    setIsMobileMenuOpen(false)
    setActiveSection(section)
  }

  const navItems = [
    { name: "Home", section: "hero" },
    { name: "About", section: "about" },
    { name: "Why Us", section: "whyChooseUs" },
    { name: "Services", section: "services" },
    { name: "How We Work", section: "clientJourney" },
    { name: "Contact", section: "contact" },
  ]

  return (
    <motion.nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.navbarGlow}></div>
      <div className={styles.navContainer}>
        <motion.div
          className={styles.logo}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.logoShape}>
            <Image 
              src={ManjiroLogo} 
              alt="Manjiro Tech Logo" 
              className={styles.logoImage} 
            />
            <div className={styles.logoRing}></div>
          </div>
          <div className={styles.logoTextContainer}>
            <span className={styles.logoFullText}>Manjiro</span>
            <span className={styles.logoSubText}>Tech</span>
          </div>
        </motion.div>

        <div className={styles.mobileMenuButton} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className={`${styles.menuBar} ${isMobileMenuOpen ? styles.open : ""}`}></div>
          <div className={`${styles.menuBar} ${isMobileMenuOpen ? styles.open : ""}`}></div>
          <div className={`${styles.menuBar} ${isMobileMenuOpen ? styles.open : ""}`}></div>
        </div>

        <div className={styles.navLinksDesktop}>
          {navItems.map((item, i) => (
            <motion.div
              key={i}
              className={`${styles.navItem} ${activeSection === item.section ? styles.activeNavItem : ""}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
            >
              <a onClick={() => handleNavClick(item.section)} className={styles.navLink}>
                {item.name}
                {activeSection === item.section && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="navIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            </motion.div>
          ))}

          <motion.button
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            Get Started
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className={styles.mobileMenuContent}>
              {navItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className={`${styles.mobileNavItem} ${activeSection === item.section ? styles.activeMobileItem : ""}`}
                >
                  <a onClick={() => handleNavClick(item.section)} className={styles.mobileNavLink}>
                    {item.name}
                  </a>
                </motion.div>
              ))}

              <motion.button
                className={styles.mobileCta}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

