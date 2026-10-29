import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sampleJourney } from '@/lib/characterJourney';
import './MiniCharacter.css';

gsap.registerPlugin(ScrollTrigger);
const chapterIds = ['hero', 'about', 'skills', 'work', 'contact'];

export function MiniCharacter({ mode }) {
  const host = useRef(null);
  const canvas = useRef(null);
  useEffect(() => {
    if (mode !== 'cinematic') return;
    let cancelled = false;
    let scene;
    let context;
    let frame = 0;
    let lastFrame = 0;
    let visible = !document.hidden;
    let elapsed = 0;
    let stops = [0, 800, 1600, 2600, 4200];
    const scroll = { value: window.scrollY };
    const updateStops = () => {
      stops = chapterIds.map((id, index) => {
        if (index === 0) return 0;
        const element = document.getElementById(id);
        // A pinned section's spacer owns its actual document position.
        const anchor = element?.parentElement.classList.contains('pin-spacer') ? element.parentElement : element;
        const top = (anchor?.getBoundingClientRect().top ?? 0) + window.scrollY;
        return Math.max(1, top - window.innerHeight * .27);
      });
      for (let i = 1; i < stops.length; i++) stops[i] = Math.max(stops[i], stops[i - 1] + 1);
    };
    const tick = (now) => {
      if (cancelled) return;
      frame = requestAnimationFrame(tick);
      if (!visible || now - lastFrame < 1000 / 30) return;
      elapsed += Math.min((now - (lastFrame || now)) / 1000, .1);
      lastFrame = now;
      const state = sampleJourney(stops, scroll.value);
      host.current.style.transform = `translate3d(${state.x * window.innerWidth}px, ${state.y * window.innerHeight}px, 0)`;
      host.current.dataset.pose = state.pose.toFixed(2);
      scene.update(state.pose, elapsed, state.travel);
    };
    const onVisibility = () => { visible = !document.hidden; lastFrame = 0; };
    import('./minifigure/scene').then(({ createMinifigureScene }) => {
      if (cancelled) return;
      try {
        scene = createMinifigureScene(canvas.current);
        updateStops();
        context = gsap.context(() => {
          gsap.to(scroll, { value: () => ScrollTrigger.maxScroll(window), ease: 'none', scrollTrigger: {
            start: 0, end: () => ScrollTrigger.maxScroll(window), scrub: .65, invalidateOnRefresh: true,
            onRefresh: updateStops,
          } });
          gsap.fromTo(canvas.current, { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .8, delay: .3, ease: 'back.out(1.5)' });
        });
        ScrollTrigger.addEventListener('refresh', updateStops);
        document.addEventListener('visibilitychange', onVisibility);
        ScrollTrigger.refresh();
        frame = requestAnimationFrame(tick);
      } catch (error) {
        // This is a decorative layer; the portfolio stays usable without WebGL.
        console.warn('Minifigure rendering unavailable:', error);
        host.current.hidden = true;
      }
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      ScrollTrigger.removeEventListener('refresh', updateStops);
      document.removeEventListener('visibilitychange', onVisibility);
      context?.revert();
      scene?.dispose();
    };
  }, [mode]);

  if (mode !== 'cinematic') return null;
  return <div ref={host} className="minifigure-traveler" aria-hidden="true"><canvas ref={canvas} className="minifigure-canvas" /></div>;
}
