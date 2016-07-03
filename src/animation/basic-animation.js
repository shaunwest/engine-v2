import { getFrame, getFrameDeviation } from './animation.js';

export const createBasicAnimation = (imsha, fps, targetFps) => frameCount =>
  getFrame(imsha('default'), getFrameDeviation(targetFps, fps || targetFps), frameCount);
