"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import styles from "./contact.module.css"

interface ContactProps {
  onNavClick: (section: string) => void;
}

const Contact = ({ onNavClick }: ContactProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [activeField, setActiveField] = useState<string | null>(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    alert("Thank you for your message! We will get back to you soon.")
    setFormState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  const socialLinks = [
    { name: "LinkedIn", icon: "in", color: "#0077B5" },
    { name: "Twitter", icon: "X", color: "#000000" },
    { 
      name: "Instagram", 
      icon: "IG", 
      color: "#E1306C"
    },
    // { name: "Facebook", icon: "f", color: "#4267B2" },
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
    <div className={styles.contact} ref={ref}>
      <div className={styles.goldAccents}></div>
      <div className={styles.glowOrbs}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.div>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get In Touch
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
          Let's discuss how we can help your business grow
        </motion.p>

        <div className={styles.contentWrapper}>
          <motion.div className={styles.formContainer} variants={containerVariants} initial="hidden" animate={controls}>
            <div className={styles.formHeader}>
              <h3>Send Us a Message</h3>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <motion.div
                  className={`${styles.formGroup} ${activeField === "name" ? styles.active : ""}`}
                  variants={itemVariants}
                >
                  <label htmlFor="name" className={styles.formLabel}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField(null)}
                    required
                    className={styles.formControl}
                  />
                  <div className={styles.formBorder}></div>
                </motion.div>

                <motion.div
                  className={`${styles.formGroup} ${activeField === "email" ? styles.active : ""}`}
                  variants={itemVariants}
                >
                  <label htmlFor="email" className={styles.formLabel}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                    required
                    className={styles.formControl}
                  />
                  <div className={styles.formBorder}></div>
                </motion.div>
              </div>

              <div className={styles.formRow}>
                <motion.div
                  className={`${styles.formGroup} ${activeField === "phone" ? styles.active : ""}`}
                  variants={itemVariants}
                >
                  <label htmlFor="phone" className={styles.formLabel}>
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    onFocus={() => setActiveField("phone")}
                    onBlur={() => setActiveField(null)}
                    className={styles.formControl}
                  />
                  <div className={styles.formBorder}></div>
                </motion.div>

                <motion.div
                  className={`${styles.formGroup} ${activeField === "subject" ? styles.active : ""}`}
                  variants={itemVariants}
                >
                  <label htmlFor="subject" className={styles.formLabel}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    onFocus={() => setActiveField("subject")}
                    onBlur={() => setActiveField(null)}
                    required
                    className={styles.formControl}
                  />
                  <div className={styles.formBorder}></div>
                </motion.div>
              </div>

              <motion.div
                className={`${styles.formGroup} ${activeField === "message" ? styles.active : ""}`}
                variants={itemVariants}
              >
                <label htmlFor="message" className={styles.formLabel}>
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField("message")}
                  onBlur={() => setActiveField(null)}
                  required
                  className={styles.formControl}
                  rows={5}
                ></textarea>
                <div className={styles.formBorder}></div>
              </motion.div>

              <motion.button
                type="submit"
                className={styles.submitBtn}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px rgba(164, 131, 52, 0.3)",
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
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
                  className={styles.btnIcon}
                >
                  <path d="m22 2-7 20-4-9-9-4Z"></path>
                  <path d="M22 2 11 13"></path>
                </svg>
              </motion.button>
            </form>
          </motion.div>

          <motion.div className={styles.contactInfo} variants={containerVariants} initial="hidden" animate={controls}>
            <div className={styles.infoHeader}>
              <h3>Contact Information</h3>
              <p>Reach out to us directly through any of these channels.</p>
            </div>

            {/* <motion.div className={styles.infoCard} variants={itemVariants}>
              <div className={styles.infoIcon}>📍</div>
              <div className={styles.infoContent}>
                <h4>Message Us</h4>
                <p>info@manjirotech.com</p>
                <p>support@manjirotech.com</p>
              </div>
            </motion.div> */}

            <motion.div className={styles.infoCard} variants={itemVariants}>
              <div className={styles.infoIcon}>📧</div>
              <div className={styles.infoContent}>
                <h4>Email Us</h4>
                <p>manjirotech@gmail.com</p>
                <p>manjirotechsupport@gmail.com</p>
              </div>
            </motion.div>

            <motion.div className={styles.infoCard} variants={itemVariants}>
              <div className={styles.infoIcon}>📱</div>
              <div className={styles.infoContent}>
                <h4>Call Us</h4>
                <p>+91 7904873545</p>
                <p>Monday - Saturday: 9am - 6pm</p>
              </div>
            </motion.div>

            <motion.div className={styles.socialLinks} variants={itemVariants}>
              <h4>Connect With Us</h4>
              <div className={styles.socialIcons}>
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className={styles.socialLink}
                    aria-label={link.name}
                    style={{ backgroundColor: link.color }}
                    whileHover={{ y: -5, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* <motion.div
          className={styles.mapContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapPin}></div>
            <p>Interactive Map Coming Soon</p>
          </div>
        </motion.div> */}
      </div>
    </div>
  )
}

export default Contact
