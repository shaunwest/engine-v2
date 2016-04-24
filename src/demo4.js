import { getElementById } from './demo-helpers';
import { loadGameImageSet } from './game-image/game-image-loader.js';
import { createGameImageSet } from './game-image/game-image.js';
import { createTimer, getInitialTimerState } from './timer.js';
import { createFreeLayout2d } from './layout-2d/free-layout-2d.js';
//import { createSpriteSet } from './sprite/game-sprite-set.js';
import { create2dRenderer } from './render';
import { rectContainsPoint } from 'base-utils/geom';

const spriteSetConfig = {
  "mario": {
    "description": "mario sprite",
    "gameImage": "mario",
    "ai": {
      "type": "basic" 
    },
    "bounds": {
      "left": "5",
      "top": "10",
      "right": "5",
      "bottom": 0
    },
    "physics": {
      "maxVelocity": 10,
      "acceleration": 5
    }
  }
};

const timerState = getInitialTimerState();
const timer = createTimer(timerState);
//const segmentsRange = { x: 0, y: 0, width: 2, height: 2 };

const layoutConfig = [{ id: "mario", x: 10, y: 10}, { id: "mario", x: 50, y: 75 }];

const forEach = (collection, fn) => {
  if (!collection) return;
  for (const val of collection) {
    fn(val);
  }
}

const sequence = (collection, ...fns) => {
  for (let fn of fns) {
    collection = fn(collection);
  }
  return collection;
}

const render2d = create2dRenderer(getElementById('free2d'));

const createSpriteRenderer = gameImageSet => start => sprites => 
  forEach(sprites, sprite => render2d(
    gameImageSet(sprite.id)('idle', 0),
    sprite.x - start.x,
    sprite.y - start.y
  ));

const clip = clipRange => sprites => {
  const newSprites = []; // TODO: use pooling
  for (let sprite of sprites) {
    if (rectContainsPoint(sprite, clipRange)) {
      newSprites.push(sprite);
    } 
  }

  return newSprites;
}

loadGameImageSet('/data/sprite-game-images.json')
  .then(
    gameImageSetConfig => {
      const start = { x: 0, y: 0 };
      const activeRange = { x: 0, y: 0, width: 100, height: 100 };
      const clipRange = { x: 0, y: 0, width: 64, height: 64 };
      const gameImageSet = createGameImageSet(gameImageSetConfig);
      const freeLayout2d = createFreeLayout2d(layoutConfig, spriteSetConfig);
      const renderSprites = createSpriteRenderer(gameImageSet);

      timer(frameCount =>
        sequence(freeLayout2d(activeRange), clip(clipRange), renderSprites(start)));
    },
    error => console.log('Error:', error)
  );
