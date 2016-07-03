import { getElementById, render } from './demo-helpers';
import { loadImshaSetConfig } from './imsha/imsha-loader.js';
import { createImshaSet } from './imsha/imsha.js';
import { createGameAnimationSet } from './animation/game-animation-set.js';
import { createTimer, getInitialTimerState } from './util/timer.js';

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

const timerState = getInitialTimerState();
const timer = createTimer(timerState);

loadImshaSetConfig('/data/tile-imshas.json')
  .then(
    imshaSetConfig => {
      const imshaSet = createImshaSet(imshaSetConfig);

      render(getElementById('brick'), imshaSet('brick')('default', 0));
      render(getElementById('question'), imshaSet('question')('default', 0));

      const gameAnimationSet = createGameAnimationSet(animationSetConfig, imshaSet);

      timer(frameCount =>
        render(getElementById('questionAnimation2'), gameAnimationSet('question', frameCount)));
    },
    error => console.log('Error:', error)
  );
