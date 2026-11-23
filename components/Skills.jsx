"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import KineticHeadline from "./KineticHeadline";
import styles from "./Skills.module.css";

const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "C++", "C", "PHP"],
  },
  {
    title: "Frontend & Mobile",
    items: [
      "HTML5",
      "CSS3",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Flutter",
      "React Native",
      "Responsive Design",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "Spring Boot", "REST APIs", "JWT Authentication"],
  },
  {
    title: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Embedded Systems",
    items: ["Arduino", "ESP8266", "MQTT", "RFID Systems", "Sensor Integration"],
  },
  {
    title: "Tools & Technologies",
    items: ["Git & GitHub", "Docker", "Linux", "VS Code", "Postman", "Figma"],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  useScrollReveal(sectionRef, "[data-reveal]", { y: 14, duration: 0.6, stagger: 0.03 });

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <div className={styles.inner} ref={innerRef}>
        <div className={styles.header}>
          <span className="eyebrow" data-reveal>
            Skills
          </span>
          <KineticHeadline
            as="h2"
            className={styles.title}
            text="Comfortable across the whole stack."
          />
          <p className={styles.subtitle} data-reveal>
            From pixel-perfect interfaces to the sensor feeding them data —
            here&apos;s the toolkit I reach for.
          </p>
        </div>

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group) => (
            <div className={styles.card} key={group.title}>
              <h3 className={styles.cardTitle} data-reveal>
                {group.title}
              </h3>
              <ul className={styles.pillList}>
                {group.items.map((item) => (
                  <li key={item} className={styles.pill} data-reveal>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
