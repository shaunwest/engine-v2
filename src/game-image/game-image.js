import { getFrameSet } from '../web-image/image-sheet-processor'; 

// jsdom seems to have a problem drawing images to canvas. 
// When test mode is active, getFrameSet() will not draw frames
// to canvas. Instead a blank canvas is returned.
let testMode = false;

// performs an operation, stores result to key, returns object
const save = (obj, key, fn) => {
  obj[key] = fn();
  return obj;
}

// Boolean -> Boolean
export const setTestMode = active => testMode = active;

// Image, Int, Int, Object -> Object, String -> Object
const saveFrameSet = (imageSheet, width, height, frameSetConfig) =>
  (frameSet, frameSetId) => {
    const framesConfig = frameSetConfig[frameSetId];

    return save(frameSet, frameSetId, () =>
      getFrameSet(
        imageSheet,
        framesConfig.x,
        framesConfig.y,
        width,
        height,
        framesConfig.xRange,
        testMode
      )
    );
  }

// Object, String, Int -> Canvas | [Canvas]
const getFrame = (frameSet, frameSetId, frameIndex) => {
  if (!frameSet[frameSetId]) throw `The provided frame set id '${ frameSetId }' was not found in this frame set`;
  return (typeof frameIndex !== 'undefined') ?
    frameSet[frameSetId][frameIndex] :
    frameSet[frameSetId];
}

// Image, Int, Int, {frameSetConfig} -> String, Int -> Canvas
export const createGameImage = (imageSheet, width, height, frameSetConfig) => {
  const frameSet = Object.keys(frameSetConfig)
    .reduce(saveFrameSet(imageSheet, width, height, frameSetConfig), {});

  return (frameSetId, frameIndex) =>
    getFrame(frameSet, frameSetId, frameIndex);
}

// Object -> gameImage()
export const createGameImageFromConfig = gameImageConfig =>
  createGameImage(
    gameImageConfig.src.image,
    gameImageConfig.width,
    gameImageConfig.height,
    gameImageConfig.frameSet
  );

// Object -> String | undefined -> gameImage() | {gameImage()}
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
