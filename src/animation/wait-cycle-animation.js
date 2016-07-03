// TODO: could be renamed to createPeriodicAnimation

import { getFrameDeviation, getFrame } from './animation';

const waitThenCycle = (imsha, fps, every, targetFps, frameCount) => {
  const frameDeviation = getFrameDeviation(targetFps, fps || targetFps)
  const cycleFrameIndex = Math.floor((frameCount % every) / frameDeviation);
  return (cycleFrameIndex < imsha('cycle').length) ?
    imsha('cycle', cycleFrameIndex) :
    getFrame(imsha('default'), frameDeviation, frameCount);
}

export const createWaitCycleAnimation = (imsha, fps, every, targetFps) => frameCount =>
  waitThenCycle(imsha, fps, every, targetFps, frameCount);
