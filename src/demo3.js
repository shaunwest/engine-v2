import { getElementById, write } from './demo-helpers';
import { loadGameImageSet } from './game-image/game-image-loader.js';
import { createGameImageSet } from './game-image/game-image.js';
import { createGameAnimationSet } from './animation/game-animation-set.js';
import { createFixedLayout2d } from './layout-2d/fixed-layout-2d.js';
import { createTimer, getInitialTimerState } from './timer.js';
import { create2dRenderer, createTileRenderer } from './render';

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

const tileSetConfig = ['brick', 'question'];
const timerState = getInitialTimerState();
const timer = createTimer(timerState);
const tileLayout = createFixedLayout2d([0, 0, 0, 0, 0, 1, 1, 1, 1, 0], 5, tileSetConfig);
const render2d = create2dRenderer(getElementById('fixed2d'));

loadGameImageSet('/data/tile-game-images.json')
  .then(
    gameImageSetConfig => {
      const tileSize = 16;
      const startPosition = { x: 8, y: 0 };
      const tileClipRange = { x: 0, y: 0, width: 4, height: 2 };
      const gameImageSet = createGameImageSet(gameImageSetConfig);
      const gameAnimationSet = createGameAnimationSet(animationSetConfig, gameImageSet);
      const renderTiles = createTileRenderer(render2d, gameAnimationSet, tileSize);

      timer(() =>
        write(getElementById('fps'), timerState.fps));

      tileClipRange.x = Math.floor(startPosition.x / tileSize);
      tileClipRange.y = Math.floor(startPosition.y / tileSize);

      timer(frameCount => {
        const tiles = tileLayout(tileClipRange);
        renderTiles(tiles, startPosition, frameCount);
      });
    },
    error => console.log('Error:', error)
  );
