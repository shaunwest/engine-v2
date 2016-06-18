import { rectContainsPoint } from '../util/geom';
import { deepClone } from '../util/obj';

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

export const createGameObject = (gameObjectConfig, gameObjectType) => 
  Object.assign({}, gameObjectConfig, deepClone(gameObjectType)); // use pooling

export const createGameObjectSet = (gameObjectSetConfig, gameObjectTypeSet) => {
  const gameObjectSet = []; // use pooling
  for (const gameObjectConfig of gameObjectSetConfig) {
    gameObjectSet.push(createGameObject(gameObjectConfig, gameObjectTypeSet[gameObjectConfig.type]));
  }
  return gameObjectSet;
}
