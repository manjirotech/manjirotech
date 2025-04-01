"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import styles from "./page.module.css"

const GSAPInit = dynamic(() => import("@/components/gsap-init"), { ssr: false });
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });
const Hero = dynamic(() => import("@/components/hero"), { ssr: false });
const About = dynamic(() => import("@/components/about"), { ssr: false });
const WhyChooseUs = dynamic(() => import("@/components/why-choose-us"), { ssr: false });
const Services = dynamic(() => import("@/components/services"), { ssr: false });
const ClientJourney = dynamic(() => import("@/components/client-journey"), { ssr: false });
const Contact = dynamic(() => import("@/components/contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer"), { ssr: false });

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
        <Hero onNavClick={scrollToSection}/>
      </section>

      <section ref={aboutRef} id="about">
        <About onNavClick={scrollToSection}/>
      </section>

      <section ref={whyChooseUsRef} id="why-choose-us">
        <WhyChooseUs onNavClick={scrollToSection}/>
      </section>

      <section ref={servicesRef} id="services">
        <Services onNavClick={scrollToSection}/>
      </section>

      <section ref={clientJourneyRef} id="client-journey">
        <ClientJourney onNavClick={scrollToSection}/>
      </section>

      <section ref={contactRef} id="contact">
        <Contact onNavClick={scrollToSection} />
      </section>

      <Footer onNavClick={scrollToSection} />
    </main>
  )
}
