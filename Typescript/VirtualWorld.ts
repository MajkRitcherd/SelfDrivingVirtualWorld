import Graph from "./Math/Graph.js";
import Point from "./Primitives/Point.js";
import Segment from "./Primitives/Segment.js";


let virtualWorld: HTMLCanvasElement = document.getElementById('virtualWorld') as HTMLCanvasElement;

let ctx2D = virtualWorld.getContext('2d') as CanvasRenderingContext2D;
ctx2D.canvas.width = 600;
ctx2D.canvas.height = 600;

const vert1 = new Point(200, 200);
const vert2 = new Point(500, 200);
const vert3 = new Point(400, 400);
const vert4 = new Point(100, 300);

const graphVertices = [vert1, vert2, vert3, vert4]

const edges = [
  new Segment(vert2, vert1),
  new Segment(vert2, vert3),
  new Segment(vert2, vert4),
  new Segment(vert3, vert4),
]

const graph = new Graph(graphVertices, edges);

graph.draw(ctx2D);