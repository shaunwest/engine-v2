// DELETE THIS

import { onGameImageSetSuccess } from '../game-image/game-image-loader.js';
import { fetchFromWeb, getWebImage, saveToCache } from '../web-resource/web-resource-loader';

const onSpriteLayerError = error =>
  `${ error }: Failed to load Sprite Layer source`;

const onSpriteLayerSuccess = spriteLayerConfig =>
  onGameImageSetSuccess(spriteLayerConfig.gameImages)
    .then(gameImageConfig => {
      spriteLayerConfig.gameImages = gameImageConfig;
      return spriteLayerConfig;
    });

export const loadSpriteLayer = src =>
  fetchFromWeb(src)
    .then(response => {
      if (response.ok) {
        return saveToCache(src, response.json());
      } else {
        throw 'Network error';
      }
    })
    .then(onSpriteLayerSuccess, onSpriteLayerError);
