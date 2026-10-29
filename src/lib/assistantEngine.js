import { profile, projects, education, experience, skills } from '../data/portfolio.js';
import { assistantProfile, projectAliases } from '../data/assistantKnowledge.js';

const normalize = value => value.toLowerCase().replace(/[^a-z0-9+#.\s]/g, ' ').replace(/\s+/g, ' ').trim();
const contains = (text, phrase) => (` ${text} `).includes(` ${normalize(phrase)} `);
const link = (label, url) => ({ label, url });
const defaults = ['Show me his best projects', 'What is his experience?', 'What is his tech stack?'];
const reply = (text, topic, links = [], suggestions = defaults) => ({ text, topic, links, suggestions });
const projectLinks = project => [project.demoUrl && link('Visit project', project.demoUrl), project.githubUrl && link('View source', project.githubUrl)].filter(Boolean);
const contactLinks = [link('Email Abdul', `mailto:${profile.email}`), link('LinkedIn', profile.linkedin)];
const projectReply = (project, stackOnly = false) => reply(
  stackOnly ? `${project.title} uses ${project.tags.join(', ')}. ${project.details?.[0] || project.description}` : `${project.title}\n\n${project.description}\n\nBuilt with ${project.tags.join(', ')}.${project.status === 'In development' ? ' Listed as in development in this portfolio.' : ''}`,
  project.id, projectLinks(project), [`What tech does ${project.shortTitle || project.title} use?`, 'Show me another project', 'How can I contact Abdul?'],
);

export function answerQuestion(question, previousTopic = null) {
  const text = normalize(String(question || ''));
  if (!text || /^(hi|hello|hey|hello there|good morning|good evening)[.!]?$/.test(text)) return reply(assistantProfile.intro, 'greeting');
  if (/\b(thanks|thank you)\b/.test(text)) return reply('You’re welcome. You can explore a project, ask about Abdul’s background, or reach him directly.', 'greeting');
  if (/\b(salary|age|birthday|married|visa|citizen|sponsorship)\b/.test(text)) return reply(assistantProfile.fallback, 'unknown', contactLinks);
  if (/\b(available|availability|full time work|hiring|hire him|start date|relocat|remote)\b/.test(text)) return reply('For current availability, role preferences, or a start date, please confirm with Abdul directly. His portfolio covers full-stack development, backend systems, AI/ML projects, and production support experience.', 'availability', contactLinks);
  if (/\b(contact|email|phone|reach|linkedin)\b/.test(text)) return reply(`You can email Abdul at ${profile.email}, call ${profile.phone}, or connect on LinkedIn. He is based in ${profile.location}.`, 'contact', [...contactLinks, link('Call Abdul', profile.phoneHref)]);
  if (/\b(resume|cv)\b/.test(text)) return reply('You can download Abdul’s software engineering résumé here. It covers his education, engineering projects, and professional experience.', 'resume', [link('Download résumé', profile.resume)]);

  const stackQuestion = /\b(stack|tech|technologies|tools|built with|languages|framework|use|used)\b/.test(text);
  const explicit = Object.entries(projectAliases).flatMap(([id, aliases]) => aliases.filter(alias => contains(text, alias)).map(alias => ({ id, score: alias.length }))).sort((a, b) => b.score - a.score)[0];
  if (explicit) return projectReply(projects.find(project => project.id === explicit.id), stackQuestion);

  if (/\b(education|degree|study|studied|school|university|gpa|graduate|graduation|uci|irvine|cal poly)\b/.test(text)) return reply(education.map(item => `${item.school}\n${item.program}${item.minor ? ` · ${item.minor}` : ''}\n${item.dates} · ${item.gpa}`).join('\n\n'), 'education', [link('View background', '#about')], ['What is his experience?', 'Tell me about his thesis', 'Download his resume']);
  if (/\b(prime|healthcare|construction|experience|jobs|employment|career|professional background)\b/.test(text)) {
    const relevant = /\b(prime|healthcare)\b/.test(text) ? experience.filter(item => item.company === 'Prime Healthcare') : /\b(construction)\b/.test(text) ? experience.filter(item => item.company === 'M&M Construction') : experience;
    const lines = relevant.map(item => `${item.company} — ${item.role}\n${item.dates || item.periods.map(period => `${period.label}: ${period.dates}`).join(' · ')}`).join('\n\n');
    return reply(lines, 'experience', [link('View experience', '#experience')], ['Tell me about PaintFlow', 'Where did he study?', 'What are his strongest skills?']);
  }
  if (/\b(machine learning|ml projects|ai projects|data science)\b/.test(text)) {
    const selected = projects.filter(project => project.category === 'ml');
    return reply(`His machine learning work includes:\n\n${selected.map(project => `• ${project.title}: ${project.description}`).join('\n\n')}`, 'ml', selected.filter(project => project.githubUrl).slice(0, 3).map(project => link(project.title, project.githubUrl)));
  }
  if (/\b(accessibility|wcag|inclusive)\b/.test(text)) return reply('Abdul’s accessibility work spans a Figma checker for contrast, text size, tap targets, and alt text, plus graduate research evaluating websites produced by site builders using WCAG-based audits.', 'accessibility', [link('Figma checker source', 'https://github.com/abdulksyed10/Figma-plugin-tool'), link('View all projects', '#projects')]);

  const previous = projects.find(project => project.id === previousTopic);
  if (previous && stackQuestion && !/\b(his stack|his tech|he know|his skills)\b/.test(text)) return projectReply(previous, true);
  if (/\b(project|projects|portfolio|best work|another|built|recommend)\b/.test(text)) {
    const fullstack = /\b(full stack|fullstack|backend|frontend)\b/.test(text);
    const selected = projects.filter(project => ['share-collectibles', 'p1-predictions', 'paintflow', 'figma-plugin-tool'].includes(project.id) && (!fullstack || project.category === 'fullstack'));
    return reply(`A good place to start:\n\n${selected.map(project => `• ${project.shortTitle}: ${project.description}`).join('\n\n')}`, 'projects', [link('Explore selected work', '#work'), link('Browse all projects', '#projects')], ['Tell me about ShareCollectibles', 'Tell me about P1 Predictions', 'Tell me about PaintFlow']);
  }
  const matchedSkill = [...skills].sort((a, b) => b.name.length - a.name.length).find(skill => contains(text, skill.name)) || projects.flatMap(project => project.tags).map(name => ({ name })).sort((a, b) => b.name.length - a.name.length).find(skill => contains(text, skill.name));
  if (matchedSkill) {
    const usedIn = projects.filter(project => project.tags.some(tag => normalize(tag) === normalize(matchedSkill.name))).slice(0, 3);
    const level = matchedSkill.tier ? ` His portfolio lists ${matchedSkill.name} at ${matchedSkill.tier} proficiency.` : '';
    return reply(`Yes—${matchedSkill.name} is part of Abdul’s skill set.${level}${usedIn.length ? ` You can see it in ${usedIn.map(project => project.title).join(', ')}.` : ''}`, 'skills', usedIn.map(project => link(project.title, project.githubUrl || '#projects')));
  }
  if (/\b(skills|stack|technologies|languages|backend|frontend|full stack|fullstack|strongest|engineer)\b/.test(text)) return reply('Abdul works across JavaScript/TypeScript, Python, Java, React, Next.js, Flask, React Native, relational databases, and cloud tooling. His portfolio combines full-stack products, data-driven features, machine learning projects, and healthcare production support. The skills index includes the complete list and proficiency levels.', 'skills', [link('Explore the stack', '#skills')], ['Does he know Python?', 'Show me full-stack projects', 'What is his experience?']);
  if (/\b(who|about abdul|introduce|introduction|background|summary)\b/.test(text)) return reply(`${profile.name} is a freelance software developer and M.S. Software Engineering student at UC Irvine. ${profile.introduction}`, 'summary', [link('Read the profile', '#about')]);
  if (/\b(soccer|hobbies|interests|hiking|cricket|sports)\b/.test(text)) return reply('Outside software, Abdul has shared interests in soccer, Formula 1, hiking, and cricket. His P1 Predictions project is one example of turning an interest into software.', 'interests', [link('Explore P1 Predictions', 'https://www.p1withmattandtommyfanpredictions.com/')]);
  return reply(assistantProfile.fallback, 'unknown', contactLinks);
}
