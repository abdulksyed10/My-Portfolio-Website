import { useEffect, useRef, useState } from 'react';

const chapters = [
  ['top', '00', 'Introduction'], ['work', '01', 'Selected work'],
  ['about', '02', 'Background'], ['skills', '03', 'Stack'],
  ['projects', '04', 'Project index'], ['contact', '05', 'Contact'],
];
export function ChapterRail() {
  const [active, setActive] = useState('top');
  const root = useRef(null);
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      let next = 'top';
      for (const [id] of chapters) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * .46) next = id;
      }
      setActive(current => current === next ? current : next);
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      root.current?.style.setProperty('--reading-progress', Math.max(0, Math.min(1, window.scrollY / Math.max(1, maximum))));
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  return <nav ref={root} className="chapter-rail" aria-label="Page chapters"><span className="chapter-rail-label" aria-hidden="true">INDEX</span><div className="chapter-rail-track"><span className="chapter-rail-progress"/>{chapters.map(([id, number, label]) => <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'location' : undefined} aria-label={label}><span className="chapter-rail-number">{number}</span><span className="chapter-rail-dot"/><span className="chapter-rail-tooltip">{label}</span></a>)}</div><span className="chapter-rail-sign" aria-hidden="true">+</span></nav>;
}
