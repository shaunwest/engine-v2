import { createBasicAnimation } from './basic-animation.js';
import { createWaitCycleAnimation } from './wait-cycle-animation.js';

// gameAnimationSetConfig, sheetAssetSet -> gameAnimationSet
export const createGameAnimationSet = (gameAnimationSetConfig, sheetAssetSet) => {
  const gameAnimationSet = Object.keys(gameAnimationSetConfig).reduce((gameAnimationSet, configId) => {
    const gameAnimationConfig = gameAnimationSetConfig[configId];
    const { sheetAsset, type, frameSet } = gameAnimationConfig;

    switch(type) {
      case 'waitThenCycle':
        gameAnimationSet[configId] = createWaitCycleAnimation(
          sheetAssetSet(sheetAsset),
          frameSet.cycle.fps,
          frameSet.cycle.every,
          60
        );
        break;
      default:
        gameAnimationSet[configId] = createBasicAnimation(
          sheetAssetSet(sheetAsset),
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
