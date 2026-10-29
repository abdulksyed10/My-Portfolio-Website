import { useEffect, useRef, useState } from 'react';
import { Navigation, Hero } from '@/components/portfolio/Navigation';
import { WorkShowcase } from '@/components/portfolio/WorkShowcase';
import { Profile } from '@/components/portfolio/Profile';
import { Skills } from '@/components/portfolio/Skills';
import { ProjectArchive } from '@/components/portfolio/ProjectArchive';
import { Contact } from '@/components/portfolio/Contact';
import { ChatAssistant } from '@/components/ChatAssistant';
import { resolveMotionMode } from '@/lib/motionMode';
import { usePortfolioMotion } from '@/hooks/usePortfolioMotion';
import '@/styles/portfolio.css';

function initialMode() {
  let saved = null;
  try { saved = localStorage.getItem('portfolio-motion-mode'); } catch { /* Optional preference storage. */ }
  return resolveMotionMode(saved, window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}
export const Home = () => {
  const [mode, setMode] = useState(initialMode);
  const root = useRef(null);
  usePortfolioMotion(root, mode);
  useEffect(() => {
    document.documentElement.dataset.motion = mode;
    try { localStorage.setItem('portfolio-motion-mode', mode); } catch { /* Continue when storage is disabled. */ }
  }, [mode]);
  return <div className={`portfolio portfolio--${mode}`} ref={root}><Navigation mode={mode} onModeChange={() => setMode(mode === 'cinematic' ? 'professional' : 'cinematic')}/><main><Hero/><WorkShowcase mode={mode}/><Profile/><Skills/><ProjectArchive/><Contact/></main><ChatAssistant/></div>;
};
