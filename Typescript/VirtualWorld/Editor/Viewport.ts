import AbstractCanvasListener from "./AbstractCanvasListener.js";
import { add, scale, subtract } from "../Math/Utils.js";
import Point from "../Primitives/Point.js";

/**
 * Represents dragging properties.
 */
interface DragProperties {
  /** End point of dragging. */
  endPoint: Point;
  
  /** Whether or not dragging is active. */
  isActive: boolean;
  
  /** Offset point. */
  offset: Point;
  
  /** Start point of dragging. */
  startPoint: Point;
}

/**
 * Represents viewport properties.
 */
interface ViewportProperties {
  /** Center of a viewport. */
  center: Point;
  
  /** Viewport's drag properties. */
  dragProperties: DragProperties;
  
  /** Viewport's offset. */
  offset: Point;
  
  /** Viewport's zoom constant. */
  zoom: number;
}

export default class Viewport extends AbstractCanvasListener {
  /** Viewport zoom */
  public properties: ViewportProperties;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    const centerPoint = new Point(this.canvas.width / 2, this.canvas.height / 2);

    this.properties = {
      center: centerPoint,
      dragProperties: this.getNewDragProperties(),
      offset: scale(centerPoint, -1),
      zoom: 1
    }
  }

  /**
   * Displays the viewport.
   */
  public display(): void {
    this.ctx2D.restore();
    this.ctx2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx2D.save();
    this.ctx2D.translate(this.properties.center.coordinate.x, this.properties.center.coordinate.y);
    this.ctx2D.scale(1 / this.properties.zoom, 1 / this.properties.zoom);
    const offset = this.getOffsetPoint();
    this.ctx2D.translate(offset.coordinate.x, offset.coordinate.y);
  }

  /**
   * Gets mouse point with respect to the zoom.
   * @param mouseEvent Mouse event.
   * @returns New point.
   */
  public getMousePoint(mouseEvent: MouseEvent, shouldSubtractDragOffset = false): Point {
    let point = new Point(
      (mouseEvent.offsetX - this.properties.center.coordinate.x) * this.properties.zoom - this.properties.offset.coordinate.x,
      (mouseEvent.offsetY - this.properties.center.coordinate.y) * this.properties.zoom - this.properties.offset.coordinate.y
    );

    return shouldSubtractDragOffset ? subtract(point, this.properties.dragProperties.offset) : point;
  }

  /**
   * Gets the offset point.
   * @returns Offset point.
   */
  public getOffsetPoint(): Point {
    return add(this.properties.offset, this.properties.dragProperties.offset);
  }

  /** @inheritdoc */
  protected addEventListeners(): void {
    super.addEventListeners();

    this.canvas.addEventListener('wheel', this.handleMouseWheel.bind(this));
  }
  
//#region Event handlers

  /** @inheritdoc */
  protected handleMouseDown(mouseEvent: MouseEvent): void {
    const middleButton: number = 1;

    if (mouseEvent.button === middleButton) {
      this.panViewport(new Point(mouseEvent.offsetX, mouseEvent.offsetY));
    }
  } 

  /** @inheritdoc */
  protected handleMouseWheel(wheelEvent: WheelEvent): void {
    const direction = Math.sign(wheelEvent.deltaY);
    const step = 0.1;

    this.properties.zoom += direction * step;
    this.properties.zoom = Math.max(1, Math.min(5, this.properties.zoom));
  }

  /** @inheritdoc */
  protected handleMouseMove(mouseEvent: MouseEvent): void {
    let dragProperties = this.properties.dragProperties;

    if (dragProperties.isActive) {
      dragProperties.endPoint = new Point(mouseEvent.offsetX, mouseEvent.offsetY);
      dragProperties.offset = subtract(dragProperties.endPoint, dragProperties.startPoint);
    }

    this.properties.dragProperties = dragProperties;
  }

  /** @inheritdoc */
  protected handleMouseUp(mouseEvent: MouseEvent): void {
    if (this.properties.dragProperties.isActive) {
      this.properties.offset = add(this.properties.offset, this.properties.dragProperties.offset);
      this.properties.dragProperties = this.getNewDragProperties();
    }
  }

//#endregion

  /**
   * Gets new drag properties (default ones).
   * @returns New drag properties.
   */
  private getNewDragProperties(): DragProperties {
    const originPoint = new Point(0, 0);

    return {
      startPoint: originPoint,
      endPoint: originPoint,
      offset: originPoint,
      isActive: false 
    }
  }

  /**
   * Pans the viewport (dragging by middle button).
   * @param point Point.
   */
  private panViewport(point: Point): void {
    let dragProperties = this.properties.dragProperties;

    if (!dragProperties.isActive) {
      dragProperties.startPoint = point;
      dragProperties.isActive = true;
    }

    this.properties.dragProperties = dragProperties;
  }
}