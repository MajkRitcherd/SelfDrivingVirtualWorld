import ICoordinate from "../Interfaces/ICoordinate.js";
import Shape, { ShapeProperties } from "./Shape.js";

/**
 * Represents point properties.
 */
interface PointProperties extends ShapeProperties {
  /** Whether or not to outline the point. */
  isFillSelected?: boolean;
  
  /** Whether or not to highlight the point. */
  isHighlight?: boolean;
  
  /** Size of a point. */
  size?: number;
}

/**
 * Represents Point.
 */
export default class Point extends Shape {
  protected readonly defaultIsFillSelected = false;
  protected readonly defaultIsHighlight = false;
  protected readonly defaultSize = 18;

  /** Coordinates of a Point. */
  coordinate: ICoordinate;

  constructor(xPoint: number, yPoint: number) {
    super();

    this.coordinate = {
      x: xPoint,
      y: yPoint
    }
  }

  /** @inheritdoc */
  public draw(ctx2D: CanvasRenderingContext2D): void {
    super.draw(ctx2D);

    const props = this.props as PointProperties;
    const radius: number = (props.size ?? 18) / 2;

    this.drawPoint(ctx2D, radius);

    if (props.isFillSelected ?? false) {
      this.fillSelectedPoint(ctx2D, radius);
    }

    if (props.isHighlight ?? false) {
      this.highlightPoint(ctx2D, radius);
    }
  }

  /** @inheritdoc */
  public isEqual(point: Point): boolean {
    return this.coordinate.x == point.coordinate.x &&
           this.coordinate.y == point.coordinate.y;
  }

  /** @inheritdoc */
  public setShapeDrawProperties(props: PointProperties): void {
    let properties = this.props as PointProperties;

    properties.colour = props.colour ?? this.defaultColour;
    properties.isFillSelected = props.isFillSelected ?? this.defaultIsFillSelected;
    properties.isHighlight = props.isHighlight ?? this.defaultIsHighlight;
    properties.size = props.size ?? this.defaultSize;
    
    this.props = properties;
  }

  /** @inheritdoc */
  protected getDefaultShapeProperties(): PointProperties {
    return {
      colour: this.defaultColour,
      isFillSelected: this.defaultIsFillSelected,
      isHighlight: this.defaultIsHighlight,
      size: this.defaultSize
    }
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