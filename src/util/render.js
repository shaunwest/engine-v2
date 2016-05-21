import { forEach } from './func.js';

// Canvas -> Canvas, Int, Int -> undefined
export const create2dRenderer = canvas => {
  const context = canvas.getContext('2d');
  return (image, x, y) => {
    if (image) {
      context.drawImage(image, x, y);
    }
  }
}

export const create2dBoxRenderer = canvas => {
  const context = canvas.getContext('2d');
  return box => {
    context.rect(box.x, box.y, box.width, box.height);
    context.stroke();
  }
}

export const create2dLineRenderer = canvas => {
  const context = canvas.getContext('2d');
  return line => {
    context.moveTo(line.x1, line.y1);
    context.lineTo(line.x2, line.y2);
    context.stroke();
  }
}

export const create2dClearer = canvas => {
  const context = canvas.getContext('2d');
  return () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export const createObjectRenderer = renderers =>
  (gameObjectSet, position) => {
    for(const gameObject of gameObjectSet) {
      renderers[gameObject.type](gameObject);
    }
  }

export const createDebugRenderer = (render2d) =>
  (gameObjectSet, position) => {
    for(const gameObject of gameObjectSet) {
      render2d(
        gameObject.x - position.x,
        gameObject.y - position.y, 
        gameObject.width,
        gameObject.height
      );
    }
  }

export const createTileRenderer = (render2d, gameAnimationSet, tileSize, tileMap) =>
  (tileSet, position, frameCount) => {
    for (let i = 0; i < tileSet.grid.length; i++) {
      const tileId = tileSet.grid[i];
      const col = tileSet.start.col + Math.floor(i % tileSet.rowLength);
      const row = tileSet.start.row + Math.floor(i / tileSet.rowLength);
      
      render2d(
        gameAnimationSet(tileMap[tileId], frameCount),
        (col * tileSize) - position.x,
        (row * tileSize) - position.y);
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
