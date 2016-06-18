import { getElementById, render } from './demo-helpers';
import { createTimer, getInitialTimerState } from './util/timer.js';
import { loadSheetAssetConfig } from './sheet-asset/sheet-asset-loader';
import { createSheetAssetFromConfig } from './sheet-asset/sheet-asset';
import { createWaitCycleAnimation } from './animation/wait-cycle-animation';
import { createBasicAnimation } from './animation/basic-animation';

// TODO: check if the cache is working

const timerState = getInitialTimerState();
const timer = createTimer(timerState);

loadSheetAssetConfig('/data/mario-sheet-asset.json')
  .then(sheetAssetConfig => createSheetAssetFromConfig(sheetAssetConfig))
  .then(sheetAsset => getElementById('marioSheetAsset').appendChild(sheetAsset('idle', 0))); 

loadSheetAssetConfig('/data/question-sheet-asset.json')
  .then(sheetAssetConfig => createSheetAssetFromConfig(sheetAssetConfig))
  .then(sheetAsset => {
    const basicAnimation = createBasicAnimation(
      sheetAsset,
      8, 
      60
    );

    timer(frameCount =>
      render(getElementById('questionAnimation'), basicAnimation(frameCount)));
  });

const brickAnimationConfig = {
  "description": "brick animation",
  "sheetAsset": "brickSheetAsset",
  "type": "waitThenCycle",
  "frameSet": {
    "cycle": { "fps": 8, "every": 60 }
  }
};

loadSheetAssetConfig('/data/brick-sheet-asset.json')
  .then(sheetAssetConfig => createSheetAssetFromConfig(sheetAssetConfig))
  .then(sheetAsset => {
    const cycleAnimation = createWaitCycleAnimation(
      sheetAsset,
      brickAnimationConfig.frameSet.cycle.fps, 
      brickAnimationConfig.frameSet.cycle.every,
      60
    );

    timer(frameCount =>
      render(getElementById('brickAnimation'), cycleAnimation(frameCount)));
  });
