import Point from "./Point.js";
import Shape from "./Shape.js";

/**
 * Represents segment properties.
 */
interface SegmentProperties {
  /** Dash line property. */
  dash?: Array<number>;
  
  /** Width of a segment */
  width?: number;
}

/**
 * Represents segment (or edge in case of Graph).
 */
export default class Segment extends Shape {
  /** End point of a segment. */
  public endPoint: Point;
  
  /** Start point of a segment. */
  public startPoint: Point;

  constructor(startPoint: Point, endPoint: Point, colour: string = '#323232') {
    super(colour);

    this.startPoint = startPoint;
    this.endPoint = endPoint
  }

  /** @inheritdoc */
  public draw(ctx2D: CanvasRenderingContext2D, segmentProperties: SegmentProperties = { width: 2, dash: [] }): void {
    super.draw(ctx2D);

    ctx2D.beginPath();

    if (segmentProperties.width !== undefined) {
      ctx2D.lineWidth = segmentProperties.width;
    }

    if (segmentProperties.dash !== undefined) {
      ctx2D.setLineDash(segmentProperties.dash);
    }

    ctx2D.strokeStyle = this.colour;
    ctx2D.moveTo(this.startPoint.coordinate.x, this.startPoint.coordinate.y);
    ctx2D.lineTo(this.endPoint.coordinate.x, this.endPoint.coordinate.y);
    ctx2D.stroke();
    ctx2D.setLineDash([]);
  }
  
  /**
   * Check if segment includes point (either in startPoint or endPoint).
   * @param point Point to check.
   * @returns True, if it includes, otherwise false.
   */
  public includes(point: Point): boolean {
    return this.startPoint.isEqual(point) || this.endPoint.isEqual(point);
  }

  /** @inheritdoc */
  public isEqual(segment: Segment): boolean {
    return this.includes(segment.startPoint) && this.includes(segment.endPoint);
  }
}