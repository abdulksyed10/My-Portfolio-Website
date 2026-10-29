import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveMotionMode } from '../src/lib/motionMode.js';

test('defaults to cinematic mode unless reduced motion is requested', () => {
  assert.equal(resolveMotionMode(null, false), 'cinematic');
  assert.equal(resolveMotionMode(null, true), 'professional');
});

test('remembers an explicit visitor preference', () => {
  assert.equal(resolveMotionMode('professional', false), 'professional');
  assert.equal(resolveMotionMode('cinematic', true), 'cinematic');
  assert.equal(resolveMotionMode('invalid', true), 'professional');
});
