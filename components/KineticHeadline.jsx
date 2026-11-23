"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;

/**
 * KineticHeadline
 * -----------------------------------------------------------------------
 * Word-level masked reveal: every word sits inside its own
 * `overflow: hidden` wrapper and slides up from below the mask with a
 * slight rotation, staggered left-to-right. This is the signature text
 * treatment used for every section headline on the site — deliberately
 * not a plain fade/slide, and distinct from the smaller-scale reveal
 * used on body copy and cards (see lib/useScrollReveal.js).
 *
 * Pass either:
 *  - `text`   — a single string; words wrap naturally, each individually
 *               masked (good for a flowing one-block headline).
 *  - `lines`  — an array of strings, each forced onto its own block-level
 *               masked line (good for deliberate two-line headlines).
 *
 * `accentLineIndex` (with `lines`) renders that line with the shared
 * `.accentText` treatment via `accentClassName`.
 */
export default function KineticHeadline({
  text,
  lines,
  as: Tag = "h2",
  className = "",
  accentClassName = "",
  accentLineIndex = -1,
  start = "top 82%",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }
    const el = containerRef.current;
    if (!el) return undefined;

    const words = el.querySelectorAll("[data-kinetic-word]");
    if (!words.length) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 115, rotateZ: 3 },
        {
          yPercent: 0,
          rotateZ: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.045,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [start]);

  const renderWords = (str, keyPrefix, isAccent) =>
    str.split(" ").map((word, i) => (
      <span
        key={`${keyPrefix}-${i}`}
        style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.05em" }}
      >
        <span
          data-kinetic-word
          className={isAccent ? accentClassName : undefined}
          style={{ display: "inline-block", willChange: "transform" }}
        >
          {word}
          {"\u00A0"}
        </span>
      </span>
    ));

  if (lines && lines.length) {
    return (
      <Tag ref={containerRef} className={className}>
        {lines.map((line, i) => (
          <span key={i} style={{ display: "block" }}>
            {renderWords(line, `l${i}`, i === accentLineIndex)}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={containerRef} className={className}>
      {renderWords(text || "", "w", false)}
    </Tag>
  );
}
