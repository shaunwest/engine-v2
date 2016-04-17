import { getElementById, write } from './demo-helpers';
import { loadGameImageSet } from './game-image/game-image-loader.js';
import { createGameImageSet } from './game-image/game-image.js';
import { createGameAnimationSet, createFrameTable } from './animation/game-animation-set.js';
import { createFixed2dRenderer, range2d, createFixedLayout2d } from './fixed-layout-2d/fixed-layout-2d.js';
import { createTimer, getInitialTimerState } from './timer.js';

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
const tileSize = 16;
const timerState = getInitialTimerState();
const timer = createTimer(timerState);
const start = { x: 8, y: 0 };
const viewport = { x: 0, y: 0, width: 4, height: 2 };
const demoLayout = createFixedLayout2d([0, 0, 0, 0, 0, 1, 1, 1, 1, 0], 5, tileSetConfig);

loadGameImageSet('/data/tile-game-images.json')
  .then(
    gameImageSetConfig => {
      const gameImageSet = createGameImageSet(gameImageSetConfig);
      const gameAnimationSet = createGameAnimationSet(animationSetConfig, gameImageSet);
      //const frameTable = createFrameTable(gameAnimationSet);

      timer(() =>
        write(getElementById('fps'), timerState.fps));

      viewport.x = Math.floor(start.x / tileSize);
      viewport.y = Math.floor(start.y / tileSize);

      const renderFixed2d = createFixed2dRenderer(getElementById('fixed2d'));

      /*
      timer(frameCount =>
        range2d(viewport, (col, row) => 
          renderFixed2d(
            demoLayout(col, row),
            (col * tileSize) - start.x,
            (row * tileSize) - start.y,
            frameTable(frameCount))));*/

      timer(frameCount =>
        range2d(viewport, (col, row) => 
          renderFixed2d(
            gameAnimationSet(demoLayout(col, row), frameCount),
            (col * tileSize) - start.x,
            (row * tileSize) - start.y)));
    },
    error => console.log('Error:', error)
  );
