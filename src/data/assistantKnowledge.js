import { projects, profile, education, experience } from './portfolio.js';
export const assistantProfile = {
  name: "Abdul's Assistant", owner: profile.name,
  intro: "Hi, I'm Abdul's portfolio guide. I can walk you through his projects, engineering experience, or technical skills. What would you like to know?",
  fallback: "I don't have a verified answer to that in Abdul's portfolio. I can help with his projects, education, experience, and skills—or point you to Abdul directly.",
};
export const projectAliases = {
  'share-collectibles': ['sharecollectibles', 'share collectibles', 'collectibles', 'collection app'],
  'p1-predictions': ['p1', 'f1', 'formula 1', 'formula one', 'predictions', 'fan engagement'],
  'paintflow': ['paintflow', 'paint flow', 'paint shop', 'erp', 'inventory'],
  'figma-plugin-tool': ['figma plugin', 'figma accessibility', 'accessibility checker', 'figma checker'],
  'nba-champion-prediction': ['nba', 'champion prediction', 'basketball'],
  'cs4800-expense-tracker': ['expense tracker', 'pennywise', 'expense tracking'],
  'odlc': ['odlc', 'object detection', 'computer vision', 'inferencing'],
  'stock-ai-aws': ['stock trading', 'trading ai', 'stock ai'],
  'compsci273a': ['compsci273a', '273a', 'machine learning coursework'],
  'berkshire-javafx': ['berkshire', 'javafx redesign', 'hathaway'],
  'drive-thru': ['drive thru', 'drive through', 'los pollos', 'ordering system'],
  'ai-restaurant-website-builder': ['restaurant', 'website builder', 'restaurant builder'],
  'thesis-website-builders-accessibility': ['thesis', 'website builders', 'accessibility research', 'wcag audit'],
};
export const assistantKnowledge = [
  ...projects.map(project => ({ id: project.id, category: 'projects', title: project.title, keywords: projectAliases[project.id], answer: project.description })),
  { id: 'summary', title: 'About Abdul', answer: profile.introduction },
  { id: 'education', title: 'Education', answer: education.map(item => `${item.school}: ${item.program}, ${item.dates}. ${item.gpa}.`).join(' ') },
  { id: 'experience', title: 'Experience', answer: experience.map(item => `${item.company}: ${item.role}.`).join(' ') },
];
