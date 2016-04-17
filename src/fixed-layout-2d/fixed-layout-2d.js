
// Array, Int, Array -> Int, Int -> *
export const createFixedLayout2d = (layout, rowLength, idMap) => {
  return (col, row) => {
    return idMap[layout[(row * rowLength) + col]];
  }
}

// Object, Function -> undefined
export const range2d = (viewport, cb) => {
  const maxCol = viewport.x + viewport.width;
  const maxRow = viewport.y + viewport.height;

  for (let col = viewport.x; col < maxCol; col++) {
    for (let row = viewport.y; row < maxRow; row++) {
      cb(col, row);
    }
  }
}

// Canvas -> Int, Int, Int, Array -> undefined
export const createFixed2dRenderer = canvas => {
  const context = canvas.getContext('2d');
  return (image, x, y) => {
    if (image) {
      context.drawImage(image, x, y);
    }
  }
}

/*
export const createFixed2dRenderer = canvas => {
  const context = canvas.getContext('2d');
  return (frameId, x, y, frameTable) => {
    if (frameId) {
      const frame = frameTable[frameId];
      if (frame) {
        context.drawImage(frame, x, y);
      }
    }
  }
}
*/
