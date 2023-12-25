/**
 * Abstract canvas listener class.
 */
export default abstract class AbstractCanvasListener {
  /** Canvas 2D rendering context. */
  protected ctx2D: CanvasRenderingContext2D;

  /** Canvas. */
  public canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx2D = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Register event listeners.
    this.addEventListeners();
  }

  /** 
   * Adds event listeners to the canvas HTML element.
   */
  protected addEventListeners(): void {
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
  };

  /**
   * Handles mouse down event.
   * @param mouseEvent Mouse event.
   */
  protected abstract handleMouseDown(mouseEvent: MouseEvent): void;
}