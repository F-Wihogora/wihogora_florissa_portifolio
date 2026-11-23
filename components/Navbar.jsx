"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import { useMagnetic } from "@/lib/useMagnetic";
import { scrollToTarget } from "./SmoothScroll";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#recommendations", label: "Recommendations" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ctaRef = useRef(null);
  useMagnetic(ctaRef, 10);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLinkClick = useCallback((e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(document.querySelector(href));
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
      <div className={styles.navInner}>
        <a
          href="#top"
          className={styles.logo}
          onClick={(e) => handleLinkClick(e, "#top")}
        >
          WF<span className={styles.logoDot}>.</span>
        </a>

        <nav className={styles.linksDesktop} aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.link}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle className={styles.desktopThemeToggle} />
          <a
            ref={ctaRef}
            href="#contact"
            className={styles.cta}
            data-magnetic
            onClick={(e) => handleLinkClick(e, "#contact")}
          >
            Let&apos;s talk
          </a>
        </div>

        <div className={styles.mobileActions}>
          <ThemeToggle />
          <button
            type="button"
            className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}>
        {LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            style={{ transitionDelay: `${i * 40}ms` }}
            onClick={(e) => handleLinkClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className={styles.mobileCta}
          onClick={(e) => handleLinkClick(e, "#contact")}
        >
          Let&apos;s talk
        </a>
      </div>
    </header>
  );
}
