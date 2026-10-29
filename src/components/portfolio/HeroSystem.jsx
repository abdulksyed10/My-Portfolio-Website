import { ArrowUpRight, Braces, Database, PanelsTopLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { projects } from '@/data/portfolio';
import { BrandMark } from './BrandMark';

const layers = [
  { id: 'interface', label: 'Interface', subtitle: 'Web & mobile', icon: PanelsTopLeft, projectId: 'share-collectibles', note: 'Collections, discovery, and a cross-platform interface.', route: '01 → 02' },
  { id: 'logic', label: 'Logic', subtitle: 'Application systems', icon: Braces, projectId: 'p1-predictions', note: 'Race predictions become scores and live leaderboards.', route: '02 → 03' },
  { id: 'data', label: 'Data', subtitle: 'Storage & workflows', icon: Database, projectId: 'paintflow', note: 'Products, inventory, and invoices share one workflow.', route: '03 → 01' },
];

export function HeroSystem({ mode }) {
  const [selected, setSelected] = useState('interface');
  const stage = useRef(null), frame = useRef(0);
  const layer = layers.find(item => item.id === selected);
  const project = projects.find(item => item.id === layer.projectId);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function tilt(event) {
    if (mode !== 'cinematic' || event.pointerType === 'touch') return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => { if (stage.current) { stage.current.style.setProperty('--map-x', `${x * 5}deg`); stage.current.style.setProperty('--map-y', `${y * -5}deg`); } });
  }
  function reset() {
    cancelAnimationFrame(frame.current);
    stage.current?.style.setProperty('--map-x', '0deg'); stage.current?.style.setProperty('--map-y', '0deg');
  }
  useEffect(() => { if (mode !== 'cinematic' && stage.current) { cancelAnimationFrame(frame.current); stage.current.style.setProperty('--map-x', '0deg'); stage.current.style.setProperty('--map-y', '0deg'); } }, [mode]);
  return <div className="system-map-shell" onPointerMove={tilt} onPointerLeave={reset}>
    <div className="system-map-heading"><span>THE ENGINEERING MAP</span><span>SELECT A LAYER <span>↙</span></span></div>
    <div ref={stage} className={`system-map system-map--${selected}`}>
      <div className="map-grid" aria-hidden="true"/>
      <svg className="map-traces" viewBox="0 0 500 420" aria-hidden="true">
        <path className="map-trace-base" d="M140 100H240V175M350 210H295V195M175 345H250V235"/>
        <path className={`map-trace map-trace--interface ${selected === 'interface' ? 'is-selected' : ''}`} d="M140 100H240V175"/>
        <path className={`map-trace map-trace--logic ${selected === 'logic' ? 'is-selected' : ''}`} d="M350 210H295V195"/>
        <path className={`map-trace map-trace--data ${selected === 'data' ? 'is-selected' : ''}`} d="M175 345H250V235"/>
        <circle cx="240" cy="100" r="4"/><circle cx="350" cy="210" r="4"/><circle cx="250" cy="345" r="4"/>
      </svg>
      <div className="map-core" aria-hidden="true"><div className="map-core-layer map-core-layer--back"/><div className="map-core-layer map-core-layer--middle"/><div className="map-core-layer map-core-layer--front"><BrandMark/></div></div>
      {layers.map(item => { const Icon = item.icon; return <button type="button" key={item.id} className={`map-node map-node--${item.id} ${selected === item.id ? 'is-selected' : ''}`} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><span className="map-node-icon"><Icon size={20} strokeWidth={1.5}/></span><span><strong>{item.label}</strong><small>{item.subtitle}</small></span><span className="map-node-pin"/></button>; })}
      <div className="map-coordinate map-coordinate--top" aria-hidden="true">INPUT <span>+</span></div><div className="map-coordinate map-coordinate--bottom" aria-hidden="true"><span>+</span> OUTPUT</div>
    </div>
    <a className="map-evidence" key={selected} href={project.demoUrl || project.githubUrl} target="_blank" rel="noreferrer"><div className="map-evidence-art"><img src={`/images/projects/${project.art}.svg`} alt={`Interface illustration for ${project.shortTitle}`}/></div><div className="map-evidence-copy"><span>IN PRACTICE / {layer.route}</span><strong>{project.shortTitle}</strong><p>{layer.note}</p></div><ArrowUpRight size={21}/></a>
  </div>;
}
