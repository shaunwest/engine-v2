
const reduceObject = (collection, fn, acc) => {
  const keys = Object.keys(collection); // TODO: use pooling
  for (let key of keys) {
    if (collection.hasOwnProperty(key)) {
      acc = fn(acc, collection[key], key);
    }
  }
  return acc;
}

/*
const reduce = (collection, fn, acc) => {
  for (const val of collection) {
    acc = fn(acc, val);
  }
  return acc;
}
*/

export const createSpriteSet = (spriteSetConfig, gameImageSet) => {
  const spriteSet = reduceObject(spriteSetConfig, (acc, spriteConfig, spriteId) => {
    acc[spriteId] = Object.assign({}, spriteConfig, { gameImage: gameImageSet[spriteConfig.gameImage] });
    return acc;
  }, {});

  return spriteId => {
    if (typeof spriteId == 'undefined') throw 'spriteId is required';
    return spriteSet[spriteId];
  }
}
