// TODO: could be renamed to createPeriodicAnimation

import { getFrameDeviation, getFrame } from './animation';

const waitThenCycle = (gameImage, fps, every, targetFps, frameCount) => {
  const frameDeviation = getFrameDeviation(targetFps, fps || targetFps)
  const cycleFrameIndex = Math.floor((frameCount % every) / frameDeviation);
  return (cycleFrameIndex < gameImage('cycle').length) ?
    gameImage('cycle', cycleFrameIndex) :
    getFrame(gameImage('default'), frameDeviation, frameCount);
}

export const createWaitCycleAnimation = (gameImage, fps, every, targetFps) => frameCount =>
  waitThenCycle(gameImage, fps, every, targetFps, frameCount);
