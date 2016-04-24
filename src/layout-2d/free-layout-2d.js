import { rectContainsPoint } from 'base-utils/geom';

// TODO: use pooling

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
  Object.assign({}, sprite, clone(spriteConfig));

export const createFreeLayout2d = (layoutData, spriteSetConfig) => {
  return range2d => {
    const result = [];
    for (const entity of layoutData) {
      if (rectContainsPoint(entity, range2d)) {
        result.push(initSprite(entity, spriteSetConfig[entity.id]));
      }
    }
    return result;
  }
}
