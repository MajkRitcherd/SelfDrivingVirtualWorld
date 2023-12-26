import IDraw2D from "../Interfaces/IDraw2D.js";
import Graph from "../Math/Graph.js";
import RoadSystem from "./RoadSystem.js";

/**
 * Represents virtual world.
 */
export default class World implements IDraw2D {
  /** World's road system. */
  private roadSystem: RoadSystem;

  constructor(graph: Graph, roadWidth: number = 100, roadRoundness: number = 10) {
    this.roadSystem = new RoadSystem(graph, roadWidth, roadRoundness);
  }

  /** @inheritdoc */
  public draw(ctx2D: CanvasRenderingContext2D): void {
    this.roadSystem.draw(ctx2D);
  }

  /** Generates the world. */
  public generate(): void {
    this.roadSystem.generateRoads();
  }
}