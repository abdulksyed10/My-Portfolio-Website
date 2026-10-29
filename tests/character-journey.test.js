import test from 'node:test';
import assert from 'node:assert/strict';
import { sampleJourney } from '../src/lib/characterJourney.js';

const stops = [0, 800, 1600, 2600, 4200];
test('starts at the center and travels continuously instead of sticking to an edge', () => {
  assert.equal(sampleJourney(stops, 0).x, .5);
  const before = sampleJourney(stops, 799.99);
  const after = sampleJourney(stops, 800.01);
  assert.ok(Math.abs(before.x - after.x) < .001);
  assert.ok(Math.abs(before.pose - after.pose) < .001);
  assert.ok(sampleJourney(stops, 400).x > .5);
  assert.ok(sampleJourney(stops, 1600).x < .5);
});
test('scroll position determines the same pose when going forward or backward', () => {
  const earlier = sampleJourney(stops, 1400);
  sampleJourney(stops, 4100);
  assert.deepEqual(sampleJourney(stops, 1400), earlier);
  assert.ok(earlier.pose > 1 && earlier.pose < 2);
});
test('clamps overscroll to the first and final activities', () => {
  assert.equal(sampleJourney(stops, -100).pose, 0);
  assert.equal(sampleJourney(stops, 9000).pose, 4);
  assert.ok(Object.values(sampleJourney([0, 0, 0, 0, 0], 0)).every(Number.isFinite));
});
