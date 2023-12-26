import Point from "./Point.js";
import Shape, { ShapeProperties } from "./Shape.js";

/**
 * Represents segment properties.
 */
export interface SegmentProperties extends ShapeProperties {
  /** Dash line property. */
  dash?: Array<number>;
  
  /** Width of a segment */
  width?: number;
}

/**
 * Represents segment (or edge in case of Graph).
 */
export default class Segment extends Shape {
  protected readonly defaultDash: Array<number> = [];
  protected readonly defaultWidth: number = 2;

  /** End point of a segment. */
  public endPoint: Point;
  
  /** Start point of a segment. */
  public startPoint: Point;

  constructor(startPoint: Point, endPoint: Point, colour: string = '#323232') {
    super();

    this.startPoint = startPoint;
    this.endPoint = endPoint
  }

  /** @inheritdoc */
  public draw(ctx2D: CanvasRenderingContext2D, segmentProperties: SegmentProperties = { dash: this.defaultDash, width: this.defaultWidth }): void {
    super.draw(ctx2D);

    ctx2D.beginPath();

    if (segmentProperties.width !== undefined) {
      ctx2D.lineWidth = segmentProperties.width;
    }

    if (segmentProperties.dash !== undefined) {
      ctx2D.setLineDash(segmentProperties.dash);
    }

    ctx2D.strokeStyle = this.props.colour ?? 'black';
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

  /** @inheritdoc */
  public setShapeDrawProperties(props: SegmentProperties): void {
    let properties = this.props as SegmentProperties;

    properties.colour = props.colour ?? this.defaultColour;
    properties.dash = props.dash ?? this.defaultDash;
    properties.width = props.width ?? this.defaultWidth;

    this.props = properties;
  }

  /** @inheritdoc */
  protected getDefaultShapeProperties(): SegmentProperties {
    return {
      colour: this.defaultColour,
      dash: this.defaultDash,
      width: this.defaultWidth
    };
  }
}