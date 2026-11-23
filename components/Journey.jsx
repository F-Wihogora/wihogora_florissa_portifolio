"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import KineticHeadline from "./KineticHeadline";
import styles from "./Journey.module.css";

const COURSEWORK = [
  "Data Structures & Algorithms",
  "Database Systems",
  "Software Engineering",
  "Networking",
  "Cybersecurity",
  "Web Development",
  "Embedded Systems",
];

const ACHIEVEMENTS = [
  "Built multiple full-stack applications from concept to deployment.",
  "Developed IoT projects integrating hardware and software.",
  "Designed responsive, user-friendly web interfaces.",
  "Experienced in RESTful API development and database design.",
  "Strong problem-solving and collaborative development skills.",
];

const LEARNING = [
  "Cloud Computing",
  "DevOps",
  "Kubernetes",
  "AI Integration",
  "System Design",
  "Scalable Software Architecture",
];

export default function Journey() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  useScrollReveal(sectionRef, "[data-reveal]", { y: 16, duration: 0.7, stagger: 0.04 });

  return (
    <section id="journey" className={styles.journey} ref={sectionRef}>
      <div className={styles.inner} ref={innerRef}>
        <div className={styles.header}>
          <span className="eyebrow" data-reveal>
            Journey
          </span>
          <KineticHeadline
            as="h2"
            className={styles.title}
            text="Education, achievements & what's next."
          />
        </div>

        <div className={styles.grid}>
          {/* Education */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle} data-reveal>
              Education
            </h3>
            <div className={styles.eduHeader} data-reveal>
              <span className={styles.eduSchool}>Rwanda Coding Academy</span>
              <span className={styles.eduField}>
                Software Programming, Embedded Systems &amp; Cybersecurity
              </span>
            </div>
            <p className={styles.eduLabel} data-reveal>
              Relevant coursework
            </p>
            <ul className={styles.tagList}>
              {COURSEWORK.map((c) => (
                <li key={c} className={styles.tag} data-reveal>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle} data-reveal>
              Achievements
            </h3>
            <ul className={styles.checkList}>
              {ACHIEVEMENTS.map((a) => (
                <li key={a} className={styles.checkItem} data-reveal>
                  <span className={styles.checkMark} aria-hidden="true">
                    ✓
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Currently learning */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle} data-reveal>
              Currently Learning
            </h3>
            <p className={styles.learningIntro} data-reveal>
              Growing toward building scalable, production-grade systems.
            </p>
            <ul className={styles.tagList}>
              {LEARNING.map((l) => (
                <li
                  key={l}
                  className={`${styles.tag} ${styles.tagAccent}`}
                  data-reveal
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
