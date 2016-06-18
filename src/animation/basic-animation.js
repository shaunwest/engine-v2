import { getFrame, getFrameDeviation } from './animation.js';

export const createBasicAnimation = (sheetAsset, fps, targetFps) => frameCount =>
  getFrame(sheetAsset('default'), getFrameDeviation(targetFps, fps || targetFps), frameCount);
