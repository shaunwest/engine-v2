import { getElementById } from './demo-helpers';
import { loadSheetAssetSetConfig } from './sheet-asset/sheet-asset-loader.js';
import { createSheetAssetSet } from './sheet-asset/sheet-asset.js';
import { createGameAnimationSet } from './animation/game-animation-set.js';
import { createTimer, getInitialTimerState } from './util/timer';
import { create2dClearer, create2dRenderer, createSpriteRenderer, createTileRenderer } from './util/render';
import { rectContainsPoint } from 'base-utils/geom';
import { forEach, switchCase, sequence } from './util/func.js';
import { slice, sliceTileSet, createGameObjectSet } from './game-object/game-object';

const animationSetConfig = {
  "brick": {
    "description": "brick animation",
    "sheetAsset": "brick",
    "type": "waitThenCycle",
    "frameSet": {
      "cycle": { "fps": 8, "every": 60 }
    }
  },
  "question": {
    "description": "question animation",
    "sheetAsset": "question",
    "type": "basic",
    "frameSet": {
      "default": { "fps": 8 }
    }
  }
};

const spriteTypeSet = {
  "mario": {
    "description": "mario sprite",
    "sheetAsset": "mario",
    "ai": {
      "type": "basic" 
    },
    "bounds": {
      "left": 5,
      "top": 10,
      "right": 5,
      "bottom": 0
    },
    "physics": {
      "velocity": {
        "x": 0,
        "y": 0
      },
      "maxVelocity": {
        "x": 1,
        "y": 0
      },
      "acceleration": {
        "x": 10,
        "y": 10
      },
      "friction": { 
        "x": 1,
        "y": 1
      }
    },
    "currentAnimation": "idle"
  }
};

const tileMap = ['brick', 'question'];

const spriteSetConfig = [
  { "type": "mario", "x": 10, "y": 10 }
];

const tileSet = {
  "grid": [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
  "rowLength": 5,
  "start": { col: 0, row: 0 }
};

const canvas = getElementById('fixedAndFree2d');
const render2d = create2dRenderer(canvas);
const clear2d = create2dClearer(canvas);

const applyFriction = (friction, velocity, fpsDeviation) => 
  velocity * Math.pow(1 - friction, fpsDeviation);

const halt = (haltTarget, velocity) =>
  (Math.abs(velocity) < haltTarget) ? 0 : velocity;

const clampVelocity = (maxVelocity, velocity) =>
  (velocity > 0) ?
    Math.min(velocity, maxVelocity) :
    Math.max(velocity, -maxVelocity);

const getAcceleration = (acceleration, velocity, fpsDeviation) =>
  velocity + (acceleration * fpsDeviation);

const getVelocity = (velocity, acceleration, friction, maxVelocity, fpsDeviation) => {
  let newVelocity = halt(1, velocity);
  newVelocity = getAcceleration(acceleration, newVelocity, fpsDeviation);
  //newVelocity = applyFriction(friction, newVelocity, fpsDeviation);
  newVelocity = clampVelocity(maxVelocity, newVelocity);
  return newVelocity;
}

const _applyVelocity = (sprites, fpsDeviation) => {
  for (const sprite of sprites) {
    const p = sprite.physics;
    p.velocity.x = getVelocity(p.velocity.x, p.acceleration.x, p.friction.x, p.maxVelocity.x, fpsDeviation);
    p.velocity.y = getVelocity(p.velocity.y, p.acceleration.y, p.friction.y, p.maxVelocity.y, fpsDeviation);
  }
}

const _applyPosition = (sprites, fpsDeviation) => {
  for (const sprite of sprites) {
    sprite.x += Math.round(sprite.physics.velocity.x * fpsDeviation);
    sprite.y += Math.round(sprite.physics.velocity.y * fpsDeviation);
  }
}

const updatePlayer = () => {
}

const updateView = () => {
}

const updateSprites = (spriteSet, view, fpsDeviation) => {
  const activeSprites = slice(spriteSet, view.activeRange);

  _applyVelocity(activeSprites, fpsDeviation);
  _applyPosition(activeSprites, fpsDeviation);

  return activeSprites;
}

const updateTiles = (tileSet, tileSize, view) => {
  const sliceRegion = {
    x: Math.floor(view.clipRange.x / tileSize),
    y: Math.floor(view.clipRange.y / tileSize),
    width: Math.floor(view.clipRange.width / tileSize),
    height: Math.floor(view.clipRange.height / tileSize)
  };
  return sliceTileSet(tileSet, sliceRegion); // to avoid using an object, pass in 4 args
}

// ...
// denote functions with side-effects somehow (underscore?)
// cannot use anonymous functions in loops
// functional programming in JS just doesn't really work with games

loadSheetAssetSetConfig('/data/all-sheet-assets.json')
  .then(sheetAssetSetConfig => {
    const tileSize = 16;
    const view = {
      activeRange: { x: 0, y: 0, width: 100, height: 100 },
      clipRange: { x: 0, y: 0, width: 64, height: 32 }
    };
    const sheetAssetSet = createSheetAssetSet(sheetAssetSetConfig);
    const gameAnimationSet = createGameAnimationSet(animationSetConfig, sheetAssetSet);
    const timer = createTimer(getInitialTimerState());
    const spriteSet = createGameObjectSet(spriteSetConfig, spriteTypeSet);
    const renderTiles = createTileRenderer(render2d, gameAnimationSet, tileSize, tileMap);
    const renderSprites = createSpriteRenderer(render2d, sheetAssetSet);
    
    timer((frameCount, fpsDeviation) => {
      // updates
      updatePlayer();
      updateView(view);
      const visibleTileSet = updateTiles(tileSet, tileSize, view);
      const activeSprites = updateSprites(spriteSet, view, fpsDeviation);
      
      // render 
      clear2d();
      renderTiles(visibleTileSet, view.clipRange, frameCount);
      const visibleSprites = slice(activeSprites, view.clipRange);
      renderSprites(visibleSprites, view.clipRange);
    });
  });
