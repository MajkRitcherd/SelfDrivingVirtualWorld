import Point from "./Point.js";
import Shape from "./Shape.js";

/**
 * Represents segment (or edge in case of Graph).
 */
export default class Segment extends Shape {
  /** Start point of a segment. */
  public startPoint: Point;

  /** End point of a segment. */
  public endPoint: Point;

  constructor(startPoint: Point, endPoint: Point, colour: string = '#323232') {
    super(colour);

    this.startPoint = startPoint;
    this.endPoint = endPoint
  }

  /** @inheritdoc */
  public draw(ctx2D: CanvasRenderingContext2D, width: number = 2): void {
    super.draw(ctx2D);

    ctx2D.beginPath();
    ctx2D.lineWidth = width;
    ctx2D.strokeStyle = this.colour;
    ctx2D.moveTo(this.startPoint.coordinate.x, this.startPoint.coordinate.y);
    ctx2D.lineTo(this.endPoint.coordinate.x, this.endPoint.coordinate.y);
    ctx2D.stroke();
  }

  /**
   * Check if points are equal.
   * @param point Point to compare to.
   * @returns True, if they are equal, otherwise false.
   */
  public isEqual(segment: Segment): boolean {
    return this.includes(segment.startPoint) && this.includes(segment.endPoint);
  }

  /**
   * Check if segment includes point (either in startPoint or endPoint).
   * @param point Point to check.
   * @returns True, if it includes, otherwise false.
   */
  public includes(point: Point): boolean {
    return this.startPoint.isEqual(point) || this.endPoint.isEqual(point);
  }
}