import { ArrowDownRight, ArrowUpRight, Github, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { profile } from '@/data/portfolio';
import { BrandMark } from './BrandMark';
import { HeroSystem } from './HeroSystem';

export function Navigation({ mode, onModeChange }) {
  const [open, setOpen] = useState(false);
  return <>
    <a className="skip-link" href="#work">Skip to selected work</a>
    <header className="site-nav">
      <a href="#top" className="wordmark" aria-label="Abdul Kalam Syed home"><BrandMark className="wordmark-symbol"/><span className="wordmark-caption">ABDUL KALAM SYED<span>SOFTWARE ENGINEER</span></span></a>
      <nav aria-label="Primary navigation" className={open ? 'nav-links is-open' : 'nav-links'}>
        {[['Work', '#work'], ['About', '#about'], ['Stack', '#skills']].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a href="#contact" className="nav-contact" onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={16}/></a>
      </nav>
      <div className="nav-tools"><button type="button" className="motion-switch" onClick={onModeChange} aria-pressed={mode === 'cinematic'} aria-label={mode === 'cinematic' ? 'Reduce motion' : 'Enable full motion'}><span className="motion-switch-icon"><i/><i/><i/></span><span>{mode === 'cinematic' ? 'Motion on' : 'Motion off'}</span></button><button type="button" className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X size={22}/> : <Menu size={22}/>}</button></div>
    </header>
  </>;
}

export function Hero({ mode }) {
  return <section className="hero" id="top">
    <div className="hero-grid" aria-hidden="true"/>
    <div className="hero-topline"><span><i className="status-dot"/> SOFTWARE ENGINEER</span><span>ONTARIO, CA <span className="dim">/</span> CALIFORNIA, USA</span></div>
    <div className="hero-layout"><div className="hero-copy">
      <div className="hero-title-label intro-part">HELLO, I’M</div>
      <h1><span className="name-mask"><span className="intro-name" data-from="left">Abdul</span></span><span className="name-mask"><span className="intro-name" data-from="right">Kalam <em>Syed.</em></span></span></h1>
      <p className="hero-description intro-part">Full-stack development.<br/>AI / ML. Accessible systems.</p>
      <div className="hero-actions intro-part"><a className="button button-lime" href="#work">Explore my work <ArrowDownRight size={19}/></a><a className="text-link" href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={14}/></a></div>
    </div><HeroSystem mode={mode}/></div>
    <div className="hero-bottomline"><a href="#work"><span className="scroll-cue"><ArrowDownRight size={17}/></span> SCROLL TO EXPLORE</a><span>CODE <span className="small-cross">+</span> SYSTEMS <span className="small-cross">+</span> CURIOSITY</span><span className="hero-edition">PORTFOLIO — 2026</span></div>
  </section>;
}
