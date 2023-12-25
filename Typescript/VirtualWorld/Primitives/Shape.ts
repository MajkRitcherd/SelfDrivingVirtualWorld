import IDraw2D from "../Interfaces/IDraw2D.js";

/**
 * Abstract shape class.
 */
export default abstract class Shape implements IDraw2D {
  /** Colour property. */
  protected colour: string;

  constructor(colour: string) {
    this.colour = colour;
  }

  /** @inheritdoc */
  public draw(ctx2D: CanvasRenderingContext2D): void {
    ctx2D.fillStyle = this.colour;
  }

  /**
   * Check if shapes are equal.
   * @param shape Shape to compare to.
   * @returns True, if they are equal, otherwise false.
   */
  public abstract isEqual(shape: Shape): boolean;
}