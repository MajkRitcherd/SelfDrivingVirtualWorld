import IIntersection from "../Interfaces/IIntersection.js";
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
 * Gets the middle point of a segment.
 * @param point1 Start point of a segment.
 * @param point2 End point of a segment.
 * @returns Middle point of a segment.
 */
export function average(point1: Point, point2: Point): Point {
  return new Point(
    (point1.coordinate.x + point2.coordinate.x) / 2,
    (point1.coordinate.y + point2.coordinate.y) / 2);
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
 * Gets intersection point.
 * @param a First point of polygon.
 * @param b Second point of polygon.
 * @param c Third point of polygon.
 * @param d Fourth point of polygon.
 * @returns Intersection.
 */
export function getIntersection(a: Point, b: Point, c: Point, d: Point): IIntersection | null {
  const tTop: number = ((d.coordinate.x - c.coordinate.x) * (a.coordinate.y - c.coordinate.y)) -
    ((d.coordinate.y - c.coordinate.y) * (a.coordinate.x - c.coordinate.x));
  const uTop: number = ((c.coordinate.y - a.coordinate.y) * (a.coordinate.x - b.coordinate.x)) -
    ((c.coordinate.x - a.coordinate.x) * (a.coordinate.y - b.coordinate.y));
  const bottom: number = ((d.coordinate.y - c.coordinate.y) * (b.coordinate.x - a.coordinate.x) -
    ((d.coordinate.x - c.coordinate.x) * (b.coordinate.y - a.coordinate.y)));

  if (bottom != 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(a.coordinate.x, b.coordinate.x, t),
        y: lerp(a.coordinate.y, b.coordinate.y, t),
        offset: t,
      };
    }
  }

  return null;
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
 * Gets random colour.
 * @returns HSL colour representation.
 */
export function getRandomColour(): string {
  const hue = 290 + Math.random() * 260;
  return `hsl(${hue}, 100%, 60%)`;
}

/**
 * Computes linear interpolation.
 * @param a Number.
 * @param b Number.
 * @param t Number.
 * @returns Linear interpolation.
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
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
