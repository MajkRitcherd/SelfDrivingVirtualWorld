import GraphEditor from "./Editor/GraphEditor.js";
import Viewport from "./Editor/Viewport.js";
import Graph from "./Math/Graph.js";
import Point from "./Primitives/Point.js";
import Segment from "./Primitives/Segment.js";


const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

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

const graph = new Graph(graphVertices, edges); // For debugging
// const graph = new Graph();
const viewport = new Viewport(canvas);
const graphEditor = new GraphEditor(viewport, graph);

function animate() {
  viewport.display();
  graphEditor.display();
  requestAnimationFrame(animate);
}

animate();