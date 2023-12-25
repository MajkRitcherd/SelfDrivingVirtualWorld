import Graph from "../Math/Graph.js";
import { getNearestVertex } from "../Math/Utils.js";
import Point from "../Primitives/Point.js";
import Segment from "../Primitives/Segment.js";
import AbstractCanvasListener from "./AbstractCanvasListener.js";
import Viewport from "./Viewport.js";

/**
 * Graph editor.
 */
export default class GraphEditor extends AbstractCanvasListener {
  /** Graph model. */
  private graph: Graph;

  /** Viewport. */
  private viewport: Viewport;

  /** Currently selected point. */
  private selectedPoint: Point | undefined;

  /** Currently hovered point. */
  private hoveredPoint: Point | undefined;

  /** Whether or not should drag vertex. */
  private isDragging: boolean;

  /** Mouse point. */
  private mousePoint: Point | undefined;

  constructor(viewport: Viewport, graph: Graph) {
    super(viewport.canvas);

    this.graph = graph;
    this.viewport = viewport;

    this.selectedPoint = undefined;
    this.hoveredPoint = undefined;
    this.isDragging = false;
    this.mousePoint = undefined;
  }

  /** Draws the content to the graph editor. */
  public display() {
    this.graph.draw(this.ctx2D);
    
    if (this.hoveredPoint !== undefined && this.selectedPoint?.isEqual(this.hoveredPoint)) {
      this.hoveredPoint.draw(this.ctx2D, { fillSelected: true, highlight: true });
    }
    else {
      if (this.selectedPoint) {
        const segmentPoint = this.hoveredPoint ? this.hoveredPoint : this.mousePoint!;
          
        new Segment(this.selectedPoint, segmentPoint).draw(this.ctx2D, { dash: [3, 3] });
        this.selectedPoint.draw(this.ctx2D, { fillSelected: true });
      }
      
      if (this.hoveredPoint) {
        this.hoveredPoint.draw(this.ctx2D, { highlight: true });
      }
    }
  }

  /** @inheritdoc */
  protected addEventListeners(): void {
    super.addEventListeners();

    // Highlight vertex or move it
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));

    // Do not show context menu on our canvas
    this.canvas.addEventListener('contextmenu', event => event.preventDefault());

    // Stop dragging on mouse up
    this.canvas.addEventListener('mouseup', _ => this.isDragging = false);
  }

  /**
   * Tries to add new vertex to the graph.
   * @param newVertex New vertex to be added.
   */
  private tryAddVertex(newVertex: Point): void {
    if (this.hoveredPoint) {
      this.selectPoint(this.hoveredPoint);
      this.isDragging = true;
      return;
    }

    this.graph.tryAddVertex(newVertex);

    // Add edge between the old selected vertex and the new one
    this.selectPoint(newVertex);

    this.hoveredPoint = newVertex;
  }

  /**
   * Selects a new point.
   * @param pointToSelect Point to select.
   */
  private selectPoint(pointToSelect: Point): void {
    if (this.selectedPoint) {
      this.graph.tryAddEdge(new Segment(this.selectedPoint, pointToSelect));
    }

    this.selectedPoint = pointToSelect;
  }

  /**
   * Removes vertex from graph.
   * @param vertex Vertex to remove.
   */
  private removeVertex(vertex: Point) {
    this.graph.removeVertex(vertex);
    this.hoveredPoint = undefined;

    if (this.selectedPoint === vertex) {
      this.selectedPoint = undefined;
    }
  }

  //#region Event handlers

  /** @inheritdoc */
  protected handleMouseDown(event: MouseEvent) {
    const leftButton: number = 0;
    const rightButton: number = 2;

    if (event.button === leftButton) {
      this.tryAddVertex(this.mousePoint!);
    }

    if (event.button === rightButton) {
      if (this.selectedPoint) {
        this.selectedPoint = undefined;
      }
      else if (this.hoveredPoint) {
        this.removeVertex(this.hoveredPoint);
      }
    }
  }

  /**
   * Handles graph editor's mouse down event.
   * @param event Mouse event.
   */
  private handleMouseMove(event: MouseEvent) {
    this.mousePoint = this.viewport.getMousePoint(event);
    const threshold = this.isDragging ? Number.MAX_SAFE_INTEGER : 10;

    this.hoveredPoint = getNearestVertex(this.mousePoint, this.graph.vertices, threshold);

    if (this.hoveredPoint && this.isDragging) {
      this.hoveredPoint.coordinate.x = this.mousePoint.coordinate.x;
      this.hoveredPoint.coordinate.y = this.mousePoint.coordinate.y;
    }
  }

  //#endregion
}