import { getElementById } from './demo-helpers';
import { loadGameImageSet } from './game-image/game-image-loader.js';
import { createGameImageSet } from './game-image/game-image.js';
//import { createFreeLayout2d } from './layout-2d/free-layout-2d.js';
import { create2dRenderer, createSpriteRenderer } from './render';
import { sequence } from './func.js';
import { initGameObjectSet } from './game-object/game-object';
import { slice } from './game-object/game-object.js';

const spriteTypeSet = {
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
    },
    "currentAnimation": "idle"
  }
};

const layoutConfig = [{ id: "mario", x: 10, y: 10}, { id: "mario", x: 50, y: 75 }];

const render2d = create2dRenderer(getElementById('free2d'));

loadGameImageSet('/data/sprite-game-images.json')
  .then(
    gameImageSetConfig => {
      const startPosition = { x: 10, y: 0 };
      const activeRange = { x: 0, y: 0, width: 100, height: 100 };
      const clipRange = { x: 0, y: 0, width: 64, height: 64 };
      const gameImageSet = createGameImageSet(gameImageSetConfig);
      //const freeLayout2d = createFreeLayout2d(layoutConfig, spriteSetConfig);
      const renderSprites = createSpriteRenderer(render2d, gameImageSet);
      //const sprites = freeLayout2d(activeRange);
      const sprites = initGameObjectSet(layoutConfig, spriteTypeSet)

      const activeSprites = slice(sprites, clipRange);
      renderSprites(activeSprites, startPosition);
    },
    error => console.log('Error:', error)
  );
