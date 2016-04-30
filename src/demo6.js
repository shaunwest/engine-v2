import { create2dRenderer } from './render';
import { createSpriteLayer } from './layer/sprite-layer';
import { getElementById } from './demo-helpers';

const canvas = getElementById('spriteLayer');
const render2d = create2dRenderer(canvas);

// meh...
createSpriteLayer(
  '/data/sprite-layer.json',
  (gameImageSet) => createSpriteRenderer(render2d, gameImageSet),
  (sprites, fpsDeviation) => {

  }
);
