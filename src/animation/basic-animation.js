import { getFrame, getFrameDeviation } from './animation.js';

export const createBasicAnimation = (gameImage, fps, targetFps) => frameCount =>
  getFrame(gameImage('default'), getFrameDeviation(targetFps, fps || targetFps), frameCount);
