"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence, useAnimation } from "framer-motion"
import styles from "./why-choose-us.module.css"

interface WhyChooseUsProps {
  onNavClick: (section: string) => void;
}

const WhyChooseUs = ({ onNavClick }: WhyChooseUsProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const reasons = [
    {
      icon: "🚀",
      title: "Tailored Solutions for Your Business",
      description: "We create custom strategies that fit your unique goals, ensuring the best results for your brand.",
      animation: "underline",
      color: "#4A90E2",
    },
    {
      icon: "💡",
      title: "Creative & Technology-Driven Approach",
      description: "We combine creativity with the latest technology to help your business stand out and grow.",
      animation: "scale",
      color: "#50E3C2",
    },
    {
      icon: "🔒",
      title: "Reliable & Transparent Service",
      description: "We believe in clear communication, honest work, and delivering exactly what we promise—no hidden surprises.",
      animation: "glow",
      color: "#F5A623",
    },
    {
      icon: "🌍",
      title: "All-in-One Digital Solution",
      description: "With 40+ services, we cover everything from marketing and design to web development and media, so you get everything in one place.",
      animation: "shake",
      color: "#D0021B",
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
    <div className={styles.whyChooseUs} ref={ref}>
      <div className={styles.geometricShapes}></div>
      <div className={styles.glowOrbs}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us
        </motion.div>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Why Choose Manjiro Tech?
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
          We combine innovation, expertise, and dedication to help your business thrive in the digital world.
        </motion.p>

        <motion.div
          className={styles.reasonsContainer}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {reasons.map((reason: typeof reasons[number], i: number) => (
            <motion.div
              key={i}
              className={`${styles.reasonBox} ${styles[reason.animation]}`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{
                y: -15,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                background: "rgba(255, 255, 255, 0.3)",
              }}
              style={{
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className={styles.iconCircle}
                style={{
                  background: `linear-gradient(135deg, var(--gold), ${reason.color})`,
                }}
              >
                <span className={styles.icon}>{reason.icon}</span>
                <div className={styles.iconRing}></div>
              </div>
              <h3>{reason.title}</h3>

              <AnimatePresence>
                {(hoveredIndex === i || window.innerWidth < 768) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.reasonDescription}
                  >
                    {reason.description}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className={styles.reasonBoxAccent}></div>
              <div className={styles.reasonBoxCorner}></div>

              <motion.div
                className={styles.learnMore}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
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

        <motion.div
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className={styles.ctaText}>Ready to take your business to the next level?</p>
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
            Get Started Now
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

export default WhyChooseUs
