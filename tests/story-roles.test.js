import test from 'node:test';
import assert from 'node:assert/strict';
import { roleAtPosition } from '../src/lib/storyRoles.js';

const chapters = [
  { role: 'developer', top: 0 },
  { role: 'soccer', top: 500 },
  { role: 'racing', top: 1200 },
  { role: 'hiking', top: 2100 },
  { role: 'cricket', top: 3500 },
];

test('selects the role for the current section, including scroll jumps and boundaries', () => {
  assert.equal(roleAtPosition(chapters, 0), 'developer');
  assert.equal(roleAtPosition(chapters, 499), 'developer');
  assert.equal(roleAtPosition(chapters, 500), 'soccer');
  assert.equal(roleAtPosition(chapters, 2400), 'hiking');
  assert.equal(roleAtPosition(chapters, 4000), 'cricket');
  assert.equal(roleAtPosition(chapters, 1300), 'racing');
});
