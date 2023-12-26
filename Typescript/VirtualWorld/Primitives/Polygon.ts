import Point from "./Point.js";
import Shape from "./Shape.js";

/**
 * Represents polygon properties.
 */
interface PolygonProperties {
  /** Fill colour. */
  fillColour?: string;

  /** Width of a line. */
  lineWidth?: number;

  /** Stroke colour. (Maybe just colour of a shape?) */
  strokeColour?: string;
}

/**
 * Represents polygon.
 */
export default class Polygon extends Shape {
  /** Points of polygon. */
  protected points: Array<Point>;

  constructor(points: Array<Point>) {
    super('blue');

    this.points = points;
  }

  /** @inheritdoc */
  public isEqual(polygon: Polygon): boolean {
    throw new Error("Method not implemented.");
  }
  
  /** @inheritdoc */
  public draw(ctx2D: CanvasRenderingContext2D, polygonProperties: PolygonProperties = { fillColour: 'rgba(0, 0, 255, 0.3)', lineWidth: 2, strokeColour: 'blue' }): void {
    super.draw(ctx2D);
    
    ctx2D.beginPath();
    ctx2D.fillStyle = polygonProperties.fillColour ?? 'rgba(0, 0, 255, 0.3)';
    ctx2D.strokeStyle = polygonProperties.strokeColour ?? 'blue';
    ctx2D.lineWidth = polygonProperties.lineWidth ?? 2;
    ctx2D.moveTo(this.points[0].coordinate.x, this.points[0].coordinate.y);

    for (let index = 1; index < this.points.length; index++) {
      ctx2D.lineTo(this.points[index].coordinate.x, this.points[index].coordinate.y);
    }

    ctx2D.closePath();
    ctx2D.fill();
    ctx2D.stroke();
  }
}