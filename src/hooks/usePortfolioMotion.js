import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function usePortfolioMotion(root, mode) {
  useLayoutEffect(() => {
    if (mode !== 'cinematic') return;
    let active = true;
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.fromTo('.intro-name[data-from="left"]', { xPercent: -30, yPercent: 110, rotate: -7, opacity: 0 }, { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, duration: 1.25 }, .1)
        .fromTo('.intro-name[data-from="right"]', { xPercent: 30, yPercent: 110, rotate: 7, opacity: 0 }, { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, duration: 1.25 }, .25)
        .fromTo('.hero-title-label,.hero-description,.hero-actions', { y: 25, opacity: 0 }, { y: 0, opacity: 1, stagger: .12, duration: .8 }, .7)
        .fromTo('.system-map-heading,.map-evidence', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .15 }, .65)
        .fromTo('.map-core', { y: 70, rotate: -20, scale: .65, opacity: 0 }, { y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.2 }, .3)
        .fromTo('.map-node--interface', { x: -80, y: -25, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1 }, .5)
        .fromTo('.map-node--logic', { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, .65)
        .fromTo('.map-node--data', { x: -40, y: 60, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1 }, .8);
      gsap.utils.toArray('.profile-section .section-heading,.profile-intro h2,.history-heading,.education-list,.skills-section .section-heading,.archive-section .section-heading,.contact-copy h2').forEach(element => {
        gsap.fromTo(element, { y: 45, opacity: .12 }, { y: 0, opacity: 1, duration: .95, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 92%', toggleActions: 'play none none reverse' } });
      });
      gsap.utils.toArray('.section-heading .heading-line').forEach(line => {
        gsap.fromTo(line, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: line, start: 'top 92%', toggleActions: 'play none none reverse' } });
      });
      gsap.to('.hero-grid', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }, root);
    const media = gsap.matchMedia();
    media.add('(min-width: 1000px)', () => { gsap.fromTo('.skills-watermark', { xPercent: 10, rotate: -15 }, { xPercent: -15, rotate: 10, ease: 'none', scrollTrigger: { trigger: '#skills', start: 'top bottom', end: 'bottom top', scrub: 1 } }); });
    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); context.revert(); };
  }, [root, mode]);
}
