import { createBasicAnimation } from './basic-animation.js';
import { createWaitCycleAnimation } from './wait-cycle-animation.js';

// gameAnimationSetConfig, imshaSet -> gameAnimationSet
export const createGameAnimationSet = (gameAnimationSetConfig, imshaSet) => {
  const gameAnimationSet = Object.keys(gameAnimationSetConfig).reduce((gameAnimationSet, configId) => {
    const gameAnimationConfig = gameAnimationSetConfig[configId];
    const { imsha, type, frameSet } = gameAnimationConfig;

    switch(type) {
      case 'waitThenCycle':
        gameAnimationSet[configId] = createWaitCycleAnimation(
          imshaSet(imsha),
          frameSet.cycle.fps,
          frameSet.cycle.every,
          60
        );
        break;
      default:
        gameAnimationSet[configId] = createBasicAnimation(
          imshaSet(imsha),
          frameSet.default.fps,
          60
        );
        break;
    }
    return gameAnimationSet;
  }, {});

  return (gameAnimationId, frameCount) => {
    if (typeof gameAnimationId === 'undefined') return gameAnimationSet;

    const gameAnimation = gameAnimationSet[gameAnimationId];

    if (!gameAnimation) throw `Game animation '${ gameAnimationId }' was not found`;

    return (typeof frameCount === 'undefined') ? gameAnimation : gameAnimation(frameCount);
  };
}
