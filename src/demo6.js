import { getElementById } from './demo-helpers';
import { getWebResource } from './web-resource/web-resource-loader.js';
import { initGameObjectSet } from './game-object/game-object.js';
import { create2dBoxRenderer, createDebugRenderer } from './render.js';

getWebResource('/data/colliders.json')
  .then(collidersConfig => {
    const canvas = getElementById('collisions');
    const position = { x: 0, y: 0 };
    const render2d = create2dBoxRenderer(canvas);
    const renderDebug = createDebugRenderer(render2d);
    const colliderSet = initGameObjectSet(collidersConfig.colliderSet, collidersConfig.colliderTypeSet);

    renderDebug(colliderSet, position);
  });
