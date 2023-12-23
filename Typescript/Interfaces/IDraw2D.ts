/**
 * Interface for drawing methods onto the 2D canvas.
 */
export default interface IDraw2D {
  /**
   * Draws 2D shape onto the canvas.
   * @param ctx2D Canvas 2D rendering context.
   */
  draw(ctx2D: CanvasRenderingContext2D): void;
}