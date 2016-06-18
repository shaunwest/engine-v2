import { getElementById } from './demo-helpers';
import { getWebResource } from './web-resource/web-resource-loader.js';
import { createGameObjectSet } from './game-object/game-object.js';
import { create2dBoxRenderer, create2dLineRenderer, createObjectRenderer, createDebugRenderer } from './util/render.js';
import { linesIntersect } from './line.js';

const lines = [
  { x1: 0, y1: 0, x2: 50, y2: 50, slope: 1, type: "line" },
  { x: 20, y: 20, width: 50, height: 50, type: "box" }
];

const canvas = getElementById('collisions');
const position = { x: 0, y: 0 };
const lineRenderer = create2dLineRenderer(canvas);
const boxRenderer = create2dBoxRenderer(canvas);
const renderDebug = createObjectRenderer({ line: lineRenderer, box: boxRenderer });

renderDebug(lines, position);

/*
getWebResource('/data/colliders.json')
  .then(collidersConfig => {
    const canvas = getElementById('collisions');
    const position = { x: 0, y: 0 };
    const render2d = create2dBoxRenderer(canvas);
    const renderDebug = createDebugRenderer(render2d);
    const colliderSet = createGameObjectSet(collidersConfig.colliderSet, collidersConfig.colliderTypeSet);

    renderDebug(colliderSet, position);
 
    console.log(linesIntersect(line1, line2));
  });*/

