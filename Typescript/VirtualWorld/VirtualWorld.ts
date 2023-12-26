import GraphEditor from "./Editor/GraphEditor.js";
import Viewport from "./Editor/Viewport.js";
import Graph from "./Math/Graph.js";
import Point from "./Primitives/Point.js";
import Segment from "./Primitives/Segment.js";
import World from "./World/World.js";


const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const disposeButton: HTMLButtonElement = document.getElementById('disposeButton') as HTMLButtonElement;
const saveButton: HTMLButtonElement = document.getElementById('saveButton') as HTMLButtonElement;

disposeButton.addEventListener('click', handleDispose);
saveButton.addEventListener('click', handleSave);

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

//const graph = new Graph(graphVertices, edges); // For debugging
const graphInfo = sessionStorage.getItem('graphInfo');
const graph = graphInfo 
  ? Graph.load(JSON.parse(graphInfo))
  : new Graph(graphVertices, edges);
const world = new World(graph); 
const viewport = new Viewport(canvas);
const graphEditor = new GraphEditor(viewport, graph);

/**
 * Renders the canvas.
 */
function animate() {
  const ctx2D = viewport.canvas.getContext('2d') as CanvasRenderingContext2D;

  viewport.display();
  world.generate();
  world.draw(ctx2D);
  ctx2D.globalAlpha = 0.2;
  graphEditor.display();
  requestAnimationFrame(animate);
}

/**
 * Handles click event (occurs when clicked on dispose button).
 * @param event Mouse event.
 */
function handleDispose(event: MouseEvent) {
  graphEditor.dispose();
}

/**
 * Handles click event (occurs when clicked on save button). 
 * @param event Mouse event.
 */
function handleSave(event: MouseEvent) {
  sessionStorage.setItem('graphInfo', JSON.stringify(graph));
}

animate();