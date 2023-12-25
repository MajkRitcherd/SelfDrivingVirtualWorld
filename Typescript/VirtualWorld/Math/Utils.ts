import Point from "../Primitives/Point";

/**
 * Computes distance between 2 points.
 * @param p1 Point.
 * @param p2 Point.
 * @returns Distance between points.
 */
function getDistance(p1: Point, p2: Point): number {
  return Math.hypot(p1.coordinate.x - p2.coordinate.x, p1.coordinate.y - p2.coordinate.y); 
}

/**
 * Gets nearest vertex to possible new point (for adding new point).
 *  If the distance is lower than threshold, then no point was found.
 * @param possiblePoint Possible new point.
 * @param vertices Array of vertices.
 * @param threshold Distance threshold (if distance is greater than threshold, return undefined).
 * @returns Neares vertex or undefined if it was not found.
 */
export function getNearestVertex(possiblePoint: Point, vertices: Array<Point>, threshold: number = Number.MAX_SAFE_INTEGER): Point | undefined {
  let minDistance: number = Number.MAX_SAFE_INTEGER;
  let nearestVertex: Point | undefined = undefined;

  for (let vertex of vertices) {
    let distance: number = getDistance(vertex, possiblePoint);

    if (distance < minDistance && distance < threshold) {
      minDistance = distance;
      nearestVertex = vertex;
    }
  }

  return nearestVertex;
}
