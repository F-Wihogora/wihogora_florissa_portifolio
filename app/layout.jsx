import { Syne, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Resolves automatically on Vercel (your live address); set
// NEXT_PUBLIC_SITE_URL to use a custom domain once you buy one.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wihogora Florissa — Full Stack Developer",
    template: "%s — Wihogora Florissa",
  },
  description:
    "Full Stack Developer, UI/UX Designer & Embedded Systems Enthusiast based in Kigali, Rwanda — building secure, scalable, user-focused digital solutions.",
  keywords: [
    "Wihogora Florissa",
    "Full Stack Developer",
    "Rwanda Coding Academy",
    "React",
    "Next.js",
    "Spring Boot",
    "Embedded Systems",
    "Kigali Rwanda developer",
  ],
  authors: [{ name: "Wihogora Florissa" }],
  creator: "Wihogora Florissa",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Wihogora Florissa — Full Stack Developer",
    description:
      "Full Stack Developer, UI/UX Designer & Embedded Systems Enthusiast building secure, scalable, user-focused digital solutions.",
    siteName: "Wihogora Florissa",
    // Preview image comes from app/opengraph-image.jsx automatically.
  },
  twitter: {
    card: "summary_large_image",
    title: "Wihogora Florissa — Full Stack Developer",
    description:
      "Full Stack Developer, UI/UX Designer & Embedded Systems Enthusiast based in Kigali, Rwanda.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0a0806",
};

// Runs in <head> before first paint (no flash). The site is dark by design,
// so it only switches to light if the visitor chose light with the toggle.
const THEME_INIT_SCRIPT = `
(function () {
  var theme = "dark";
  try {
    if (localStorage.getItem("theme") === "light") theme = "light";
  } catch (e) {}
  document.documentElement.setAttribute("data-theme", theme);
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
