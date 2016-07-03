import { getFrameSet } from '../web-resource/image-sheet-processor'; 

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
  //if (!frameSet[frameSetId]) throw `The provided frame set id '${ frameSetId }' was not found in this frame set`;
  return (typeof frameIndex !== 'undefined') ?
    frameSet[frameSetId][frameIndex] :
    frameSet[frameSetId];
}

// Image, Int, Int, {frameSetConfig} -> String, Int -> Canvas
export const createImsha = (imageSheet, width, height, frameSetConfig) => {
  const frameSet = Object.keys(frameSetConfig)
    .reduce(saveFrameSet(imageSheet, width, height, frameSetConfig), {});

  return (frameSetId, frameIndex) =>
    getFrame(frameSet, frameSetId, frameIndex);
}

// Image, Int, Int, {frames} -> String, Int -> Canvas
export const createSimpleImsha = (imageSheet, width, height, framesConfig) => {
  const frameSet = save({}, 'default', () =>
    getFrameSet(
      imageSheet,
      framesConfig.x,
      framesConfig.y,
      width,
      height,
      framesConfig.xRange,
      testMode
    ));

  return (frameSetId, frameIndex) =>
    getFrame(frameSet, frameSetId, frameIndex);
}

// Object -> imsha()
export const createImshaFromConfig = (imshaConfig, defaults = {}) =>
  imshaConfig.frameSet ?
    createImsha(
      imshaConfig.src.image,
      imshaConfig.width || defaults.width,
      imshaConfig.height || defaults.height,
      imshaConfig.frameSet
    ) :
    createSimpleImsha(
      imshaConfig.src.image,
      imshaConfig.width || defaults.width,
      imshaConfig.height || defaults.height,
      imshaConfig.frames
    );

// Object -> String | undefined -> imsha() | {imsha()}
export const createImshaSet = (imshaSetConfig, defaults = {})  => {
  const imshaSet = Object.keys(imshaSetConfig).reduce((imshaSet, configId) => {
    imshaSet[configId] = createImshaFromConfig(imshaSetConfig[configId], defaults);
    return imshaSet;
  }, {});

  return (imshaId) => {
    if (typeof imshaId === 'undefined')
      return imshaSet;
    else if (imshaSet[imshaId])
      return imshaSet[imshaId];
    else
      throw `The provided game image id '${ imshaId }' was not found in this game image set`;
  }
}
