import { getElementById } from './demo-helpers';
import { loadImshaSetConfig } from './imsha/imsha-loader.js';
import { createImshaSet } from './imsha/imsha.js';
//import { createFreeLayout2d } from './layout-2d/free-layout-2d.js';
import { create2dRenderer, createSpriteRenderer } from './util/render';
import { sequence } from './util/func';
import { createGameObjectSet } from './game-object/game-object';
import { slice } from './game-object/game-object.js';

const spriteTypeSet = {
  "mario": {
    "description": "mario sprite",
    "imsha": "mario",
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

const layoutConfig = [{ type: "mario", x: 10, y: 10}, { type: "mario", x: 50, y: 75 }];

const render2d = create2dRenderer(getElementById('free2d'));

loadImshaSetConfig('/data/sprite-imshas.json')
  .then(
    imshaSetConfig => {
      const startPosition = { x: 10, y: 0 };
      const activeRange = { x: 0, y: 0, width: 100, height: 100 };
      const clipRange = { x: 0, y: 0, width: 64, height: 64 };
      const imshaSet = createImshaSet(imshaSetConfig);
      //const freeLayout2d = createFreeLayout2d(layoutConfig, spriteSetConfig);
      const renderSprites = createSpriteRenderer(render2d, imshaSet);
      //const sprites = freeLayout2d(activeRange);
      const sprites = createGameObjectSet(layoutConfig, spriteTypeSet);
      console.log(sprites);
      const activeSprites = slice(sprites, clipRange);
      renderSprites(activeSprites, startPosition);
    },
    error => console.log('Error:', error)
  );
