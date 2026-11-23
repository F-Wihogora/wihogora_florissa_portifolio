"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "@/lib/useScrollReveal";
import KineticHeadline from "./KineticHeadline";
import styles from "./Projects.module.css";

let pluginRegistered = false;

const PROJECTS = [
  {
    name: "Church Management System",
    description:
      "A comprehensive management platform for church administration — membership, attendance, and events in one dashboard.",
    features: [
      "Member management",
      "QR code check-in",
      "Attendance tracking",
      "Department management",
      "Event scheduling",
      "Role-based auth",
    ],
    stack: ["Spring Boot", "React", "PostgreSQL", "JWT", "Docker"],
    photo: {
      src: "/images/projects/church.png",
      alt: "Church Management System dashboard showing members, attendance and departments",
    },
  },
  {
    name: "Personal Finance & Savings App",
    description:
      "A mobile-focused app that automatically allocates income into savings goals to help users build consistent habits.",
    features: [
      "Automatic savings",
      "Budget tracking",
      "Financial analytics",
      "Savings goals",
      "Notifications",
    ],
    stack: ["React", "Node.js", "Express", "MySQL"],
    photo: {
      src: "/images/projects/finance.png",
      alt: "Savings goals web page and mobile app screen for the finance app",
    },
  },
  {
    name: "Smart Water Monitoring System",
    description:
      "An IoT solution for monitoring water quality and environmental conditions using connected sensors in real time.",
    features: [
      "Real-time sensor data",
      "Dashboard visualisation",
      "Threshold alerts",
      "Historical data logging",
    ],
    stack: ["ESP8266", "MQTT", "Node.js", "React"],
    photo: {
      src: "/images/projects/water.png",
      alt: "Water monitoring dashboard with live sensor readings and alerts",
    },
  },
];

/**
 * Projects
 * -----------------------------------------------------------------------
 * A vertical scroll gallery: each project panel's cover image un-masks
 * (clip-path) and drifts into place as it enters the viewport, with the
 * copy following a beat behind. Deliberately NOT a pinned/horizontal
 * scroll-jack — that combination fought the sticky sections around it
 * and the Lenis-driven smooth scroll, causing the page to stall and then
 * jump. Every trigger here is self-contained (own trigger element, own
 * start/end, no pin, no containerAnimation), which is what makes it
 * robust: nothing here can desync from a neighboring section's layout.
 *
 * The cover images in public/images/projects are website interface
 * previews (representative UI, not live screenshots). Replace each file
 * with a real screenshot of the project whenever you have one.
 *
 * Alternating left/right image placement + a large index numeral keep it
 * from reading as a generic card grid, and the cursor-reactive image
 * parallax on hover is independent of scroll entirely.
 */
export default function Projects() {
  const sectionRef = useRef(null);
  const panelRefs = useRef([]);
  useScrollReveal(sectionRef, "[data-reveal]", { y: 20, stagger: 0.08 });

  useEffect(() => {
    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }

    const section = sectionRef.current;
    if (!section) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        panelRefs.current.forEach((panel) => {
          if (!panel) return;
          const image = panel.querySelector("[data-project-image]");
          if (image) gsap.set(image, { clipPath: "inset(0 0% 0 0%)", scale: 1 });
        });
        return;
      }

      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        const image = panel.querySelector("[data-project-image]");
        const copy = panel.querySelectorAll("[data-panel-copy]");

        gsap.fromTo(
          image,
          { clipPath: "inset(0 30% 0 30%)", scale: 1.08 },
          {
            clipPath: "inset(0 0% 0 0%)",
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 78%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          copy,
          { y: 26, opacity: 0.001 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 72%",
              once: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Cursor-reactive image parallax — physically-connected to the pointer,
  // entirely independent of scroll/ScrollTrigger.
  const handlePointerMove = (e) => {
    const wrap = e.currentTarget;
    const img = wrap.querySelector("[data-project-image]");
    if (!img) return;
    const rect = wrap.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    img.style.transform = `scale(1.03) translate(${relX * -6}px, ${relY * -6}px)`;
  };

  const handlePointerLeave = (e) => {
    const img = e.currentTarget.querySelector("[data-project-image]");
    if (img) img.style.transform = "";
  };

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className={styles.header}>
        <span className="eyebrow" data-reveal>
          Selected Work
        </span>
        <KineticHeadline
          as="h2"
          className={styles.title}
          accentClassName={styles.titleAccent}
          accentLineIndex={1}
          lines={["Projects built", "end to end."]}
        />
      </div>

      <div className={styles.list}>
        {PROJECTS.map((project, i) => (
          <article
            className={`${styles.panel} ${i % 2 === 1 ? styles.panelReverse : ""}`}
            key={project.name}
            ref={(el) => (panelRefs.current[i] = el)}
          >
            <div
              className={styles.imageWrap}
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
            >
              <img
                src={project.photo.src}
                alt={project.photo.alt}
                className={styles.image}
                data-project-image
                draggable={false}
                loading="lazy"
                decoding="async"
              />
              <span className={styles.panelIndex}>0{i + 1}</span>
            </div>

            <div className={styles.panelCopy}>
              <h3 className={styles.panelTitle} data-panel-copy>
                {project.name}
              </h3>
              <p className={styles.panelDescription} data-panel-copy>
                {project.description}
              </p>
              <ul className={styles.featureList} data-panel-copy>
                {project.features.map((f) => (
                  <li key={f} className={styles.featureItem}>
                    {f}
                  </li>
                ))}
              </ul>
              <div className={styles.stackRow} data-panel-copy>
                {project.stack.map((tech) => (
                  <span key={tech} className={styles.stackPill}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <a
        href="https://github.com/F-Wihogora"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.moreLink}
        data-reveal
        data-magnetic
      >
        See more on GitHub
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
