/**
 * Abstract canvas listener class.
 */
export default abstract class AbstractCanvasListener {
  /** Canvas. */
  public canvas: HTMLCanvasElement;

  /** Canvas 2D rendering context. */
  protected ctx2D: CanvasRenderingContext2D;

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
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
  };

  /**
   * Handles mouse down event.
   * @param mouseEvent Mouse event.
   */
  protected abstract handleMouseDown(mouseEvent: MouseEvent): void;

  /**
   * Handles mouse move event.
   * @param mouseEvent Mouse event.
   */
  protected abstract handleMouseMove(mouseEvent: MouseEvent): void;

  /**
   * Handles mouse up event.
   * @param mouseEvent Mouse event.
   */
  protected abstract handleMouseUp(mouseEvent: MouseEvent): void;
}