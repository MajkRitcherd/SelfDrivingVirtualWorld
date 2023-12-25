import ICoordinate from "../Interfaces/ICoordinate.js";
import Shape from "./Shape.js";

/**
 * Represents point properties.
 */
interface PointProperties {
  /** Size of a point. */
  size?: number;

  /** Whether or not to outline the point. */
  fillSelected?: boolean;

  /** Whether or not to highlight the point. */
  highlight?: boolean;
}

/**
 * Represents Point.
 */
export default class Point extends Shape {
  /** Coordinates of a Point. */
  coordinate: ICoordinate;

  constructor(xPoint: number, yPoint: number, colour: string = 'black') {
    super(colour);

    this.coordinate = {
      x: xPoint,
      y: yPoint
    }
  }

  /** @inheritdoc */
  public draw(ctx2D: CanvasRenderingContext2D, pointProperties: PointProperties = { size: 18, fillSelected: false, highlight: false }): void {
    super.draw(ctx2D);

    const radius: number = (pointProperties.size ?? 18) / 2;

    this.drawPoint(ctx2D, radius);

    if (pointProperties.fillSelected ?? false) {
      this.fillSelectedPoint(ctx2D, radius);
    }

    if (pointProperties.highlight ?? false) {
      this.highlightPoint(ctx2D, radius);
    }
  }

  /** @inheritdoc */
  public isEqual(point: Point): boolean {
    return this.coordinate.x == point.coordinate.x &&
           this.coordinate.y == point.coordinate.y;
  }

  /**
   * Draws a point to the canvas context of the given radius.
   * @param ctx2D Canvas 2D rendering context.
   * @param radius Point radius.
   */
  private drawPoint(ctx2D: CanvasRenderingContext2D, radius: number): void {
    ctx2D.beginPath();
    ctx2D.arc(this.coordinate.x, this.coordinate.y, radius, 0, Math.PI * 2);
    ctx2D.fill();
  }

  /**
   * 
   * @param ctx2D Canvas 2D rendering context.
   * @param radius Point radius.
   */
  private fillSelectedPoint(ctx2D: CanvasRenderingContext2D, radius: number): void {
    const fillColour = 'orange';

    ctx2D.beginPath();
    ctx2D.lineWidth = 3;
    ctx2D.strokeStyle = fillColour;
    ctx2D.arc(this.coordinate.x, this.coordinate.y, radius * 0.3, 0, Math.PI * 2);
    ctx2D.stroke();
  }

  /**
   * Highlights a point.
   * @param ctx2D Canvas 2D rendering context.
   * @param radius Point radius.
   */
  private highlightPoint(ctx2D: CanvasRenderingContext2D, radius: number): void {
    const highlightColour = 'yellow';

    ctx2D.beginPath();
    ctx2D.lineWidth = 2;
    ctx2D.strokeStyle = highlightColour;
    ctx2D.arc(this.coordinate.x, this.coordinate.y, radius, 0, Math.PI * 2);
    ctx2D.stroke();
  }
}