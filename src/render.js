import { forEach } from './func.js';

// Canvas -> Int, Int, Int, Array -> undefined
export const create2dRenderer = canvas => {
  const context = canvas.getContext('2d');
  return (image, x, y) => {
    if (image) {
      context.drawImage(image, x, y);
    }
  }
}

export const create2dClearer = canvas => {
  const context = canvas.getContext('2d');
  return () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export const createTileRenderer = (render2d, gameAnimationSet, tileSize) =>
  (tiles, position, frameCount) => {
    for (const tile of tiles) {
      render2d(
        gameAnimationSet(tile.tileId, frameCount),
        (tile.col * tileSize) - position.x,
        (tile.row * tileSize) - position.y);
    }
  }

export const createSpriteRenderer = (render2d, gameImageSet) =>
  (sprites, position) => {
    for(const sprite of sprites) {
      render2d(
        gameImageSet(sprite.id)(sprite.currentAnimation, 0),
        sprite.x - position.x,
        sprite.y - position.y
      );
    }
  }
