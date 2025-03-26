"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useScroll, useTransform, useAnimation } from "framer-motion"
import styles from "./client-journey.module.css"

const ClientJourney = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])

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
        staggerChildren: 0.2,
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

  const steps = [
    {
      title: "Consultation",
      description: "We start by understanding your business goals and challenges to create a tailored approach.",
      animation: "fade-slide-up",
      icon: "🤝",
      color: "#4A90E2",
    },
    {
      title: "Strategy",
      description: "We develop a comprehensive strategy aligned with your objectives and target audience.",
      animation: "expand-in",
      icon: "📝",
      color: "#50E3C2",
    },
    {
      title: "Execution",
      description: "Our team implements the strategy with precision, creativity, and attention to detail.",
      animation: "bounce-in-left",
      icon: "⚙️",
      color: "#F5A623",
    },
    {
      title: "Optimization",
      description: "We continuously monitor performance and optimize for the best possible results.",
      animation: "glow-in-top",
      icon: "📈",
      color: "#D0021B",
    },
  ]

  return (
    <div className={styles.clientJourney} ref={ref}>
      <div className={styles.lightTrails}></div>
      <div className={styles.glowOrbs}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          Our Process
        </motion.div>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          How We Work
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
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our streamlined process ensures efficient delivery and exceptional results
        </motion.p>

        <div className={styles.timelineContainer}>
          <div className={styles.timelineProgressContainer}>
            <motion.div className={styles.progressLine} style={{ height: lineHeight }}></motion.div>

            <div className={styles.progressDots}>
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.progressDot}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.3 }}
                ></motion.div>
              ))}
            </div>
          </div>

          <motion.div className={styles.timeline} variants={containerVariants} initial="hidden" animate={controls}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className={`${styles.step} ${styles[step.animation]}`}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                }}
              >
                <div className={styles.stepConnector}>
                  <motion.div
                    className={styles.connector}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : { width: 0 }}
                    transition={{ delay: 0.7 + i * 0.2, duration: 0.5 }}
                  ></motion.div>
                </div>

                <div
                  className={styles.stepIconContainer}
                  style={{
                    background: `linear-gradient(135deg, var(--gold), ${step.color})`,
                  }}
                >
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <div className={styles.iconRing}></div>
                </div>

                <div className={styles.stepContent}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>

                  <div className={styles.stepNumber}>{i + 1}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className={styles.ctaText}>Ready to start your journey with us?</p>
          <motion.button
            className={styles.ctaButton}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px rgba(164, 131, 52, 0.3)",
              scale: 1.05,
            }}
            whileTap={{ scale: 0.98 }}
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

export default ClientJourney

