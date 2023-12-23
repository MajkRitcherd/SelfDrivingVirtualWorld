import IDraw from '../Interfaces/IDraw2D.js'
import Point from '../Primitives/Point.js';
import Segment from '../Primitives/Segment.js';

/**
 * Represents undirected simple graph.
 */
export default class Graph implements IDraw {
  /** Vertices of a graph. */
  protected vertices: Array<Point>;

  /** Edges of a graph. */
  protected edges: Array<Segment>;

  constructor(vertices: Array<Point>, edges: Array<Segment>) {
    this.vertices = vertices;
    this.edges = edges;
  }

  /** @inheritdoc */
  draw(ctx2D: CanvasRenderingContext2D): void {
    // Draw firstly edges, so the points are on top of them
    this.edges.forEach(edge => {
      edge.draw(ctx2D);
    });

    this.vertices.forEach(vert => {
      vert.draw(ctx2D);
    });
  }
}