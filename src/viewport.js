
// Object, Function -> undefined
export const range2d = (range, cb) => {
  const maxCol = range.x + range.width;
  const maxRow = range.y + range.height;

  for (let col = range.x; col < maxCol; col++) {
    for (let row = range.y; row < maxRow; row++) {
      cb(col, row);
    }
  }
}
