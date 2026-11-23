import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Recommendations from "@/components/Recommendations";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main id="top">
        <ScrollProgress />
        <Navbar />
        <Hero nextSectionId="about" />
        <About />
        <Skills />
        <Projects />
        <Recommendations />
        <Journey />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
