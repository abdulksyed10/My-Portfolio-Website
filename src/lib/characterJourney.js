const locations = [[.5, .67], [.88, .66], [.1, .58], [.87, .7], [.5, .73]];
const clamp = (value) => Math.max(0, Math.min(1, value));
const smooth = (value) => value * value * (3 - 2 * value);

// A pure scroll-to-scene mapping makes reverse scrolling and anchor jumps deterministic.
export function sampleJourney(stops, scroll) {
  let index = 0;
  while (index < 3 && scroll >= stops[index + 1]) index++;
  const amount = clamp((scroll - stops[index]) / Math.max(1, stops[index + 1] - stops[index]));
  const travel = smooth(amount);
  const from = locations[index];
  const to = locations[index + 1];
  return {
    x: from[0] + (to[0] - from[0]) * travel,
    y: from[1] + (to[1] - from[1]) * travel + Math.sin(Math.PI * amount) * .07,
    pose: index + smooth(clamp((amount - .55) / .45)),
    travel: index + amount,
  };
}
