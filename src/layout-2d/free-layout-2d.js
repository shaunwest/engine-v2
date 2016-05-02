// GET RID OF ALL THIS
import { rectContainsPoint } from 'base-utils/geom';

const clone = entity => {
  if (Array.isArray(entity)) {
    const result = [];
    for (let i = 0; i < result.length; i++) {
      result[i] = clone(entity[i]);
    }
    return result;
  } else if (typeof entity == 'object') {
    const result = {};
    for (const key in entity) {
      if (entity.hasOwnProperty(key)) {
        result[key] = clone(entity[key]); 
      }
    }
    return result;
  } else {
    return entity;
  }
}

export const initSprite = (sprite, spriteConfig) => 
  Object.assign({}, sprite, clone(spriteConfig)); // use pooling

export const initSprites = (sprites, spriteConfig) => {
  const newSprites = []; // use pooling
  for (const sprite of sprites) {
    newSprites.push(initSprite(sprite, spriteConfig[sprite.id]));
  }
  return newSprites;
}

// FIXME: don't even use this. Just use the init functions
// and the clip function
export const createFreeLayout2d = (layoutData, spriteSetConfig) => {
  const sprites = initSprites(layoutData, spriteSetConfig);
  return range2d => {
    const result = []; // use pooling
    for (const sprite of sprites) {
      if (rectContainsPoint(sprite, range2d)) {
        result.push(sprite);
      }
    }
    return result;
  }
}
