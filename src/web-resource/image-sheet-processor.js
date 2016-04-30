export function getFrameSet(imageSheet, x, y, width, height, xRange = 1, noDraw = false) {
  const rangeEnd = x + (width * xRange),
    frameSet = [];

  for (let i = x; i < rangeEnd; i+=width) {
    frameSet.push(getFrame(imageSheet, i, y, width, height, noDraw));
  }

  return frameSet;
}

export function getFrame(imageSheet, x, y, width, height, noDraw = false) {
  const canvas = document.createElement('canvas');
  canvas.width  = width;
  canvas.height = height;

  if (noDraw) return canvas;

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
