import { getElementById, render } from './demo-helpers';
import { createTimer, getInitialTimerState } from './util/timer.js';
import { loadGameImage } from './game-image/game-image-loader';
import { createGameImageFromConfig } from './game-image/game-image';
import { createWaitCycleAnimation } from './animation/wait-cycle-animation';
import { createBasicAnimation } from './animation/basic-animation';

// TODO: check if the cache is working

const timerState = getInitialTimerState();
const timer = createTimer(timerState);

loadGameImage('/data/mario-game-image.json')
  .then(gameImageConfig => createGameImageFromConfig(gameImageConfig))
  .then(gameImage =>
    getElementById('marioGameImage').appendChild(gameImage('idle', 0))
  ); 

loadGameImage('/data/question-game-image.json')
  .then(gameImageConfig => createGameImageFromConfig(gameImageConfig))
  .then(gameImage => {
    const basicAnimation = createBasicAnimation(
      gameImage,
      8, 
      60
    );

    timer(frameCount =>
      render(getElementById('questionAnimation'), basicAnimation(frameCount)));
  });

const brickAnimationConfig = {
  "description": "brick animation",
  "gameImage": "brickGameImage",
  "type": "waitThenCycle",
  "frameSet": {
    "cycle": { "fps": 8, "every": 60 }
  }
};

loadGameImage('/data/brick-game-image.json')
  .then(gameImageConfig => createGameImageFromConfig(gameImageConfig))
  .then(gameImage => {
    const cycleAnimation = createWaitCycleAnimation(
      gameImage,
      brickAnimationConfig.frameSet.cycle.fps, 
      brickAnimationConfig.frameSet.cycle.every,
      60
    );

    timer(frameCount =>
      render(getElementById('brickAnimation'), cycleAnimation(frameCount)));
  });
