export function resolveMotionMode(saved, prefersReducedMotion) {
  if (saved === 'cinematic' || saved === 'professional') return saved;
  return prefersReducedMotion ? 'professional' : 'cinematic';
}
