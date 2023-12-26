import IDraw2D from "../Interfaces/IDraw2D.js";
import { angle, subtract, translate } from "../Math/Utils.js";
import Point from "./Point.js";
import { Polygon, PolygonProperties } from "./Polygon.js";
import Segment from "./Segment.js";

/**
 * Represents the road in the editor.
 */
export default class Envelope implements IDraw2D {
  /** Polygon around the edge. */
  public edgePolygon: Polygon;

  /** Skeleton of an edge. */
  private edgeSkeleton: [Point, Point];

  constructor(edge: Segment, roadWidth: number, roundness: number = 1) {
    this.edgeSkeleton = [edge.startPoint, edge.endPoint];
    this.edgePolygon = this.generatePolygon(roadWidth, roundness);
  }

  /** @inheritdoc */
  draw(ctx2D: CanvasRenderingContext2D): void {
    this.edgePolygon.draw(ctx2D, this.edgePolygon.props);
  }

  public setPolygonProperties(polygonProperties: PolygonProperties): void {
    this.edgePolygon.props = polygonProperties;
  }

  /**
   * Generates the polygon around the edge skeleton.
   * @param roadWidth Width of a road.
   * @returns Polygon around the edge skeleton.
   */
  private generatePolygon(roadWidth: number, roundness: number): Polygon {
    const [p1, p2] = this.edgeSkeleton;
    const halfPI = Math.PI / 2;

    const radius = roadWidth / 2;
    const alpha = angle(subtract(p1, p2));
    const alphaClockWise = alpha + halfPI;
    const alphaCounterClockWise = alpha - halfPI;

    const points: Array<Point> = [];
    const step = Math.PI / (Math.max(1, roundness));
    const epsilon = step / 2;
    for (let angle = alphaCounterClockWise; angle <= alphaClockWise + epsilon; angle += step) {
      points.push(translate(p1, angle, radius));
    }

    for (let angle = alphaCounterClockWise; angle <= alphaClockWise + epsilon; angle += step) {
      points.push(translate(p2, Math.PI + angle, radius));
    }

    return new Polygon(points);
  }
}