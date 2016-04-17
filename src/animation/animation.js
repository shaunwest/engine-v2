
// Deviation from target frame rate. 
// i.e. Target actual frames per animation frame
// e.g. targetFps: 60, animationFps: 10 = frameDeviation: 6
// Int, Int -> Number
export const getFrameDeviation = (targetFps, animationFps) => targetFps / animationFps;

// Array, Number, Int -> Canvas
export const getFrame = (frames, frameDeviation, frameCount) =>
  (!frames || !frames.length) ?
    null :
    frames[getFrameIndex(frames.length, frameDeviation, frameCount)];

// Frame rate is slowed (or sped up) depending
// on the deviation from the target frame rate
// Int, Number -> Int
export const adjustedFrameCount = (frameCount, frameDeviation) => Math.floor(frameCount / frameDeviation);

// Int, Number, Int -> Int
export const getFrameIndex = (framesLength, frameDeviation, frameCount) =>
  adjustedFrameCount(frameCount, frameDeviation) % framesLength || 0;
