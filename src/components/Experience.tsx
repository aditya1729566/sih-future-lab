"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { challenges, facts, legacy, process, themes } from "@/data/content";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const navItems = [
  ["Manifesto", "manifesto"],
  ["Process", "process"],
  ["Themes", "themes"],
  ["Challenges", "challenges"],
] as const;

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Experience() {
  const root = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    let frame = 0;
    try {
      const canvas = document.createElement("canvas");
      const supported = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
      frame = requestAnimationFrame(() => setWebgl(supported));
    } catch {
      frame = requestAnimationFrame(() => setWebgl(false));
    }

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setReady(true);
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const handleAnchor = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const destination = document.querySelector(anchor.getAttribute("href") ?? "");
      if (!destination) return;
      event.preventDefault();
      setMenuOpen(false);
      lenis.scrollTo(destination as HTMLElement, { offset: 0, duration: 1.15 });
    };
    document.addEventListener("click", handleAnchor);
    return () => {
      document.removeEventListener("click", handleAnchor);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => { scrollProgress.current = self.progress; },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        if (prefersReducedMotion) return;
        gsap.fromTo(element, { yPercent: 22, opacity: 0 }, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      if (!prefersReducedMotion && window.matchMedia("(min-width: 900px)").matches) {
        const rows = gsap.utils.toArray<HTMLElement>(".process-row");
        rows.forEach((row) => {
          gsap.fromTo(row.querySelector(".process-line"), { scaleX: 0 }, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top 75%", end: "bottom 55%", scrub: 0.5 },
          });
        });
      }
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("resize", refresh);
    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (activeChallenge === null) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveChallenge(null);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [activeChallenge]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, [menuOpen]);

  return (
    <div className="site" ref={root}>
      <a className="skip-link" href="#main">Skip to the story</a>

      <AnimatePresence>
        {!ready && (
          <motion.div className="loader" exit={{ y: "-100%" }} transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}>
            <div className="loader-mark"><span /><span /><span /></div>
            <p>Calibrating the future lab</p>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="header">
        <a className="brand" href="#top" aria-label="Smart India Hackathon Future Lab, home">
          <span className="brand-sigil">SIH</span>
          <span className="brand-note">Future Lab<br />Independent concept</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">Menu <span>＋</span></button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="menu-overlay" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}>
            <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">Close ×</button>
            <nav aria-label="Overlay navigation">
              {navItems.map(([label, id], index) => (
                <a key={id} href={`#${id}`}><small>0{index + 1}</small>{label}</a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="scene-layer" aria-hidden={!webgl}>
        {webgl ? (
          <HeroScene progress={scrollProgress} activeTheme={activeTheme} reducedMotion={prefersReducedMotion} />
        ) : <div className="scene-fallback"><span /><span /><span /></div>}
      </div>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-rail mono"><span>Edition / ∞</span><span>28.6139° N<br />77.2090° E</span></div>
          <div className="hero-copy">
            <p className="eyebrow">A national innovation network</p>
            <h1><span>Smart India</span><span>Hackathon</span></h1>
            <div className="hero-bottom">
              <p>Ideas become prototypes.<br />Prototypes become public impact.</p>
              <a className="round-link" href="#manifesto" aria-label="Enter the Future Lab"><Arrow /></a>
            </div>
          </div>
          <div className="scroll-cue mono"><span />Scroll to activate</div>
        </section>

        <section className="manifesto" id="manifesto">
          <div className="section-index mono">01 — The movement</div>
          <p className="manifesto-lead" data-reveal>
            India&apos;s most urgent problems do not arrive as neat briefs. They arrive as systems waiting to be understood.
          </p>
          <div className="manifesto-grid">
            <p data-reveal>Smart India Hackathon connects students, institutions, government and industry around one demanding idea: give young builders real problems, then give their ideas a path into the world.</p>
            <div className="coordinate-block mono" data-reveal><span>INPUT</span><strong>Public need</strong><span>OUTPUT</span><strong>Working proof</strong></div>
          </div>
        </section>

        <section className="facts-section">
          <div className="section-index mono">Verified signals — SIH 2024 rules</div>
          <div className="facts-track">
            {facts.map((fact) => (
              <a href={fact.source} target="_blank" rel="noreferrer" className="fact" key={fact.label} data-reveal>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
                <small className="mono">{fact.note} ↗</small>
              </a>
            ))}
          </div>
        </section>

        <section className="process" id="process">
          <div className="section-heading" data-reveal>
            <div className="section-index mono">02 — How SIH works</div>
            <h2>From friction<br />to function.</h2>
            <p>A problem travels through a national pipeline of selection, collaboration and concentrated making.</p>
          </div>
          <div className="process-list">
            {process.map(([number, title, copy]) => (
              <article className="process-row" key={number}>
                <div className="process-line" />
                <span className="mono">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="themes-section" id="themes">
          <div className="themes-intro" data-reveal>
            <div className="section-index mono">03 — Challenge universe</div>
            <h2>One network.<br />Many frontiers.</h2>
            <p>Select a domain to tune the Innovation Core.</p>
          </div>
          <div className="theme-console">
            <div className="theme-readout" aria-live="polite">
              <span className="mono">Domain 0{activeTheme + 1}</span>
              <h3>{themes[activeTheme].name}</h3>
              <p>{themes[activeTheme].descriptor}</p>
            </div>
            <div className="theme-list" role="list" aria-label="Innovation themes">
              {themes.map((theme, index) => (
                <button
                  key={theme.id}
                  className={activeTheme === index ? "active" : ""}
                  onPointerEnter={() => setActiveTheme(index)}
                  onFocus={() => setActiveTheme(index)}
                  onClick={() => setActiveTheme(index)}
                  style={{ "--theme-color": theme.color } as React.CSSProperties}
                >
                  <span className="mono">0{index + 1}</span>{theme.name}<i />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="challenges-section" id="challenges">
          <div className="challenge-heading" data-reveal>
            <div className="section-index mono">04 — Evidence of need</div>
            <h2>Real problems.<br />No hypothetical stakes.</h2>
          </div>
          <div className="challenge-stack">
            {challenges.map((challenge, index) => (
              <button className="challenge-card" key={challenge.code} onClick={() => setActiveChallenge(index)}>
                <span className="challenge-code mono">{challenge.code} / 2024</span>
                <strong>{challenge.title}</strong>
                <span className="challenge-meta mono">{challenge.organization} · {challenge.category}</span>
                <span className="challenge-arrow"><Arrow /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="legacy-section">
          <div className="section-index mono">05 — A movement in motion</div>
          <div className="legacy-grid">
            <h2 data-reveal>Built across<br />generations.</h2>
            <div className="legacy-list">
              {legacy.map(([year, copy]) => (
                <article key={year}><strong>{year}</strong><p>{copy}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="ecosystem-section">
          <p className="section-index mono">Students × Institutions × Mentors × Public organizations</p>
          <h2 data-reveal>Innovation is<br />a team sport.</h2>
          <p data-reveal>SIH works because a problem owner, a campus, a mentor and a student team choose to build in the same direction.</p>
        </section>

        <section className="final-cta" id="visit">
          <div className="cta-orbit" aria-hidden="true"><span /><span /><span /></div>
          <p className="eyebrow">The next useful idea can begin anywhere.</p>
          <h2>Build what<br />India needs next.</h2>
          <a href="https://www.sih.gov.in/" target="_blank" rel="noreferrer" className="primary-cta">
            Visit official SIH <Arrow />
          </a>
        </section>
      </main>

      <footer>
        <div className="brand"><span className="brand-sigil">SIH</span><span className="brand-note">Future Lab<br />Independent concept</span></div>
        <p>This is an independent design exercise. Smart India Hackathon names and factual material belong to their respective official organizations.</p>
        <div className="footer-meta mono"><a href="#top">Back to top ↑</a><span>India builds / 2026</span></div>
      </footer>

      <AnimatePresence>
        {activeChallenge !== null && (
          <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setActiveChallenge(null)}>
            <motion.div ref={dialogRef} className="challenge-dialog" role="dialog" aria-modal="true" aria-labelledby="challenge-title" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} onMouseDown={(event) => event.stopPropagation()}>
              <button autoFocus className="dialog-close" onClick={() => setActiveChallenge(null)} aria-label="Close challenge">×</button>
              <span className="mono">Verified challenge / {challenges[activeChallenge].code}</span>
              <h2 id="challenge-title">{challenges[activeChallenge].title}</h2>
              <div className="dialog-data">
                <p><small>Problem owner</small>{challenges[activeChallenge].organization}</p>
                <p><small>Domain</small>{challenges[activeChallenge].theme}</p>
                <p><small>Build mode</small>{challenges[activeChallenge].category}</p>
              </div>
              <a href={challenges[activeChallenge].source} target="_blank" rel="noreferrer" className="primary-cta">View official archive <Arrow /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
