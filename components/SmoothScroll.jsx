"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;

/**
 * SmoothScroll
 * -----------------------------------------------------------------------
 * Drop-in provider that replaces native scroll physics with Lenis'
 * eased, velocity-aware scrolling — the difference between a page that
 * "scrolls" and one that *moves*. Lenis' raf is driven by GSAP's ticker
 * (rather than its own rAF loop), and every Lenis scroll tick calls
 * `ScrollTrigger.update`, so every ScrollTrigger-based animation in the
 * site stays in sync with actual scroll position.
 *
 * Also forces one `ScrollTrigger.refresh()` after the page has fully
 * loaded (fonts, images) — those can shift section heights slightly
 * after first paint, which would otherwise leave earlier-created
 * triggers measuring against stale positions.
 *
 * Disabled under prefers-reduced-motion — native scroll takes over.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3), // cubic-out — smooth, no bounce
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    window.__lenis = lenis;

    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      // Already loaded (e.g. fast refresh) — refresh on next frame so
      // any late-mounting sections have their refs attached.
      requestAnimationFrame(refresh);
    } else {
      window.addEventListener("load", refresh);
    }

    return () => {
      window.removeEventListener("load", refresh);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
}

/**
 * scrollToTarget
 * -----------------------------------------------------------------------
 * Shared helper so every "jump to section" interaction (nav links, the
 * hero's scroll indicator, the logo) eases through Lenis when it's
 * active, and falls back to native smooth scrollIntoView when Lenis is
 * disabled (prefers-reduced-motion) or hasn't mounted yet.
 */
export function scrollToTarget(target, offset = -70) {
  if (!target) return;
  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.scrollTo(target, { offset, duration: 1.3 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
