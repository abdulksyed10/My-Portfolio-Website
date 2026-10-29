import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { featuredProjects } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
export function WorkShowcase({ mode }) {
  const root = useRef(null), track = useRef(null), viewport = useRef(null), progress = useRef(null);
  const [active, setActive] = useState(0);
  useLayoutEffect(() => {
    if (mode !== 'cinematic') return;
    const media = gsap.matchMedia();
    media.add('(min-width: 1000px) and (min-height: 800px)', () => {
      const viewportElement = viewport.current;
      viewportElement.scrollLeft = 0;
      const distance = () => Math.max(0, track.current.scrollWidth - viewport.current.clientWidth);
      const horizontal = gsap.to(track.current, { x: () => -distance(), ease: 'none', scrollTrigger: {
        id: 'portfolio-work', trigger: root.current, start: 'top top', end: () => `+=${distance() * 1.1}`, pin: true, scrub: .8, invalidateOnRefresh: true,
        onRefresh: self => { setActive(Math.round(self.progress * 3)); if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`; },
        onUpdate: self => { setActive(Math.round(self.progress * 3)); if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`; },
      } });
      gsap.utils.toArray(track.current.children).forEach(panel => {
        gsap.fromTo(panel.querySelector('.panel-art'), { rotate: -4, yPercent: 5, scale: .96 }, { rotate: 3, yPercent: -4, scale: 1.02, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: horizontal, start: 'left right', end: 'right left', scrub: true } });
        gsap.fromTo(panel.querySelector('.panel-transit'), { xPercent: -180 }, { xPercent: 180, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: horizontal, start: 'left right', end: 'right left', scrub: true } });
      });
      return () => { viewportElement.scrollLeft = 0; setActive(0); if (progress.current) progress.current.style.transform = 'scaleX(0)'; };
    });
    return () => media.revert();
  }, [mode]);
  function navigate(index) {
    const next = Math.max(0, Math.min(3, index));
    const trigger = ScrollTrigger.getById('portfolio-work');
    if (trigger) gsap.to(window, { scrollTo: trigger.start + (trigger.end - trigger.start) * next / 3, duration: .85, ease: 'power2.inOut', overwrite: 'auto' });
    else if (mode === 'cinematic') viewport.current.scrollTo({ left: track.current.children[next].offsetLeft - track.current.children[0].offsetLeft, behavior: 'smooth' });
    setActive(next);
  }
  return <section id="work" ref={root} className={`work-section work-section--${mode}`}>
    <div className="section-heading work-heading"><div><p className="eyebrow"><span>01 / SELECTED WORK</span><span className="heading-line"/></p><h2>Out in the <span className="serif">world.</span></h2></div><div className="work-controls"><span className="work-index">0{active + 1}<span> / 04</span></span><button type="button" aria-label="Previous project" disabled={active === 0} onClick={() => navigate(active - 1)}><ArrowLeft size={20}/></button><button type="button" aria-label="Next project" disabled={active === 3} onClick={() => navigate(active + 1)}><ArrowRight size={20}/></button></div></div>
    <div ref={viewport} className="work-viewport" onScroll={() => { if (!ScrollTrigger.getById('portfolio-work') && viewport.current) { const first = track.current.children[0]; const step = track.current.children[1].offsetLeft - first.offsetLeft; setActive(Math.max(0, Math.min(3, Math.round(viewport.current.scrollLeft / step)))); } }}>
      <div ref={track} className="work-track">{featuredProjects.map((project, index) => <article key={project.id} className={`work-panel work-panel--${project.accent}`} data-issue={`0${index + 1}`} onFocusCapture={() => { if (active !== index) navigate(index); }}>
        <span className="panel-transit" aria-hidden="true"/><div className="panel-corner">0{index + 1}</div><div className="panel-copy"><p className="panel-discipline">{project.discipline}</p><h3>{project.shortTitle}</h3><p className="panel-summary">{project.summary}</p><div className="panel-tags">{project.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div><div className="panel-links">{project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={18}/></a>}{project.githubUrl && <a className="panel-source" href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`${project.shortTitle} source code`}><Github size={19}/></a>}</div></div>
        <figure className="panel-art"><img src={`/images/projects/${project.art}.svg`} alt={`Illustrated interface concept for ${project.shortTitle}`} width="1200" height="800" loading={index ? 'lazy' : 'eager'}/><figcaption>INTERFACE ILLUSTRATION <span>{project.status === 'In development' ? 'IN DEVELOPMENT' : project.category.toUpperCase()}</span></figcaption></figure>
      </article>)}</div>
    </div>
    <div className="work-foot"><span className="work-scroll-label">SCROLL THROUGH THE CHAPTERS <ArrowRight size={15}/></span><div className="work-progress"><span ref={progress}/></div><a href="#projects">All projects <ArrowUpRight size={15}/></a></div>
  </section>;
}
