"use client"

import { motion } from "framer-motion"
import styles from "./footer.module.css"
import ManjiroLogo from "@/assets/Manjiro_Tech_Logo.png"
import Image from "next/image"

const Footer = ({ onNavClick }: { onNavClick: (section: string) => void }) => {
  const currentYear = new Date().getFullYear()

  const navItems = [
    { name: "Home", section: "hero" },
    { name: "About", section: "about" },
    { name: "Why Us", section: "whyChooseUs" },
    { name: "Services", section: "services" },
    { name: "How We Work", section: "clientJourney" },
    { name: "Contact", section: "contact" },
  ]

  const services = [
    "Content Marketing",
    "Web Development",
    "UI/UX Design",
    "SEO Optimization",
    "Social Media Marketing",
    "App Development",
  ]

  const contactInfo = [
    { label: "Email", value: "manjirotech@gmail.com" },
    { label: "Phone", value: "+91 7904873545" },
    { label: "Time", value: "Mon - Sat: 9am - 6pm" },
  ]

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGlow}></div>

      <motion.div
        className={styles.footerContent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className={styles.footerTop}>
          <motion.div className={styles.footerLogo} variants={itemVariants}>
            <div className={styles.logoShape}>
              {/* <span className={styles.logoText}>M</span> */}
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
        </div>

        <div className={styles.footerGrid}>
          <motion.div className={styles.footerColumn} variants={itemVariants}>
            <h3 className={styles.footerHeading}>About Us</h3>
            <p className={styles.footerDescription}>
              Manjiro Tech provides innovative digital & IT solutions designed to drive results for your business. We
              combine creativity with technical expertise to help you thrive in the digital landscape.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                in
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                X
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                IG
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                f
              </a>
            </div>
          </motion.div>

          <motion.div className={styles.footerColumn} variants={itemVariants}>
            <h3 className={styles.footerHeading}>Quick Links</h3>
            <ul className={styles.footerLinks}>
              {navItems.map((item, i) => (
                <li key={i}>
                  <a onClick={() => onNavClick(item.section)} className={styles.footerLink}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className={styles.footerColumn} variants={itemVariants}>
            <h3 className={styles.footerHeading}>Our Services</h3>
            <ul className={styles.footerLinks}>
              {services.map((service, i) => (
                <li key={i}>
                  <a href="#" className={styles.footerLink}>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className={styles.footerColumn} variants={itemVariants}>
            <h3 className={styles.footerHeading}>Contact Us</h3>
            <ul className={styles.contactList}>
              {contactInfo.map((info, i) => (
                <li key={i} className={styles.contactItem}>
                  <strong>{info.label}:</strong> {info.value}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div className={styles.footerBottom} variants={itemVariants}>
          <div className={styles.footerDivider}></div>
          <div className={styles.footerBottomContent}>
            <p className={styles.copyright}>&copy; {currentYear} Manjiro Tech Services. All Rights Reserved.</p>
            {/* <div className={styles.footerBottomLinks}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Sitemap</a>
            </div> */}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer

