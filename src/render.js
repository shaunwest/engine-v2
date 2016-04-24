
// Canvas -> Int, Int, Int, Array -> undefined
export const create2dRenderer = canvas => {
  const context = canvas.getContext('2d');
  return (image, x, y) => {
    if (image) {
      context.drawImage(image, x, y);
    }
  }
}
