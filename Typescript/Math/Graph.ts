import IDraw from '../Interfaces/IDraw2D.js'
import { Logger, MessageType } from '../Logger.js';
import Point from '../Primitives/Point.js';
import Segment from '../Primitives/Segment.js';

/**
 * Represents undirected simple graph.
 */
export default class Graph implements IDraw {
  /** Vertices of a graph. */
  public vertices: Array<Point>;

  /** Edges of a graph. */
  public edges: Array<Segment>;

  private logger: Logger;

  constructor(vertices: Array<Point>, edges: Array<Segment>) {
    this.vertices = vertices;
    this.edges = edges;
    this.logger = new Logger();
  }

  /** @inheritdoc */
  public draw(ctx2D: CanvasRenderingContext2D): void {
    // Draw firstly edges, so the points are on top of them
    this.edges.forEach(edge => {
      edge.draw(ctx2D);
    });

    this.vertices.forEach(vert => {
      vert.draw(ctx2D);
    });
  }

  /**
   * Tries to add edge to the graph's edges.
   * @param edge Edge to add.
   * @returns True, if edge was added, otherwise false.
   */
  public tryAddEdge(edge: Segment): boolean {
    if (!edge.startPoint.isEqual(edge.endPoint) && !this.containsEdge(edge)) {
      this.addEdge(edge);
      this.logger.log('Edge successfuly added.', MessageType.Normal);
      return true;
    }

    this.logger.log('Adding edge failed!\Edge already exists.', MessageType.Error);
    return false;
  }

  /**
   * Removes edge from Graph's edges.
   * @param edge Edge to remove.
   */
  public removeEdge(edge: Segment): void {
    if (this.edges.length == 0) {
      this.logger.log('No edges to remove!', MessageType.Warning);
      return;
    }

    this.edges.splice(this.edges.indexOf(edge), 1);
  }
  
  /**
   * Tries to add vertex to the graph's vertices.
   * @param vertex Vertex to add.
   * @returns True, if vertex was added, otherwise false.
   */
  public tryAddVertex(vertex: Point): boolean {
    if (!this.containsVertex(vertex)) {
      this.addVertex(vertex);
      this.logger.log('Vertex successfuly added.', MessageType.Normal);
      return true;
    }

    this.logger.log('Adding vertex failed!\nVertex already exists.', MessageType.Error);
    return false;
  }

  /**
   * Removes vertex from Graph's vertices.
   * @param vertex Vertex to remove.
   */
  public removeVertex(vertex: Point): void {
    if (this.vertices.length == 0) {
      this.logger.log('No vertices to remove!', MessageType.Warning);
      return;
    }

    const edges = this.getEdgesWithVertex(vertex);
    for (const edge of edges) {
      this.removeEdge(edge);
    }

    this.vertices.splice(this.vertices.indexOf(vertex), 1);
  }

  /**
   * Adds edge to the edges.
   * @param edge Edge to add.
   */
  private addEdge(edge: Segment): void {
    this.edges.push(edge);
  }

  /**
   * Check whether edge already exists in the graph.
   * @param edge Edge to add.
   * @returns Edge, if found, otherwise undefined.
   */
  private containsEdge(edge: Segment): Segment | undefined {
    return this.edges.find((e) => e.isEqual(edge));
  }

  /**
   * Gets edges that given vertex is part of.
   * @param vertex Vertex.
   * @returns Edges that vertex is part of.
   */
  private getEdgesWithVertex(vertex: Point): Array<Segment> {
    let edges: Array<Segment> = [];

    for (const edge of this.edges) {
      if (edge.includes(vertex)) {
        edges.push(edge);
      }
    }

    return edges;
  }
  
  /**
   * Adds vertex to the graph's vertices.
   * @param vertex Vertex to add.
   */
  private addVertex(vertex: Point): void {
    this.vertices.push(vertex);
  }

  /**
   * Check whether vertex already exists in the graph.
   * @param vertex Vertex to add.
   * @returns Vertex, if found, otherwise undefined.
   */
  private containsVertex(vertex: Point): Point | undefined {
    return this.vertices.find((vert) => vert.isEqual(vertex));
  }
}