import { getElementById, write } from './demo-helpers';
import { loadImshaSetConfig } from './imsha/imsha-loader.js';
import { createImshaSet } from './imsha/imsha.js';
import { createGameAnimationSet } from './animation/game-animation-set.js';
import { createTimer, getInitialTimerState } from './util/timer.js';
import { create2dRenderer, createTileRenderer } from './util/render';

const animationSetConfig = {
  "brick": {
    "description": "brick animation",
    "imsha": "brick",
    "type": "waitThenCycle",
    "frameSet": {
      "cycle": { "fps": 8, "every": 60 }
    }
  },
  "question": {
    "description": "question animation",
    "imsha": "question",
    "type": "basic",
    "frameSet": {
      "default": { "fps": 8 }
    }
  }
};

const tileMap = ['brick', 'question'];
const tileSet = {
  grid: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
  rowLength: 5,
  start: { col: 0, row: 0 }
};
const timerState = getInitialTimerState();
const timer = createTimer(timerState);
const render2d = create2dRenderer(getElementById('fixed2d'));

loadImshaSetConfig('/data/tile-imshas.json')
  .then(
    imshaSetConfig => {
      const tileSize = 16;
      const startPosition = { x: 0, y: 0 };
      const tileClipRange = { x: 0, y: 0, width: 4, height: 2 };
      const imshaSet = createImshaSet(imshaSetConfig);
      const gameAnimationSet = createGameAnimationSet(animationSetConfig, imshaSet);
      const renderTiles = createTileRenderer(render2d, gameAnimationSet, tileSize, tileMap);

      timer(() =>
        write(getElementById('fps'), timerState.fps));

      tileClipRange.x = Math.floor(startPosition.x / tileSize);
      tileClipRange.y = Math.floor(startPosition.y / tileSize);

      timer(frameCount => renderTiles(tileSet, startPosition, frameCount));
    },
    error => console.log('Error:', error)
  );
