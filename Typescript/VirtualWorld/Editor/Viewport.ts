import Point from "../Primitives/Point.js";
import AbstractCanvasListener from "./AbstractCanvasListener.js";

/**
 * Represents viewport properties.
 */
interface ViewportProperties {
  /** Zoom property. */
  zoom: number;
}

export default class Viewport extends AbstractCanvasListener {
  /** Viewport zoom */
  public properties: ViewportProperties;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.properties = {
      zoom: 1,
    }
  }

  /** @inheritdoc */
  protected addEventListeners(): void {
    super.addEventListeners();

    this.canvas.addEventListener('wheel', this.handleMouseWheel.bind(this));
  }
  
  /** @inheritdoc */
  protected handleMouseDown(mouseEvent: MouseEvent): void {
    const middleButton: number = 1;

    if (mouseEvent.button === middleButton) {

    }
  } 

  /**
   * Gets mouse point with respect to the zoom.
   * @param mouseEvent Mouse event.
   * @returns New point.
   */
  public getMousePoint(mouseEvent: MouseEvent): Point {
    return new Point(
      mouseEvent.offsetX * this.properties.zoom,
      mouseEvent.offsetY * this.properties.zoom
    );
  }

  /**
   * Handles viewport's mouse wheel event.
   * @param wheelEvent Wheel event.
   */
  protected handleMouseWheel(wheelEvent: WheelEvent): void {
    const direction = Math.sign(wheelEvent.deltaY);
    const step = 0.1;

    this.properties.zoom += direction * step;
    this.properties.zoom = Math.max(1, Math.min(5, this.properties.zoom));
  }
}