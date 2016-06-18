// TODO: could be renamed to createPeriodicAnimation

import { getFrameDeviation, getFrame } from './animation';

const waitThenCycle = (sheetAsset, fps, every, targetFps, frameCount) => {
  const frameDeviation = getFrameDeviation(targetFps, fps || targetFps)
  const cycleFrameIndex = Math.floor((frameCount % every) / frameDeviation);
  return (cycleFrameIndex < sheetAsset('cycle').length) ?
    sheetAsset('cycle', cycleFrameIndex) :
    getFrame(sheetAsset('default'), frameDeviation, frameCount);
}

export const createWaitCycleAnimation = (sheetAsset, fps, every, targetFps) => frameCount =>
  waitThenCycle(sheetAsset, fps, every, targetFps, frameCount);
