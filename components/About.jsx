"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import KineticHeadline from "./KineticHeadline";
import styles from "./About.module.css";

const FACTS = [
  { label: "Based in", value: "Kigali, Rwanda" },
  { label: "Focus", value: "Full-Stack, Mobile, Embedded" },
  { label: "Open to", value: "Internships & junior roles" },
];

export default function About() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.inner} ref={innerRef}>
        <div className={styles.copy}>
          <span className="eyebrow" data-reveal>
            About
          </span>
          <KineticHeadline
            as="h2"
            className={styles.title}
            lines={[
              "Technology should not only work —",
              "it should make people's lives easier.",
            ]}
          />
          <p className={styles.paragraph} data-reveal>
            I&apos;m a passionate software developer who enjoys turning ideas
            into reliable products — designing intuitive interfaces,
            developing RESTful APIs, managing databases, and integrating
            hardware with software. I like working across the entire
            stack, from a sensor on a breadboard to the dashboard that
            visualizes its data.
          </p>
          <p className={styles.paragraph} data-reveal>
            I&apos;ve built practical applications for education, business,
            and community organizations — from church administration
            platforms to IoT water monitoring. My long-term goal is to
            become a <strong>world-class software engineer</strong>{" "}
            building impactful products used by millions of people.
          </p>
        </div>

        <div className={styles.factsCard}>
          <div className={styles.factsHeader} data-reveal>
            Quick facts
          </div>
          <ul className={styles.factsList}>
            {FACTS.map((fact) => (
              <li key={fact.label} className={styles.factRow} data-reveal>
                <span className={styles.factLabel}>{fact.label}</span>
                <span className={styles.factValue}>{fact.value}</span>
              </li>
            ))}
          </ul>
          <div className={styles.factsDivider} />
          <p className={styles.factsFooter} data-reveal>
            Full-stack web · embedded systems · cybersecurity — I enjoy
            collaborating with teams and solving complex technical
            challenges.
          </p>
        </div>
      </div>
    </section>
  );
}
