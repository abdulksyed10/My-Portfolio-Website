import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProjects } from '../src/lib/projectFilters.js';
import { projects } from '../src/data/portfolio.js';
test('archive preserves all projects and valid outbound links', () => {
  assert.equal(new Set(projects.map(p => p.id)).size, 13);
  for (const p of projects) for (const url of [p.githubUrl, p.demoUrl].filter(Boolean)) assert.ok(url.startsWith('https://'));
});
test('search matches technologies and titles within a category', () => {
  assert.deepEqual(filterProjects(projects, 'paintflow', 'all').map(p => p.id), ['paintflow']);
  assert.ok(filterProjects(projects, 'python', 'ml').length >= 3);
  assert.equal(filterProjects(projects, 'python', 'accessibility').length, 0);
});
test('upcoming projects and empty searches behave correctly', () => {
  assert.equal(filterProjects(projects, '', 'upcoming').length, 3);
  assert.equal(filterProjects(projects, 'not-a-project-123', 'all').length, 0);
  assert.equal(filterProjects(projects, '  ', 'all').length, 13);
});
