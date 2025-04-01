"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import styles from "./hero.module.css"
import ManjiroLogo from "@/assets/Manjiro_Tech_Logo.png"
import Image from "next/image"

const Hero = ({ onNavClick }: { onNavClick: (section: string) => void }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    // Typewriter effect for subtext
    const subtext = document.querySelector(`.${styles.subtext}`)
    if (subtext) {
      subtext.classList.add(styles.typewriterAnimation)
    }

    // Initialize the particle animation
    const canvas = document.getElementById("heroCanvas") as HTMLCanvasElement
    if (canvas) {
      const ctx = canvas.getContext("2d")

      // Set canvas dimensions
      const setCanvasDimensions = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      setCanvasDimensions()
      window.addEventListener("resize", setCanvasDimensions)

      // Create particles
      const particles: { x: number; y: number; radius: number; color: string; speedX: number; speedY: number }[] = []
      const particleCount = 100

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: `rgba(164, 131, 52, ${Math.random() * 0.3 + 0.1})`,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
        })
      }

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate)
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }

        particles.forEach((particle) => {
          // Move particles
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0

          // Draw particle
          if (ctx) {
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
            ctx.fillStyle = particle.color
            ctx.fill()
          }
        })
      }

      animate()

      return () => {
        window.removeEventListener("resize", setCanvasDimensions)
      }
    }
  }, [])

  return (
    <div className={styles.hero} ref={ref}>
      <canvas id="heroCanvas" className={styles.heroCanvas}></canvas>
      <div className={styles.lightStreaks}></div>

      <motion.div className={styles.content} style={{ y, opacity }}>
        <motion.div
          className={styles.logoContainer}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.logo}>
            {/* <span>M</span> */}
            <Image
              src={ManjiroLogo}
              alt="Manjiro Tech Logo"
              className={styles.logoImage}
            />
            <div className={styles.logoGlow}></div>
            <div className={styles.logoRings}>
              <div className={styles.ring}></div>
              <div className={styles.ring}></div>
              <div className={styles.ring}></div>
            </div>
          </div>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.titleLine}>Elevate Your Brand</span>
          <span className={styles.titleHighlight}>with Manjiro Tech</span>
        </motion.h1>

        <div className={styles.subtextContainer}>
          <p className={styles.subtext}>Innovative Digital & IT Solutions</p>
        </div>

        <motion.div
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <motion.button
            className={styles.cta}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px rgba(164, 131, 52, 0.3)",
              scale: 1.05,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavClick('contact')}
          >
            Get Started
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

          <motion.button
            className={styles.secondaryCta}
            whileHover={{
              y: -5,
              scale: 1.05,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavClick('services')}
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
          <div className={styles.scrollText}>Scroll Down</div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero
