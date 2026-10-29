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
        .fromTo('.collage-code', { x: 100, y: -70, rotate: 15, opacity: 0 }, { x: 0, y: 0, rotate: -7, opacity: 1, duration: 1.2 }, .25)
        .fromTo('.collage-project', { x: 130, y: 100, rotate: -18, opacity: 0 }, { x: 0, y: 0, rotate: 7, opacity: 1, duration: 1.15 }, .45)
        .fromTo('.collage-note,.collage-stamp', { y: 70, scale: .8, opacity: 0 }, { y: 0, scale: 1, opacity: 1, stagger: .1, duration: .9 }, .85);
      gsap.to('.collage-code', { y: -12, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.6 });
      gsap.to('.collage-project', { y: 12, duration: 3.9, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.6 });
      gsap.utils.toArray('.profile-section .section-heading,.profile-intro h2,.history-heading,.education-list,.skills-section .section-heading,.archive-section .section-heading,.contact-copy h2').forEach(element => {
        gsap.fromTo(element, { y: 45, opacity: .12 }, { y: 0, opacity: 1, duration: .95, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 92%', toggleActions: 'play none none reverse' } });
      });
      gsap.to('.hero-grid', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }, root);
    const media = gsap.matchMedia();
    media.add('(min-width: 1000px)', () => { gsap.fromTo('.skills-watermark', { xPercent: 10, rotate: -15 }, { xPercent: -15, rotate: 10, ease: 'none', scrollTrigger: { trigger: '#skills', start: 'top bottom', end: 'bottom top', scrub: 1 } }); });
    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); context.revert(); };
  }, [root, mode]);
}
