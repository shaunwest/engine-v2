import { getElementById, render } from './demo-helpers';
import { loadSheetAssetSetConfig } from './sheet-asset/sheet-asset-loader.js';
import { createSheetAssetSet } from './sheet-asset/sheet-asset.js';
import { createGameAnimationSet } from './animation/game-animation-set.js';
import { createTimer, getInitialTimerState } from './util/timer.js';

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

const timerState = getInitialTimerState();
const timer = createTimer(timerState);

loadSheetAssetSetConfig('/data/tile-sheet-assets.json')
  .then(
    sheetAssetSetConfig => {
      const sheetAssetSet = createSheetAssetSet(sheetAssetSetConfig);

      render(getElementById('brick'), sheetAssetSet('brick')('default', 0));
      render(getElementById('question'), sheetAssetSet('question')('default', 0));

      const gameAnimationSet = createGameAnimationSet(animationSetConfig, sheetAssetSet);

      timer(frameCount =>
        render(getElementById('questionAnimation2'), gameAnimationSet('question', frameCount)));
    },
    error => console.log('Error:', error)
  );
