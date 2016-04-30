import { rectContainsPoint } from 'base-utils/geom';

export const clip = (sprites, clipRange) => {
  const newSprites = []; // TODO: use pooling
  for (let sprite of sprites) {
    if (rectContainsPoint(sprite, clipRange)) {
      newSprites.push(sprite);
    } 
  }

  return newSprites;
}


