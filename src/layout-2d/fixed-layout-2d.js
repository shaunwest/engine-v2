
// Array, Int, Array -> Int, Int -> *
export const createFixedLayout2d = (layout, rowLength, idMap) => {
  return (col, row) => {
    return idMap[layout[(row * rowLength) + col]];
  }
}
