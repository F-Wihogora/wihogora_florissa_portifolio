import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.name}>Wihogora Florissa</span>
        <span className={styles.meta}>
          © {year} · Built with Next.js, Three.js &amp; GSAP
        </span>
        <div className={styles.links}>
          <a
            href="https://github.com/F-Wihogora"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/wihogora-florissa"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:wihogoraflorissa@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
