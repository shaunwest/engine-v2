// GET RID OF THIS!

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
