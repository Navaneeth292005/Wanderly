/**
 * Euclidean distance between two coordinate points.
 * coords use { x: longitude, y: latitude } format.
 * Returns a relative distance unit (scaled for readability).
 */
export function calcDistance(a, b) {
  const dx = (a.x - b.x) * 111; // ~111km per degree longitude
  const dy = (a.y - b.y) * 111; // ~111km per degree latitude
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Travel time estimate in minutes.
 * Assumes average travel speed of ~30 km/h in city traffic.
 */
export function travelTime(a, b) {
  const dist = calcDistance(a, b);
  return Math.max(15, Math.round((dist / 30) * 60)); // min 15 min
}

/**
 * Nearest-Neighbor TSP heuristic.
 * Given a list of destinations, returns them reordered
 * so that consecutive places are as close as possible.
 * Starts from the closest place to the hotel origin.
 *
 * @param {Array} places  - destination objects with coords
 * @param {{ x, y }} origin - hotel coordinates (or city centre)
 * @returns {Array} ordered list of places
 */
export function nearestNeighborSort(places, origin) {
  if (!places || places.length === 0) return [];
  if (places.length === 1) return [...places];

  const remaining = [...places];
  const ordered = [];
  let current = origin;

  while (remaining.length > 0) {
    let nearestIdx = 0;
    let nearestDist = Infinity;

    remaining.forEach((place, idx) => {
      const d = calcDistance(current, place.coords);
      if (d < nearestDist) {
        nearestDist = d;
        nearestIdx = idx;
      }
    });

    ordered.push(remaining[nearestIdx]);
    current = remaining[nearestIdx].coords;
    remaining.splice(nearestIdx, 1);
  }

  return ordered;
}
