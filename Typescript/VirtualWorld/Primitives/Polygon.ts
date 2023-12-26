import IIntersection from "../Interfaces/IIntersection.js";
import { average, getIntersection, getRandomColour } from "../Math/Utils.js";
import Point from "./Point.js";
import Segment, { SegmentProperties} from "./Segment.js";
import Shape, { ShapeProperties } from "./Shape.js";

/**
 * Represents polygon properties.
 */
export interface PolygonProperties extends ShapeProperties {
  /** Fill colour. */
  fillColour?: string;

  /** Width of a line. */
  lineWidth?: number;

  /** Stroke colour. (Maybe just colour of a shape?) */
  strokeColour?: string;
}

/**
 * Represents polygon.
 */
export class Polygon extends Shape {
  protected readonly defaultFillColour: string = 'rgba(0, 0, 255, 0.3)';
  protected readonly defaultLineWidth: number = 2;
  protected readonly defaultStrokeColour: string = 'blue';
  
  /** Points of polygon. */
  protected points: Array<Point>;

  /** Segments of polygon. */
  protected segments: Array<Segment>;

  constructor(points: Array<Point>) {
    super();

    this.points = points;
    this.segments = [];

    for (let index = 1; index <= this.points.length; index++) {
      this.segments.push(new Segment(points[index - 1], points[index % this.points.length]));
    }
  }

  /**
   * Breaks polygon's segments to segment inside another polygon and outside.
   * @param poly1 First polygon.
   * @param poly2 Second polygon.
   */
  public static break(poly1: Polygon, poly2: Polygon): void {
    const segmentsOfPoly1 = poly1.segments;
    const segmentsOfPoly2 = poly2.segments;

    for (let index = 0; index < segmentsOfPoly1.length; index++) {
      for (let index2 = 0; index2 < segmentsOfPoly2.length; index2++) {
        const intersection: IIntersection | null = getIntersection(
          segmentsOfPoly1[index].startPoint, segmentsOfPoly1[index].endPoint,
          segmentsOfPoly2[index2].startPoint, segmentsOfPoly2[index2].endPoint
        );

        if (intersection && intersection.offset != 1 && intersection.offset != 0) {
          const point = new Point(intersection.x, intersection.y);
          let aux = segmentsOfPoly1[index].endPoint;
          segmentsOfPoly1[index].endPoint = point;
          segmentsOfPoly1.splice(index + 1, 0, new Segment(point, aux));
          aux = segmentsOfPoly2[index2].endPoint;
          segmentsOfPoly2[index2].endPoint = point;
          segmentsOfPoly2.splice(index2 + 1, 0, new Segment(point, aux));
        }
      }
    }
  }

  /**
   * Breaks segments of all polygons using break() method.
   * @param polygons Collection of polygons.
   */
  public static multiBreak(polygons: Array<Polygon>): void {
    for (let index = 0; index < polygons.length - 1; index++) {
      for (let index2 = index + 1; index2 < polygons.length; index2++) {
        Polygon.break(polygons[index], polygons[index2]);
      }
    }
  }

  /**
   * Unions segment to keep (those that are outside and not inside another polygons).
   * @param polygons Collection of polygons.
   * @returns Collection of kept segments.
   */
  public static union(polygons: Array<Polygon>): Array<Segment> {
    Polygon.multiBreak(polygons);
    const keptSegments: Array<Segment> = [];

    for (let index = 0; index < polygons.length; index++) {
      for (const segment of polygons[index].segments) {
        let keep = true;

        for (let index3 = 0; index3 < polygons.length; index3++) {
          if (index != index3 && polygons[index3].containsSegment(segment)) {
              keep = false;
              break;
          }
        }

        if (keep) {
          keptSegments.push(segment);
        }
      }
    }

    return keptSegments;
  }

  /**
   * Draws segments (for debuggin purposes).
   * @param ctx2D Canvas 2D rendering context.
   */
  drawSegments(ctx2D: CanvasRenderingContext2D): void {
    for (const segment of this.segments) {
      const props = segment.props as SegmentProperties;
      props.colour = getRandomColour();
      props.width = 5;
      segment.draw(ctx2D, props);
    }
  }

  /** @inheritdoc */
  public isEqual(polygon: Polygon): boolean {
    throw new Error("Method not implemented.");
  }
  
  /** @inheritdoc */
  public draw(ctx2D: CanvasRenderingContext2D, polygonProperties: PolygonProperties = { fillColour: 'rgba(0, 0, 255, 0.3)', lineWidth: 2, strokeColour: 'blue' }): void {
    super.draw(ctx2D);
    
    ctx2D.beginPath();
    ctx2D.fillStyle = polygonProperties.fillColour ?? 'rgba(0, 0, 255, 0.3)';
    ctx2D.strokeStyle = polygonProperties.strokeColour ?? 'blue';
    ctx2D.lineWidth = polygonProperties.lineWidth ?? 2;
    ctx2D.moveTo(this.points[0].coordinate.x, this.points[0].coordinate.y);

    for (let index = 1; index < this.points.length; index++) {
      ctx2D.lineTo(this.points[index].coordinate.x, this.points[index].coordinate.y);
    }

    ctx2D.closePath();
    ctx2D.fill();
    ctx2D.stroke();
  }

  /** @inheritdoc */
  public setShapeDrawProperties(props: PolygonProperties): void {
    let properties = this.props as PolygonProperties;

    properties.colour = props.colour ?? this.defaultColour;
    properties.fillColour = props.fillColour ?? this.defaultFillColour;
    properties.lineWidth = props.lineWidth ?? this.defaultLineWidth;
    properties.strokeColour = props.strokeColour ?? this.defaultStrokeColour;

    this.props = properties;
  }

  /** @inheritdoc */
  protected getDefaultShapeProperties(): PolygonProperties {
    return {
      colour: this.defaultColour,
      fillColour: this.defaultFillColour,
      lineWidth: this.defaultLineWidth,
      strokeColour: this.defaultStrokeColour,
    };
  }
  
  /**
   * Determines whether a given point is inside a polygon or not.
   * @param point Point to check.
   * @returns True, if point is inside, otherwise false.
   */
  private containsPoint(point: Point): boolean {
    const outerPoint = new Point(-1000, -1000);
    let intersectionCount = 0;
    for (const segment of this.segments) {
      const intersection = getIntersection(outerPoint, point, segment.startPoint, segment.endPoint);
      if (intersection) {
        intersectionCount++;
      }
    }

    return intersectionCount % 2 == 1;
  }

  /**
   * Determines whether a given segment is inside a polygon or not.
   * @param segment Segment to check.
   * @returns True, if segment is inside, otherwise false.
   */
  private containsSegment(segment: Segment): boolean {
    const midPoint = average(segment.startPoint, segment.endPoint);
    return this.containsPoint(midPoint);
  }
}