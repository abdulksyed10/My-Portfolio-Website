import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resolveMotionMode } from "@/lib/motionMode";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import { Toaster } from "@/components/Toaster";
import { MiniCharacter } from "@/components/MiniCharacter";
import "./experience.css";

gsap.registerPlugin(ScrollTrigger);

const showcase = [
  { number: "01", kicker: "THE COLLECTOR'S CORNER", title: "Share\nCollectibles", text: "A home for your collections, made to be organized, discovered, and shared.", tags: "REACT NATIVE  /  SUPABASE", url: "https://sharecollectibles.com/", color: "lilac", graphic: "✳" },
  { number: "02", kicker: "LIGHTS OUT & AWAY WE GO", title: "P1 Predictions\nPlay-Along", text: "A Formula 1 predictions platform that brings fans into the race.", tags: "NEXT.JS  /  POSTGRESQL", url: "https://www.p1withmattandtommyfanpredictions.com/", color: "orange", graphic: "01" },
  { number: "03", kicker: "DESIGN FOR EVERYONE", title: "Accessibility\nChecker", text: "A Figma plugin helping designers spot common accessibility issues earlier.", tags: "FIGMA API  /  WCAG", url: "https://github.com/abdulksyed10/Figma-plugin-tool", color: "mint", graphic: "Aa" },
  { number: "04", kicker: "MAKING WORK FLOW", title: "PaintFlow", text: "An ERP-style platform for managing the moving parts of a paint shop.", tags: "NEXT.JS  /  SUPABASE", url: "https://paint-flow-flax.vercel.app/", color: "pink", graphic: "↗" },
];

function Navigation({ mode, setMode }) {
  const [open, setOpen] = useState(false);
  const links = [["About", "#about"], ["Skills", "#skills"], ["Work", "#work"], ["Contact", "#contact"]];
  return <header className="experience-nav"><a className="brand" href="#hero" aria-label="Abdul Kalam Syed home"><span>ak<span className="brand-dot">.</span></span><small>ABDUL KALAM SYED<br />SOFTWARE ENGINEER</small></a><nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav><div className="nav-actions"><button className="mode-toggle" type="button" onClick={() => setMode(mode === "cinematic" ? "professional" : "cinematic")} aria-label={`Switch to ${mode === "cinematic" ? "professional" : "cinematic"} mode`}><span className="mode-dot" /> <span>{mode === "cinematic" ? "CINEMATIC" : "PROFESSIONAL"}</span><span className="toggle-track"><span /></span></button><button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button></div></header>;
}

function Intro({ mode }) {
  const root = useRef(null);
  useEffect(() => {
    if (mode !== "cinematic") return;
    const context = gsap.context(() => {
      gsap.fromTo(".hero-reveal", { y: 55, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: .13, ease: "power4.out", delay: .15 });
    }, root);
    return () => context.revert();
  }, [mode]);
  return <section id="hero" ref={root} className="experience-hero intro-compact"><div className="hero-copy"><div className="eyebrow hero-reveal"><span className="eyebrow-dot" /> HELLO, WORLD. I'M ABDUL KALAM SYED.</div><h1 className="hero-title hero-reveal">MORE THAN<br /><span>WHAT I </span><em>BUILD.</em></h1><div className="hero-bottom hero-reveal"><p>Software engineer, curious human,<br />and a few things in between.</p><a href="#about" className="round-arrow" aria-label="Explore my portfolio"><ArrowDown size={22}/></a></div></div><div className="hero-side-note">A PORTFOLIO WITH PERSONALITY &nbsp; / &nbsp; SCROLL TO EXPLORE</div></section>;
}

function Showcase({ mode }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  useEffect(() => {
    if (mode !== "cinematic") return;
    const media = gsap.matchMedia();
    media.add("(min-width: 900px)", () => {
      const track = trackRef.current;
      const distance = () => Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
      gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: rootRef.current, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
    });
    return () => media.revert();
  }, [mode]);
  return <section id="work" className={`showcase showcase--${mode}`} ref={rootRef}><div className="showcase-heading"><div><p className="showcase-eyebrow">SELECTED WORK / A FEW FAVORITES</p><h2>Ideas made <em>real.</em></h2></div><div className="showcase-caption">A LITTLE BIT OF CODE.<br/>A LOT OF CURIOSITY. <span>↘</span></div></div><div className="showcase-window"><div className="showcase-track" ref={trackRef}>{showcase.map(project => <article className={`comic-card comic-card--${project.color}`} key={project.number}><div className="comic-top"><span>ISSUE NO. {project.number}</span><span>✳ &nbsp; SELECTED WORK</span></div><div className="comic-main"><div><p className="comic-kicker">{project.kicker}</p><h3>{project.title}</h3><p className="comic-copy">{project.text}</p></div><div className="comic-graphic" aria-hidden="true">{project.graphic}</div></div><div className="comic-bottom"><span>{project.tags}</span><a href={project.url} target="_blank" rel="noreferrer" aria-label={`Explore ${project.title.replace("\n", " ")}`}><ArrowUpRight size={23}/></a></div></article>)}</div></div><div className="showcase-hint"><span>SCROLL TO EXPLORE THE WORK</span><span>01 — 04 &nbsp; ⟶</span></div></section>;
}

export const Home = () => {
  const [mode, setMode] = useState(() => resolveMotionMode(localStorage.getItem("portfolio-motion-mode"), window.matchMedia("(prefers-reduced-motion: reduce)").matches));
  useEffect(() => { localStorage.setItem("portfolio-motion-mode", mode); document.documentElement.dataset.motion = mode; }, [mode]);
  return <div className={`experience experience--${mode}`}><Navigation mode={mode} setMode={setMode}/><main><Intro mode={mode}/><div className="portfolio-details"><div className="details-intro"><span>THE OTHER SIDE OF THE STORY</span><h2>A little more <em>about me.</em></h2><p>The work, the experience, and the things I've learned along the way.</p></div><AboutSection/><SkillsSection/></div><Showcase mode={mode}/><div className="portfolio-details portfolio-details--continued"><ProjectsSection/><ContactSection/></div></main><MiniCharacter mode={mode}/><Footer/><ChatAssistant/><Toaster/></div>;
};
