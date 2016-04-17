import { getElementById, render } from './demo-helpers';
import { loadGameImageSet } from './game-image/game-image-loader.js';
import { createGameImageSet } from './game-image/game-image.js';
import { createGameAnimationSet, createFrameTable } from './animation/game-animation-set.js';
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

loadGameImageSet('/data/tile-game-images.json')
  .then(
    gameImageSetConfig => {
      const gameImageSet = createGameImageSet(gameImageSetConfig);

      render(getElementById('brick'), gameImageSet('brick')('default', 0));
      render(getElementById('question'), gameImageSet('question')('default', 0));

      const gameAnimationSet = createGameAnimationSet(animationSetConfig, gameImageSet);
      const frameTable = createFrameTable(gameAnimationSet);

      timer(frameCount =>
        render(getElementById('questionAnimation2'), frameTable(frameCount).question));
    },
    error => console.log('Error:', error)
  );