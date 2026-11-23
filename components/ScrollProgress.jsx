"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollProgress.module.css";

/**
 * ScrollProgress
 * -----------------------------------------------------------------------
 * A thin fixed bar at the very top of the viewport whose width reflects
 * how far the visitor has scrolled through the page. Updated via a
 * rAF-throttled scroll listener and a plain CSS transform (cheap,
 * GPU-friendly) rather than re-rendering React on every scroll tick.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  );
}
