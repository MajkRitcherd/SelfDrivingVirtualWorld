import Point from "../Primitives/Point.js";

/**
 * Creates a new point by adding 2 points together.
 * @param p1 First point.
 * @param p2 Second point.
 * @returns New point.
 */
export function add(p1: Point, p2: Point): Point {
  return new Point(p1.coordinate.x + p2.coordinate.x, p1.coordinate.y + p2.coordinate.y);
}

/**
 * Computes the angle between points.
 * @param p1 First point.
 * @param p2 Second point.
 * @returns Angle between points.
 */
export function angle(point: Point): number {
  return Math.atan2(point.coordinate.y, point.coordinate.x);
}

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

/**
 * Scales the point by scaler constant.
 * @param point Point to scale.
 * @param scaler Scaler constant.
 * @returns Scaled point.
 */
export function scale(point: Point, scaler: number): Point {
  return new Point(point.coordinate.x * scaler, point.coordinate.y * scaler);
}

/**
 * Creates a new point by subtracting 2 points together.
 * @param p1 First point.
 * @param p2 Second point.
 * @returns New point.
 */
export function subtract(p1: Point, p2: Point): Point {
  return new Point(p1.coordinate.x - p2.coordinate.x, p1.coordinate.y - p2.coordinate.y)
}

/**
 * Translated point.
 * @param p1 Point.
 * @param angle Angle.
 * @param offset Offset.
 * @returns Translated point.
 */
export function translate(p1: Point, angle: number, offset: number): Point {
  return new Point(
    p1.coordinate.x + Math.cos(angle) * offset,
    p1.coordinate.y + Math.sin(angle) * offset
  );
}
