import test from 'node:test';
import assert from 'node:assert/strict';
import { answerQuestion } from '../src/lib/assistantEngine.js';

test('recognizes project aliases and returns real project links', () => {
  const answer = answerQuestion('Tell me about the F1 app');
  assert.equal(answer.topic, 'p1-predictions');
  assert.match(answer.text, /scoring|leaderboard/i);
  assert.ok(answer.links.some(link => link.url.includes('p1withmattandtommy')));
  assert.equal(answerQuestion('What is ShareCollectibles?').topic, 'share-collectibles');
  assert.equal(answerQuestion('Tell me about Pennywise').topic, 'cs4800-expense-tracker');
});
test('answers follow-up stack questions using project context', () => {
  const answer = answerQuestion('What tech did he use?', 'paintflow');
  assert.match(answer.text, /Next.js/);
  assert.match(answer.text, /Supabase/);
  assert.equal(answer.topic, 'paintflow');
});
test('education and healthcare answers preserve verified information', () => {
  assert.match(answerQuestion('Where did he study?').text, /UC Irvine/);
  assert.match(answerQuestion('What does he do at Prime Healthcare?').text, /IT Support Specialist I/);
  assert.match(answerQuestion('What is his GPA?').text, /3.84/);
});
test('routes skill questions and recommends relevant projects', () => {
  assert.match(answerQuestion('Does he know Python?').text, /Python/);
  const answer = answerQuestion('Show me machine learning projects');
  assert.match(answer.text, /NBA|ODLC/);
  assert.ok(answer.links.length > 0);
});
test('unknown details and employment availability are never invented', () => {
  assert.match(answerQuestion('What is his salary?').text, /verified|detail|know/i);
  assert.match(answerQuestion('Is he available for full-time work?').text, /confirm|contact|ask/i);
});
test('greetings do not accidentally match unrelated content and answers stay safe', () => {
  assert.equal(answerQuestion('hi').topic, 'greeting');
  assert.equal(answerQuestion('   ').topic, 'greeting');
  assert.equal(answerQuestion('explain quantum wormholes').topic, 'unknown');
  assert.equal(answerQuestion('<script>alert(1)</script>').topic, 'unknown');
  assert.ok(answerQuestion('How do I contact him?').links.some(link => link.url.startsWith('mailto:')));
});
test('a new explicit topic takes precedence over the last project', () => {
  assert.equal(answerQuestion('Tell me about his education', 'paintflow').topic, 'education');
  assert.equal(answerQuestion('Tell me about ShareCollectibles', 'paintflow').topic, 'share-collectibles');
});

test('the introduction shortcut and project-derived skills produce useful answers', () => {
  assert.equal(answerQuestion('Give me a quick introduction').topic, 'summary');
  const answer = answerQuestion('Does he know Supabase?');
  assert.match(answer.text, /Supabase/);
  assert.ok(answer.links.length > 0);
});

test('specific skill names retain their own proficiency', () => {
  const native = answerQuestion('Does he know React Native?');
  assert.match(native.text, /React Native/);
  assert.match(native.text, /intermediate/);
  assert.doesNotMatch(native.text, /advanced/);
  assert.match(answerQuestion('Does he know GitHub Pages?').text, /familiar/);
});
test('full-stack project suggestions recommend projects rather than repeating the skills menu', () => {
  const answer = answerQuestion('Show me full-stack projects');
  assert.equal(answer.topic, 'projects');
  assert.match(answer.text, /ShareCollectibles/);
  assert.doesNotMatch(answer.text, /Figma Accessibility Checker/);
});
