import { getFrameSet } from '../web-image/image-sheet-processor'; 

// performs an operation, stores result to key, returns object
const save = (obj, key, fn) => {
  obj[key] = fn();
  return obj;
}

// frameSetConfig -> frameSet, frameSetId -> frameSet
const saveFrameSet = (imageSheet, width, height, frameSetConfig) => (frameSet, frameSetId) => {
  const framesConfig = frameSetConfig[frameSetId];

  return save(frameSet, frameSetId, () =>
    getFrameSet(
      imageSheet,
      framesConfig.x,
      framesConfig.y,
      width,
      height,
      framesConfig.xRange
    )
  );
}

const getFrame = (frameSet, frameSetId, frameIndex) => {
  if (!frameSet[frameSetId]) throw `The provided frame set id '${ frameSetId }' was not found in this frame set`;
  return (typeof frameIndex !== 'undefined') ?
    frameSet[frameSetId][frameIndex] :
    frameSet[frameSetId];
}

// imageSheet, width, height, frameSetConfig -> gameImage
export const createGameImage = (imageSheet, width, height, frameSetConfig) => {
  const frameSet = Object.keys(frameSetConfig)
    .reduce(saveFrameSet(imageSheet, width, height, frameSetConfig), {});

  return (frameSetId, frameIndex) =>
    getFrame(frameSet, frameSetId, frameIndex);
}

export const createGameImageFromConfig = gameImageConfig =>
  createGameImage(
    gameImageConfig.src.image,
    gameImageConfig.width,
    gameImageConfig.height,
    gameImageConfig.frameSet
  );

// Object -> gameImageSet
export const createGameImageSet = gameImageSetConfig => {
  const gameImageSet = Object.keys(gameImageSetConfig).reduce((gameImageSet, configId) => {
    gameImageSet[configId] = createGameImageFromConfig(gameImageSetConfig[configId]);
    return gameImageSet;
  }, {});

  return (gameImageId) => {
    if (typeof gameImageId === 'undefined')
      return gameImageSet;
    else if (gameImageSet[gameImageId])
      return gameImageSet[gameImageId];
    else
      throw `The provided game image id '${ gameImageId }' was not found in this game image set`;
  }
}
