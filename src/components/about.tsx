"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import styles from "./about.module.css"

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

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

  const icons = [
    {
      name: "Web Development",
      emoji: "💻",
      description: "Modern websites and web applications",
      color: "#4A90E2",
    },
    {
      name: "UI/UX Design",
      emoji: "🎨",
      description: "Beautiful and intuitive interfaces",
      color: "#50E3C2",
    },
    {
      name: "Digital Marketing",
      emoji: "📈",
      description: "Data-driven marketing strategies",
      color: "#F5A623",
    },
    {
      name: "Innovation",
      emoji: "💡",
      description: "Cutting-edge technology solutions",
      color: "#D0021B",
    },
  ]

  return (
    <div className={styles.about} ref={ref}>
      <div className={styles.particles}></div>
      <div className={styles.glowOrbs}></div>

      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={styles.badge}
        >
          About Us
        </motion.div>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Who We Are
        </motion.h2>

        <motion.div
          className={styles.titleAccent}
          initial={{ width: 0 }}
          animate={isInView ? { width: "80px" } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>

        <motion.p
          className={styles.content}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Manjiro Tech Services is a next-generation provider of IT and digital marketing solutions. We empower
          businesses with innovative strategies, cutting-edge technology, and creative execution to drive growth and
          success in today's competitive digital landscape.
        </motion.p>

        <motion.div className={styles.iconsContainer} variants={containerVariants} initial="hidden" animate={controls}>
          {icons.map((icon, i) => (
            <motion.div
              key={i}
              className={styles.iconBox}
              variants={itemVariants}
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
                  background: `linear-gradient(135deg, var(--gold), ${icon.color})`,
                }}
              >
                <div className={styles.icon}>{icon.emoji}</div>
                <div className={styles.iconRing}></div>
              </div>
              <h3>{icon.name}</h3>
              <p>{icon.description}</p>

              <div className={styles.iconBoxAccent}></div>
              <div className={styles.iconBoxCorner}></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.statsContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className={styles.statItem}>
            <div className={styles.statValue}>100+</div>
            <div className={styles.statLabel}>Happy Clients</div>
          </div>

          <div className={styles.statDivider}></div>

          <div className={styles.statItem}>
            <div className={styles.statValue}>250+</div>
            <div className={styles.statLabel}>Projects Completed</div>
          </div>

          <div className={styles.statDivider}></div>

          <div className={styles.statItem}>
            <div className={styles.statValue}>5+</div>
            <div className={styles.statLabel}>Years Experience</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About

