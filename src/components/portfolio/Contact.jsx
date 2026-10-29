import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowUp, Check, Github, Linkedin, Send } from 'lucide-react';
import { profile } from '@/data/portfolio';

export function Contact() {
  const [state, setState] = useState('idle'), [message, setMessage] = useState('');
  const request = useRef(null);
  useEffect(() => () => request.current?.abort(), []);
  async function submit(event) {
    event.preventDefault();
    if (state === 'sending') return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setState('sending'); setMessage('');
    const controller = new AbortController(); request.current = controller;
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values), signal: controller.signal });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok !== true) throw new Error('The form could not send your message. Please email Abdul directly using the link below.');
      setState('sent'); setMessage('Message sent. Thanks for reaching out.'); form.reset();
    } catch (error) { if (error.name !== 'AbortError') { setState('error'); setMessage(error.message || 'Something went wrong. Please email Abdul directly.'); } }
  }
  return <><section id="contact" className="contact-section"><div className="contact-top"><p className="eyebrow"><span>05 / GET IN TOUCH</span><span className="heading-line"/></p><span>YOUR NEXT TEAMMATE?</span></div><div className="contact-layout"><div className="contact-copy"><h2>Let’s<br/><span className="serif">connect.</span><ArrowUpRight className="contact-big-arrow" strokeWidth={1}/></h2><p>Have a role, a project, or a question?<br/>I’d like to hear about it.</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={20}/></a><div className="contact-socials"><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={14}/></a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={14}/></a></div><span className="contact-location">{profile.location} / <a href={profile.phoneHref}>{profile.phone}</a></span></div><form className="contact-form" onSubmit={submit}><div className="form-field"><label htmlFor="contact-name">01 / YOUR NAME</label><input id="contact-name" name="name" placeholder="How should I call you?" autoComplete="name" required maxLength={120}/></div><div className="form-field"><label htmlFor="contact-email">02 / EMAIL ADDRESS</label><input id="contact-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required maxLength={254}/></div><div className="form-field"><label htmlFor="contact-message">03 / WHAT’S ON YOUR MIND?</label><textarea id="contact-message" name="message" placeholder="Tell me a little about it…" rows={3} required maxLength={5000}/></div><button className="button button-ink" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : state === 'sent' ? 'Send another message' : 'Send message'}{state === 'sent' ? <Check size={17}/> : <Send size={16}/>}</button>{message && <p className={`form-feedback form-feedback--${state}`} role="status">{message}{state === 'error' && <a href={`mailto:${profile.email}`}>Email Abdul <ArrowUpRight size={14}/></a>}</p>}</form></div></section><footer className="site-footer"><a className="footer-wordmark" href="#top">abdul<span>.</span></a><span>© {new Date().getFullYear()} ABDUL KALAM SYED</span><a href="#top" className="back-top">BACK TO TOP <ArrowUp size={16}/></a></footer></>;
}
