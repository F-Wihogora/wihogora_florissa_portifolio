"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { scrollToTarget } from "./SmoothScroll";
import styles from "./Hero.module.css";

/**
 * Hero
 * -----------------------------------------------------------------------
 * Fullscreen photo hero. A single optimised image (public/images/hero.jpg)
 * settles into place while the name and tagline reveal line by line.
 * No video, no WebGL: it loads fast on any phone or connection.
 *
 * To use a different photo, replace public/images/hero.jpg
 * (landscape, about 1600px wide, under 300 KB works best).
 */
export default function Hero({ nextSectionId = "about" }) {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const taglineRef = useRef(null);
  const nameLine1Ref = useRef(null);
  const nameLine2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [imageRef.current, taglineRef.current, nameLine1Ref.current,
           nameLine2Ref.current, subtitleRef.current, scrollRef.current],
          { opacity: 1, clearProps: "transform,clipPath" }
        );
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(imageRef.current, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" }, 0)
        .fromTo(taglineRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 0.4)
        .fromTo(nameLine1Ref.current, { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.1 }, 0.6)
        .fromTo(nameLine2Ref.current, { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.1 }, 0.75)
        .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 1.05)
        .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.4);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const target = document.getElementById(nextSectionId);
    if (target) scrollToTarget(target, 0);
    else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Intro">
      <div className={styles.fgVideoWrap} style={{ opacity: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          className={styles.fgVideo}
          src="/images/hero.jpg"
          alt="Portrait of Wihogora Florissa at her desk"
          fetchPriority="high"
          decoding="async"
          draggable={false}
        />
      </div>

      <div className={`${styles.overlay} ${styles.overlayBottom}`} />
      <div className={`${styles.overlay} ${styles.overlaySide}`} />
      <div className={`${styles.overlay} ${styles.overlayGlow}`} />

      <div className={styles.content}>
        <p ref={taglineRef} className={styles.tagline}>
          Full Stack Developer &amp; UI/UX Designer
        </p>
        <h1 className={styles.nameStack}>
          <span ref={nameLine1Ref} className={styles.nameLine}>
            <span>Wihogora</span>
          </span>
          <span ref={nameLine2Ref} className={styles.nameLine}>
            <span className={styles.nameLineAccent}>Florissa</span>
          </span>
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          I build <strong>secure, scalable, user-focused</strong> digital
          products — from full-stack web platforms to embedded systems —
          based in Kigali, Rwanda.
        </p>
      </div>

      <button ref={scrollRef} type="button" className={styles.scrollIndicator} onClick={scrollToNext} aria-label="Scroll to next section">
        <span>Scroll</span>
        <span className={styles.scrollLine} />
      </button>
    </section>
  );
}
