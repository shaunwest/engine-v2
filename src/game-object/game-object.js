import { rectContainsPoint } from 'base-utils/geom';

export const deepClone = entity => {
  if (Array.isArray(entity)) {
    const result = [];
    for (let i = 0; i < result.length; i++) {
      result[i] = deepClone(entity[i]);
    }
    return result;
  } else if (typeof entity == 'object') {
    const result = {};
    for (const key in entity) {
      if (entity.hasOwnProperty(key)) {
        result[key] = deepClone(entity[key]); 
      }
    }
    return result;
  } else {
    return entity;
  }
}

/*
export const sliceGrid = (tileGrid, rowLength, sliceRegion) => {
  const tiles = []; // TODO: pooling
  const maxCol = sliceRegion.x + sliceRegion.width;
  const maxRow = sliceRegion.y + sliceRegion.height;

  for (let col = sliceRegion.x; col < maxCol; col++) {
    for (let row = sliceRegion.y; row < maxRow; row++) {
      tiles.push({ // TODO: pooling
        tileId: tileGrid[(row * rowLength) + col],
        col,
        row
      });
    }
  }

  return tiles;
}
*/

export const sliceTileSet = (tileSet, sliceRegion) => {
  const grid = [];

  const maxCol = sliceRegion.x + sliceRegion.width;
  const maxRow = sliceRegion.y + sliceRegion.height;

  for (let row = sliceRegion.y; row < maxRow; row++) {
    for (let col = sliceRegion.x; col < maxCol; col++) {
      grid.push(tileSet.grid[(row * tileSet.rowLength) + col]);
    }
  }

  return {
    grid,
    start: { col: sliceRegion.x, row: sliceRegion.y },
    rowLength: sliceRegion.width
  };
}


export const slice = (gameObjects, sliceRegion) => {
  const slicedGameObjects = []; // TODO: use pooling

  for (let gameObject of gameObjects) {
    if (rectContainsPoint(gameObject, sliceRegion)) {
      slicedGameObjects.push(gameObject);
    } 
  }

  return slicedGameObjects;
}

export const initGameObject = (gameObjectConfig, gameObjectType) => 
  Object.assign({}, gameObjectConfig, deepClone(gameObjectType)); // use pooling

export const initGameObjectSet = (gameObjectSetConfig, gameObjectTypeSet) => {
  const gameObjectSet = []; // use pooling
  for (const gameObjectConfig of gameObjectSetConfig) {
    gameObjectSet.push(initGameObject(gameObjectConfig, gameObjectTypeSet[gameObjectConfig.id]));
  }
  return gameObjectSet;
}
