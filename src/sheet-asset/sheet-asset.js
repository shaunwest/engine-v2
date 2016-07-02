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
export const createSheetAsset = (imageSheet, width, height, frameSetConfig) => {
  const frameSet = Object.keys(frameSetConfig)
    .reduce(saveFrameSet(imageSheet, width, height, frameSetConfig), {});

  return (frameSetId, frameIndex) =>
    getFrame(frameSet, frameSetId, frameIndex);
}

// Image, Int, Int, {frames} -> String, Int -> Canvas
export const createSimpleSheetAsset = (imageSheet, width, height, framesConfig) => {
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

// Object -> sheetAsset()
export const createSheetAssetFromConfig = (sheetAssetConfig, defaults = {}) =>
  sheetAssetConfig.frameSet ?
    createSheetAsset(
      sheetAssetConfig.src.image,
      sheetAssetConfig.width || defaults.width,
      sheetAssetConfig.height || defaults.height,
      sheetAssetConfig.frameSet
    ) :
    createSimpleSheetAsset(
      sheetAssetConfig.src.image,
      sheetAssetConfig.width || defaults.width,
      sheetAssetConfig.height || defaults.height,
      sheetAssetConfig.frames
    );

// Object -> String | undefined -> sheetAsset() | {sheetAsset()}
export const createSheetAssetSet = (sheetAssetSetConfig, defaults = {})  => {
  const sheetAssetSet = Object.keys(sheetAssetSetConfig).reduce((sheetAssetSet, configId) => {
    sheetAssetSet[configId] = createSheetAssetFromConfig(sheetAssetSetConfig[configId], defaults);
    return sheetAssetSet;
  }, {});

  return (sheetAssetId) => {
    if (typeof sheetAssetId === 'undefined')
      return sheetAssetSet;
    else if (sheetAssetSet[sheetAssetId])
      return sheetAssetSet[sheetAssetId];
    else
      throw `The provided game image id '${ sheetAssetId }' was not found in this game image set`;
  }
}
