"use client";

import { useEffect } from "react";

/**
 * useMagnetic
 * -----------------------------------------------------------------------
 * Makes an element gently follow the pointer while hovered (a "magnetic
 * button" effect common in premium portfolios), then springs back to
 * rest on mouse leave. Skipped entirely under prefers-reduced-motion.
 */
export function useMagnetic(ref, strength = 16) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${(relX / rect.width) * strength}px, ${
        (relY / rect.height) * strength
      }px)`;
    };

    const reset = () => {
      el.style.transform = "translate(0px, 0px)";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [ref, strength]);
}
