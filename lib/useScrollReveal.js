"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;

/**
 * useScrollReveal
 * -----------------------------------------------------------------------
 * The site's default reveal for secondary content (body copy, cards,
 * pills, list items) — used everywhere KineticHeadline is too heavy.
 * Deliberately NOT a plain opacity fade: each element unclips from
 * behind a bottom-to-top mask while settling in from a slight vertical
 * offset and a soft scale-up, which reads as "emerging" rather than
 * "appearing". GPU-cheap (clip-path + transform only), runs once per
 * element, and is skipped entirely under prefers-reduced-motion.
 */
export function useScrollReveal(containerRef, selector = "[data-reveal]", options = {}) {
  const { y = 28, duration = 0.9, stagger = 0.1, start = "top 80%", scale = 0.96 } = options;

  useEffect(() => {
    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }

    const container = containerRef.current;
    if (!container) return undefined;

    const targets = container.querySelectorAll(selector);
    if (!targets.length) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(targets, { clipPath: "inset(0 0 0% 0)", y: 0, scale: 1, opacity: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { clipPath: "inset(0 0 100% 0)", y, scale, opacity: 0.001 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          scale: 1,
          opacity: 1,
          duration,
          ease: "power4.out",
          stagger,
          scrollTrigger: {
            trigger: container,
            start,
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [containerRef, selector, y, duration, stagger, start, scale]);
}
