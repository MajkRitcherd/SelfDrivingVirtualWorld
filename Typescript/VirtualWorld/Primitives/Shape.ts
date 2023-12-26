import IDraw2D from "../Interfaces/IDraw2D.js";

/**
 * Represents shape's properties.
 */
export interface ShapeProperties {
  /** Colour of a shape. */
  colour?: string;
}

/**
 * Abstract shape class.
 */
export default abstract class Shape implements IDraw2D {
  protected readonly defaultColour: string = 'black';
  
  /** Shape properties. */
  public props: ShapeProperties;

  constructor() {
    this.props = this.getDefaultShapeProperties();
  }
  
  /** @inheritdoc */
  public draw(ctx2D: CanvasRenderingContext2D): void {
    ctx2D.fillStyle = this.props.colour ?? this.defaultColour;
  }
  
  /**
   * Check if shapes are equal.
   * @param shape Shape to compare to.
   * @returns True, if they are equal, otherwise false.
  */
  public abstract isEqual(shape: Shape): boolean;
 
  /**
   * Sets shape's properties for drawing.
   * @param props Shape's properties.
  */
  public setShapeDrawProperties(props: ShapeProperties): void {
    this.props = props;
  };
 
 /**
  * Gets default shape properties.
   * @returns Shape's properties.
   */
  protected getDefaultShapeProperties(): ShapeProperties {
    return { colour: this.defaultColour }
  }
}