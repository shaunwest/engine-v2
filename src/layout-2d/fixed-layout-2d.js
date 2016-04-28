
// Array, Int, Array -> Int, Int -> *
/*export const createFixedLayout2d = (layout, rowLength, idMap) => {
  return (col, row) => {
    return idMap[layout[(row * rowLength) + col]];
  }
}*/

/*
export const createFixedLayout2d = (layout, rowLength, idMap) => {
  return (range2d, cb) => {
    const maxCol = range2d.x + range2d.width;
    const maxRow = range2d.y + range2d.height;

    for (let col = range2d.x; col < maxCol; col++) {
      for (let row = range2d.y; row < maxRow; row++) {
        cb(idMap[layout[(row * rowLength) + col]], col, row);
      }
    }
  }
}
*/

export const createFixedLayout2d = (layout, rowLength, idMap) => {
  return (range2d) => {
    const tiles = []; // TODO: pooling
    const maxCol = range2d.x + range2d.width;
    const maxRow = range2d.y + range2d.height;

    for (let col = range2d.x; col < maxCol; col++) {
      for (let row = range2d.y; row < maxRow; row++) {
        tiles.push({ // TODO: pooling
          tileId: idMap[layout[(row * rowLength) + col]],
          col,
          row
        });
      }
    }

    return tiles;
  }
}
