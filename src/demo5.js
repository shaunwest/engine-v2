import { getElementById } from './demo-helpers';
import { loadGameImageSet } from './game-image/game-image-loader.js';
import { createGameImageSet } from './game-image/game-image.js';
import { createGameAnimationSet } from './animation/game-animation-set.js';
import { createFixedLayout2d } from './layout-2d/fixed-layout-2d.js';
import { createTimer, getInitialTimerState } from './timer.js';
import { create2dClearer, create2dRenderer, createSpriteRenderer, createTileRenderer } from './render';
import { createFreeLayout2d } from './layout-2d/free-layout-2d.js';
import { rectContainsPoint } from 'base-utils/geom';
import { forEach, switchCase, sequence } from './func.js';
import { clip } from './sprite.js';

const animationSetConfig = {
  "brick": {
    "description": "brick animation",
    "gameImage": "brick",
    "type": "waitThenCycle",
    "frameSet": {
      "cycle": { "fps": 8, "every": 60 }
    }
  },
  "question": {
    "description": "question animation",
    "gameImage": "question",
    "type": "basic",
    "frameSet": {
      "default": { "fps": 8 }
    }
  }
};

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

const tileSetConfig = ['brick', 'question'];

const layouts = {
  "sprites": [
    { id: "mario", x: 10, y: 10 }
  ],
  "tiles": {
    data: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    rowLength: 5
  }
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

const createSpriteLayer = (layoutConfig, gameImageSet, view) => {
  const getSprites = createFreeLayout2d(layoutConfig, spriteSetConfig);
  const renderSprites = createSpriteRenderer(render2d, gameImageSet);

  return (frameCount, fpsDeviation) => {
    const sprites = getSprites(view.activeRange);
    _applyVelocity(sprites, fpsDeviation);
    _applyPosition(sprites, fpsDeviation);

    const visibleSprites = clip(sprites, view.clipRange);
    renderSprites(visibleSprites, view.clipRange);
  }
}

const createTileLayer = (layoutConfig, gameAnimationSet, view) => {
  const tileSize = 16;
  const tileClipRange = {
    x: Math.floor(view.clipRange.x / tileSize),
    y: Math.floor(view.clipRange.y / tileSize),
    width: Math.floor(view.clipRange.width / tileSize),
    height: Math.floor(view.clipRange.height / tileSize)
  };
  const getTiles = createFixedLayout2d(layoutConfig.data, layoutConfig.rowLength, tileSetConfig);
  const renderTiles = createTileRenderer(render2d, gameAnimationSet, tileSize);

  return (frameCount, fpsDeviation) => {
    const tiles = getTiles(tileClipRange);
    renderTiles(tiles, view.clipRange, frameCount);
  }
}

// ...
// denote functions with side-effects somehow (underscore?)
// cannot use anonymous functions in loops
// functional programming in JS just doesn't really work with games

loadGameImageSet('/data/all-game-images.json')
  .then(gameImageSetConfig => {
    const view = {
      activeRange: { x: 0, y: 0, width: 100, height: 100 },
      clipRange: { x: 0, y: 0, width: 64, height: 32 }
    };
    const gameImageSet = createGameImageSet(gameImageSetConfig);
    const gameAnimationSet = createGameAnimationSet(animationSetConfig, gameImageSet);
    const timer = createTimer(getInitialTimerState());
    const layers = [
      createTileLayer(layouts.tiles, gameAnimationSet, view),
      createSpriteLayer(layouts.sprites, gameImageSet, view)
    ];

    // method without anonymous func or procedural:
    // note: do args get garbage collected?
    // note: seems like more of a pain than it's worth
    //const foo = (fn, ...args) => fn.apply(null, args);
    //timer((frameCount, fpsDeviation) => foo(layer, frameCount, fpsDeviation));

    timer((frameCount, fpsDeviation) => {
      clear2d();
      for (const layer of layers) {
        layer(frameCount, fpsDeviation);
      }
    });
  });