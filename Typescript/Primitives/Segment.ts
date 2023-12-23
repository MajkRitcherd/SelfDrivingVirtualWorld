import Point from "./Point.js";
import Shape from "./Shape.js";

/**
 * Represents segment (or edge in case of Graph).
 */
export default class Segment extends Shape {
  /** Start point of a segment. */
  private startPoint: Point;

  /** End point of a segment. */
  private endPoint: Point;

  constructor(startPoint: Point, endPoint: Point, colour: string = '#323232') {
    super(colour);

    this.startPoint = startPoint;
    this.endPoint = endPoint
  }

  /** @inheritdoc */
  draw(ctx2D: CanvasRenderingContext2D, width: number = 2): void {
    super.draw(ctx2D);

    ctx2D.beginPath();
    ctx2D.lineWidth = width;
    ctx2D.strokeStyle = this.colour;
    ctx2D.moveTo(this.startPoint.coordinate.x, this.startPoint.coordinate.y);
    ctx2D.lineTo(this.endPoint.coordinate.x, this.endPoint.coordinate.y);
    ctx2D.stroke();
  }
}