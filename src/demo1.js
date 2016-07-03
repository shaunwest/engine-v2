import { getElementById, render } from './demo-helpers';
import { createTimer, getInitialTimerState } from './util/timer.js';
import { loadImshaConfig } from './imsha/imsha-loader';
import { createImshaFromConfig } from './imsha/imsha';
import { createWaitCycleAnimation } from './animation/wait-cycle-animation';
import { createBasicAnimation } from './animation/basic-animation';

// TODO: check if the cache is working

const timerState = getInitialTimerState();
const timer = createTimer(timerState);

loadImshaConfig('/data/mario-imsha.json')
  .then(imshaConfig => createImshaFromConfig(imshaConfig))
  .then(imsha => getElementById('marioAsset').appendChild(imsha('idle', 0))); 

loadImshaConfig('/data/question-imsha.json')
  .then(imshaConfig => createImshaFromConfig(imshaConfig))
  .then(imsha => {
    const basicAnimation = createBasicAnimation(
      imsha,
      8, 
      60
    );

    timer(frameCount =>
      render(getElementById('questionAnimation'), basicAnimation(frameCount)));
  });

const brickAnimationConfig = {
  "description": "brick animation",
  "imsha": "brickImsha",
  "type": "waitThenCycle",
  "frameSet": {
    "cycle": { "fps": 8, "every": 60 }
  }
};

loadImshaConfig('/data/brick-imsha.json')
  .then(imshaConfig => createImshaFromConfig(imshaConfig))
  .then(imsha => {
    const cycleAnimation = createWaitCycleAnimation(
      imsha,
      brickAnimationConfig.frameSet.cycle.fps, 
      brickAnimationConfig.frameSet.cycle.every,
      60
    );

    timer(frameCount =>
      render(getElementById('brickAnimation'), cycleAnimation(frameCount)));
  });
