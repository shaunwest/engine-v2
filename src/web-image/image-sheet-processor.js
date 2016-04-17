export function getFrameSet(imageSheet, x, y, width, height, xRange = 1) {
  const rangeEnd = x + (width * xRange),
    frameSet = [];

  for (let i = x; i < rangeEnd; i+=width) {
    frameSet.push(getFrame(imageSheet, i, y, width, height));
  }

  return frameSet;
}

export function getFrame(imageSheet, x, y, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width  = width;
  canvas.height = height;
  canvas
    .getContext('2d')
    .drawImage(
      imageSheet,
      x, y,
      width, height,
      0, 0,
      width, height
    );

  return canvas;
}
