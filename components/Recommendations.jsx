"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useScrollReveal } from "@/lib/useScrollReveal";
import KineticHeadline from "./KineticHeadline";
import styles from "./Recommendations.module.css";

const TESTIMONIALS = [
  {
    name: "Kaneza Amandine",
    role: "UX/UI Designer at RTB Development Team",
    quote:
      "Florissa is one of those people who makes you feel comfortable being yourself. She is kind, easy to talk to, and always willing to help when you need her.",
  },
  {
    name: "Kawacu Kennedy",
    role: "Founder of Kuberna Labs · Software Engineer",
    quote:
      "What I like most about Florissa is how she puts her heart into whatever she does. She is curious, determined, and always willing to learn. She brings ideas to life with a level of enthusiasm that makes working with her enjoyable.",
  },
  {
    name: "Irasubiza Divine",
    role: "Frontend and Graphics designer",
    quote:
      "Florissa is genuinely fun to work with. She listens, shares her ideas openly, and somehow always finds a way to make things better. She is someone you can count on.",
  },
  {
    name: "Kayinamura Geofrey",
    role: "Team Leader, RTB Development Team",
    quote:
      "Florissa is the kind of person who brings good energy wherever she goes. She is curious, determined, and always looking for ways to learn and improve. What stands out most is her willingness to take initiative and grow.",
  },
  {
    name: "UWASE TETA Paola",
    role: "Senior Frontend Developer at SicilyLabs · Event Planner",
    quote:
      "Florissa is a creative and thoughtful person who brings genuine enthusiasm to everything she does. I appreciate her curiosity, her willingness to learn, and the way she approaches new ideas with an open mind.",
  },
];

// First + last word of the name -> "KA", "UP" ...
const initials = (name) => {
  const parts = name.trim().split(/\s+/);
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
};

export default function Recommendations() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  useScrollReveal(headerRef, "[data-reveal]", { y: 20, stagger: 0.08 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      // The track holds the list twice back-to-back, so sliding it by -50%
      // loops seamlessly. ~9s per card keeps the reading speed steady.
      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        duration: TESTIMONIALS.length * 9,
        ease: "none",
        repeat: -1,
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  const pause = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.play();

  return (
    <section id="recommendations" className={styles.recommendations} ref={sectionRef}>
      <div className={styles.header} ref={headerRef}>
        <span className="eyebrow" data-reveal>
          Recommendations
        </span>
        <KineticHeadline
          as="h2"
          className={styles.title}
          text="What it's like to work together."
        />
      </div>

      <div
        className={styles.marqueeViewport}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
      >
        <div className={styles.marqueeTrack} ref={trackRef}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => {
            const isDuplicate = i >= TESTIMONIALS.length;
            return (
              <figure
                className={styles.card}
                key={i}
                data-dup={isDuplicate ? "true" : undefined}
                aria-hidden={isDuplicate ? "true" : undefined}
              >
                <span className={styles.quoteMark} aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className={styles.quote}>{t.quote}</blockquote>
                <figcaption className={styles.attribution}>
                  <span className={styles.avatar} aria-hidden="true">
                    {initials(t.name)}
                  </span>
                  <span className={styles.who}>
                    <span className={styles.name}>{t.name}</span>
                    <span className={styles.role}>{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
