"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useMagnetic } from "@/lib/useMagnetic";
import KineticHeadline from "./KineticHeadline";
import styles from "./Contact.module.css";

const CHANNELS = [
  {
    label: "Email",
    value: "wihogoraflorissa@gmail.com",
    href: "mailto:wihogoraflorissa@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/F-Wihogora",
    href: "https://github.com/F-Wihogora",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/wihogora-florissa",
    href: "https://linkedin.com/in/wihogora-florissa",
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const emailCtaRef = useRef(null);
  useScrollReveal(sectionRef);
  useMagnetic(emailCtaRef, 14);

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className={styles.inner} ref={innerRef}>
        <span className="eyebrow" data-reveal>
          Contact
        </span>

        <KineticHeadline
          as="h2"
          className={styles.title}
          accentClassName={styles.titleAccent}
          accentLineIndex={1}
          lines={["Let's build something", "that makes an impact."]}
        />

        <p className={styles.subtitle} data-reveal>
          I&apos;m seeking opportunities to contribute to innovative software
          projects while continuously growing as a full-stack developer.
          Whether it&apos;s an internship, a junior role, or a collaboration —
          I&apos;d love to hear from you.
        </p>

        <a
          ref={emailCtaRef}
          href="mailto:wihogoraflorissa@gmail.com"
          className={styles.emailCta}
          data-reveal
          data-magnetic
        >
          wihogoraflorissa@gmail.com
          <span aria-hidden="true">↗</span>
        </a>

        <div className={styles.channels}>
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.label === "Email" ? undefined : "_blank"}
              rel={c.label === "Email" ? undefined : "noopener noreferrer"}
              className={styles.channelCard}
              data-reveal
            >
              <span className={styles.channelLabel}>{c.label}</span>
              <span className={styles.channelValue}>{c.value}</span>
            </a>
          ))}
        </div>

        <div className={styles.location} data-reveal>
          <span className={styles.locationDot} aria-hidden="true" />
          Based in Kigali, Rwanda — open to remote work worldwide
        </div>
      </div>
    </section>
  );
}
