import { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight, MessageSquare, RotateCcw, X, Minus, Command } from 'lucide-react';
import { answerQuestion } from '@/lib/assistantEngine';
import { assistantProfile } from '@/data/assistantKnowledge';
import '@/styles/assistant.css';
import { BrandMark } from './portfolio/BrandMark';

const starters = ['Give me a quick introduction', 'Show me his best projects', 'What is his experience?', 'What is his tech stack?'];
const welcome = () => ({ id: 'welcome', role: 'assistant', text: assistantProfile.intro, links: [], suggestions: starters });
export function ChatAssistant() {
  const [open, setOpen] = useState(false), [input, setInput] = useState(''), [messages, setMessages] = useState(() => [welcome()]), [typing, setTyping] = useState(false);
  const [topic, setTopic] = useState(null);
  const inputRef = useRef(null), end = useRef(null), timer = useRef(null), busy = useRef(false), launcher = useRef(null);
  const latest = [...messages].reverse().find(message => message.role === 'assistant');
  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus({ preventScroll: true });
    function escape(event) { if (event.key === 'Escape') { setOpen(false); launcher.current?.focus(); } }
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  useEffect(() => { if (open) end.current?.scrollIntoView({ behavior: 'instant', block: 'nearest' }); }, [messages, typing, open]);
  function send(value = input) {
    const question = value.trim();
    if (!question || busy.current) return;
    busy.current = true;
    const answer = answerQuestion(question, topic);
    setInput(''); setTyping(true);
    setMessages(current => [...current, { id: crypto.randomUUID(), role: 'user', text: question }]);
    timer.current = window.setTimeout(() => {
      setMessages(current => [...current, { id: crypto.randomUUID(), role: 'assistant', ...answer }]);
      if (answer.topic !== 'unknown' && answer.topic !== 'greeting') setTopic(answer.topic);
      setTyping(false); busy.current = false;
    }, 400 + Math.min(question.length * 4, 250));
  }
  function reset() { window.clearTimeout(timer.current); busy.current = false; setTyping(false); setMessages([welcome()]); setTopic(null); setInput(''); inputRef.current?.focus(); }
  function followLink(event, url) { if (url.startsWith('#')) { event.preventDefault(); setOpen(false); document.querySelector(url)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }
  return <div className={`assistant-dock ${open ? 'is-open' : ''}`}>
    {open && <section className="assistant-panel" aria-label="Abdul's Assistant"><div className="assistant-top"><BrandMark className="assistant-avatar"/><div className="assistant-title"><h2>Abdul’s Assistant</h2><span><i/> PORTFOLIO GUIDE</span></div><button type="button" onClick={reset} aria-label="Start a new conversation" title="New conversation"><RotateCcw size={15}/></button><button type="button" onClick={() => setOpen(false)} aria-label="Minimize assistant"><Minus size={19}/></button></div>
      <div className="assistant-intro-strip"><Command size={12}/><span>PROJECTS, EXPERIENCE & THE STACK</span></div>
      <div className="assistant-messages" role="log" aria-live="polite" aria-label="Conversation">{messages.map(message => <div className={`assistant-message assistant-message--${message.role}`} key={message.id}><span className="message-author">{message.role === 'assistant' ? 'AKS / ASSISTANT' : 'YOU'}</span><p>{message.text}</p>{message.links?.length > 0 && <div className="assistant-link-list">{message.links.map(item => <a key={item.url + item.label} href={item.url} target={item.url.startsWith('http') ? '_blank' : undefined} rel={item.url.startsWith('http') ? 'noreferrer' : undefined} onClick={event => followLink(event, item.url)}>{item.label}<ArrowUpRight size={14}/></a>)}</div>}</div>)}{typing && <div className="assistant-typing" aria-label="Assistant is preparing a response"><i/><i/><i/></div>}<div ref={end}/></div>
      <div className="assistant-composer"><div className="assistant-prompts">{latest?.suggestions?.slice(0, messages.length === 1 ? 4 : 2).map(prompt => <button type="button" disabled={typing} key={prompt} onClick={() => send(prompt)}>{prompt}<ArrowUpRight size={11}/></button>)}</div><form onSubmit={event => { event.preventDefault(); send(); }}><label className="sr-only" htmlFor="assistant-input">Ask Abdul's Assistant</label><input ref={inputRef} id="assistant-input" autoComplete="off" maxLength={500} placeholder="Ask about the work, the stack…" value={input} onChange={event => setInput(event.target.value)} disabled={typing}/><button type="submit" disabled={typing || !input.trim()} aria-label="Send message"><ArrowUp size={19}/></button></form><div className="assistant-footnote"><span><i/> PORTFOLIO KNOWLEDGE</span><span>LOCAL GUIDE</span></div></div>
    </section>}
    <button ref={launcher} type="button" className="assistant-launcher" onClick={() => setOpen(!open)} aria-label={open ? "Close Abdul's Assistant" : "Open Abdul's Assistant"} aria-expanded={open}><span className="launcher-icon">{open ? <X size={20}/> : <MessageSquare size={19}/>}</span><span>{open ? 'Close assistant' : 'Ask Abdul’s Assistant'}</span><span className="launcher-plus">{open ? '−' : '+'}</span></button>
  </div>;
}
