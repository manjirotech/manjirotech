"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence, useAnimation } from "framer-motion"
import styles from "./services.module.css"

const tabNames: Record<string, string> = {
  content: "Content & Marketing",
  design: "Graphic & Design",
  development: "Web & App Development",
  media: "Editing & Media",
}

const tabColors: Record<string, string> = {
  content: "#4A90E2",
  design: "#50E3C2",
  development: "#F5A623",
  media: "#D0021B",
}

type TabKey = keyof typeof tabNames;

const Services = ({ onNavClick }: { onNavClick: (section: string) => void }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const controls = useAnimation()
  const [activeTab, setActiveTab] = useState<TabKey>('content');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }

    // Auto-rotate tabs every 8 seconds
    const tabs: TabKey[] = ["content", "design", "development", "media"]
    const interval = setInterval(() => {
      const currentIndex = tabs.indexOf(activeTab)
      const nextIndex = (currentIndex + 1) % tabs.length
      setActiveTab(tabs[nextIndex])
    }, 8000)

    return () => clearInterval(interval)
  }, [isInView, controls, activeTab])

  const services: Record<TabKey, string[]> = {
    content: [
      "Content Marketing",
      "Script Marketing",
      "Blog Ghostwriting",
      "Social Media Marketing",
      "Influencer Outreach",
      "SEO (On-Page, Off-Page, Technical)",
      "Lead Generation",
      "Performance Marketing",
      "Market Research & Competitor Analysis",
    ],
    design: [
      "Logo Design",
      "Poster Design",
      "Menu Design",
      "Catalogue Design",
      "Brochure Design",
      "Visiting Card Design",
      "Brand Identity Packages",
      "Product Packaging Design",
      "Infographic Design",
      "UI/UX Design",
      "UI/UX Audits",
      "3D Mockup Design",
    ],
    development: [
      "Web Development",
      "App Development",
      "E-Commerce Setup",
      "Custom WordPress Themes & Plugins",
      "Website Maintenance",
      "Progressive Web Apps (PWAs)",
      "Conversion Rate Optimization (CRO)",
      "Website Migration & Redesign",
    ],
    media: [
      "Video Editing",
      "Photo Editing",
      "Social Media Reels/TikToks/Shorts",
      "YouTube Channel Management",
      "Thumbnails and SEO for Videos",
      "Video Captioning/Subtitling",
    ],
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
    <div className={styles.services} ref={ref}>
      <div className={styles.particles}></div>
      <div className={styles.glowOrbs}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          Our Expertise
        </motion.div>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our Services
        </motion.h2>

        <motion.div
          className={styles.titleAccent}
          initial={{ width: 0 }}
          animate={isInView ? { width: "80px" } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Comprehensive digital solutions tailored to your business needs
        </motion.p>

        <div className={styles.tabs}>
          {Object.keys(tabNames).map((tab: any) => (
            <motion.button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              style={{
                borderColor: activeTab === tab ? tabColors[tab] : "var(--gold)",
                background:
                  activeTab === tab ? `linear-gradient(90deg, var(--gold), ${tabColors[tab]})` : "transparent",
              }}
            >
              {tabNames[tab]}
              {activeTab === tab && (
                <motion.div className={styles.activeIndicator} layoutId="activeIndicator"></motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={styles.servicesGrid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {services[activeTab].map((service: string, i: number) => (
              <motion.div
                key={i}
                className={styles.serviceCard}
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(`${activeTab}-${i}`)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{
                  y: -15,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  background: "rgba(255, 255, 255, 0.3)",
                }}
                style={{
                  transitionDelay: `${i * 0.05}s`,
                }}
              >
                <div className={styles.serviceContent}>
                  <span className={styles.serviceText}>{service}</span>

                  <motion.div
                    className={styles.serviceIcon}
                    animate={{
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.1, 1, 1.1, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: Math.random() * 5,
                    }}
                    style={{
                      background: `linear-gradient(135deg, var(--gold), ${tabColors[activeTab]})`,
                    }}
                  >
                    {activeTab === "content" && "📝"}
                    {activeTab === "design" && "🎨"}
                    {activeTab === "development" && "💻"}
                    {activeTab === "media" && "🎬"}
                  </motion.div>
                </div>

                <div
                  className={styles.cardAccent}
                  style={{
                    background: `linear-gradient(90deg, var(--gold), ${tabColors[activeTab]})`,
                  }}
                ></div>

                <motion.div
                  className={styles.cardGlow}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: Math.random() * 2,
                  }}
                ></motion.div>

                <div className={styles.cardShimmer}></div>

                <motion.div
                  className={styles.learnMore}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === `${activeTab}-${i}` ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.learnMoreIcon}
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className={styles.ctaText}>Need a custom solution for your business?</p>
          <motion.button
            className={styles.ctaButton}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px rgba(164, 131, 52, 0.3)",
              scale: 1.05,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavClick('contact')}
          >
            Contact Us
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.ctaIcon}
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Services
