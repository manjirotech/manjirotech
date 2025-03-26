"use client"

import { useEffect, useRef, useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import WhyChooseUs from "@/components/why-choose-us"
import Services from "@/components/services"
import ClientJourney from "@/components/client-journey"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import dynamic from "next/dynamic"
import styles from "./page.module.css"

const GSAPInit = dynamic(() => import("@/components/gsap-init"), { ssr: false });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const heroRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const whyChooseUsRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const clientJourneyRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const sections: Record<string, React.RefObject<HTMLElement | null>> = {
    hero: heroRef,
    about: aboutRef,
    whyChooseUs: whyChooseUsRef,
    services: servicesRef,
    clientJourney: clientJourneyRef,
    contact: contactRef,
  };

  const scrollToSection = (section: string) => {
    sections[section].current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className={`${styles.main} ${isLoaded ? styles.loaded : ""}`}>
      <Navbar onNavClick={scrollToSection} />
      <GSAPInit />

      <section ref={heroRef} id="hero">
        <Hero />
      </section>

      <section ref={aboutRef} id="about">
        <About />
      </section>

      <section ref={whyChooseUsRef} id="why-choose-us">
        <WhyChooseUs />
      </section>

      <section ref={servicesRef} id="services">
        <Services />
      </section>

      <section ref={clientJourneyRef} id="client-journey">
        <ClientJourney />
      </section>

      <section ref={contactRef} id="contact">
        <Contact />
      </section>

      <Footer onNavClick={scrollToSection} />
    </main>
  )
}
