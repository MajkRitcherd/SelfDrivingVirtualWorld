import ICoordinate from "../Interfaces/ICoordinate.js";
import Shape from "./Shape.js";

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
  public draw(ctx2D: CanvasRenderingContext2D, size: number = 18): void {
    super.draw(ctx2D);

    const radius: number = size / 2;

    ctx2D.beginPath();
    ctx2D.arc(this.coordinate.x, this.coordinate.y, radius, 0, Math.PI * 2);
    ctx2D.fill();
  }

  /**
   * Check if points are equal.
   * @param point Point to compare to.
   * @returns True, if they are equal, otherwise false.
   */
  public isEqual(point: Point): boolean {
    return this.coordinate.x == point.coordinate.x &&
           this.coordinate.y == point.coordinate.y;
  }
}
