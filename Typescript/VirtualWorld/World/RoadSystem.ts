import IDraw2D from "../Interfaces/IDraw2D.js";
import Graph from "../Math/Graph.js";
import Envelope from "../Primitives/Envelope.js";
import { Polygon, PolygonProperties } from "../Primitives/Polygon.js";
import Segment, { SegmentProperties } from "../Primitives/Segment.js";

/**
 * Represents roads in the virtual world.
 */
export default class RoadSystem implements IDraw2D {
  /** Graph. */
  private graph: Graph;

  /** Width of a road. */
  private roadWidth: number;

  /** Roundness of a road. */
  private roadRoundness: number;

  /** Collection of an envelopes. */
  private envelopes: Array<Envelope>;

  /** Collection of road borders. */
  private roadBorders: Array<Segment>;

  /** Road's fill colour. */
  private fillColour: string;

  /** Road's stroke colour. */
  private strokeColour: string;

  constructor(graph: Graph, roadWidth: number, roadRoundness: number) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;
    this.fillColour = '#BBB';
    this.strokeColour = '#BBB';

    this.envelopes = []
    this.roadBorders = [];

    this.generateRoads();
  }

  /** @inheritdoc */
  public draw(ctx2D: CanvasRenderingContext2D): void {
    for (const envelope of this.envelopes) {
      const props: PolygonProperties = {
        fillColour: this.fillColour,
        strokeColour: this.strokeColour,
        lineWidth: 15,
      }
      envelope.setPolygonProperties(props);
      envelope.draw(ctx2D);
    }

    for (const edge of this.graph.edges) {
      edge.props.colour = 'white';
      edge.draw(ctx2D, { dash: [10, 10], width: 4} );
    }

    for (const border of this.roadBorders) {
      const props = border.props as SegmentProperties;
      props.colour = 'white';
      props.width = 4;
      border.draw(ctx2D, props);
    }
  }

  /**
   * Generates roads from the graph's edges.
   */
  public generateRoads(): void {
    this.envelopes.length = 0;

    for (const edge of this.graph.edges) {
      this.envelopes.push(new Envelope(edge, this.roadWidth, this.roadRoundness));
    }

    this.roadBorders = Polygon.union(this.envelopes.map(envelope => envelope.edgePolygon));
  }
}