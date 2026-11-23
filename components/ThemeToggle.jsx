"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

const readTheme = () =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

/**
 * ThemeToggle
 * -----------------------------------------------------------------------
 * A pill switch (sun on the left, moon on the right, a thumb that slides
 * to whichever is active). The source of truth is the `data-theme`
 * attribute on <html>:
 *  - the click handler reads it at click time (never from stale React
 *    state), and
 *  - a MutationObserver keeps every toggle on the page in sync. The navbar
 *    renders two (desktop + mobile layouts), so without this the hidden
 *    one would go stale after the first switch.
 * The choice is saved to localStorage; the default is dark.
 */
export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    // Enable the thumb's slide transition only after the first paint, so it
    // doesn't animate from "dark" to the stored theme on page load.
    const raf = requestAnimationFrame(() => setReady(true));

    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  const toggle = () => {
    const next = readTheme() === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable (private mode) - the switch still works for this visit
    }
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      className={`${styles.toggle} ${ready ? styles.ready : ""} ${className}`}
      onClick={toggle}
      aria-label={`Light mode ${isLight ? "on" : "off"} - switch to ${isLight ? "dark" : "light"} mode`}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      <svg className={`${styles.icon} ${styles.iconSun}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
      </svg>
      <svg className={`${styles.icon} ${styles.iconMoon}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.5 14.7A8.5 8.5 0 1 1 9.3 3.5a7 7 0 0 0 11.2 11.2Z" />
      </svg>

      <span className={`${styles.thumb} ${isLight ? styles.thumbLight : ""}`} aria-hidden="true">
        {isLight ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.5 14.7A8.5 8.5 0 1 1 9.3 3.5a7 7 0 0 0 11.2 11.2Z" />
          </svg>
        )}
      </span>
    </button>
  );
}
