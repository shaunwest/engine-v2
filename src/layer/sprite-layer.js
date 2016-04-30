import { loadSpriteLayer } from './sprite-layer-loader';
import { createGameImageSet } from '../game-image/game-image';
import { getInitialTimerState, createTimer } from '../timer';
import { createFreeLayout2d } from '../layout-2d/free-layout-2d';

/*
export const spriteLayer = (url, update, render) => {
  loadSpriteLayer(url)
    .then(layerConfig => {
      const gameImageSet = createGameImageSet(layerConfig.gameImages);
      const renderSprites = createSpriteRenderer(render2d, gameImageSet);
      const timer = createTimer(getInitialTimerState());
      const getSprites = createFreeLayout2d(layerConfig.spriteLayout, layerConfig.spriteSet);
      
      timer((frameCount, fpsDeviation) => {
        const sprites = update(getSprites, fpsDeviation);
        const visibleSprites = clip(sprites, view.clipRange);
        render(visibleSprites);
      });
    });
}
*/

// TODO: should there be a catch instead of the guard clause at the start?
export const createSpriteLayer = (url, init, update) => {
  if (typeof url !== 'string') throw `URL must be a string. Got ${ url }`;
  loadSpriteLayer(url)
    .then(layerConfig => {
      const gameImageSet = createGameImageSet(layerConfig.gameImages);
      const timer = createTimer(getInitialTimerState());
      const getSprites = createFreeLayout2d(layerConfig.spriteLayout, layerConfig.spriteSet);
      init(gameImageSet, layerConfig);
      timer((frameCount, fpsDeviation) => update(getSprites, gameImageSet, fpsDeviation));
    });
}

// Experimental, a little too stateful imo
export const SpriteLayerFactory = (url) => {
  let view = {
    activeRange: { x: 0, y: 0, width: 100, height: 100 },
    clipRange: { x: 0, y: 0, width: 64, height: 32 }
  };

  let update = () => {}
  let render2d = () => {}

  loadSpriteLayer(url)
    .then(layerConfig => {
      const gameImageSet = createGameImageSet(layerConfig.gameImages);
      const renderSprites = createSpriteRenderer(render2d, gameImageSet);
      const timer = createTimer(getInitialTimerState());
      const getSprites = createFreeLayout2d(layerConfig.spriteLayout, layerConfig.spriteSet);
      
      timer((frameCount, fpsDeviation) => {
        const sprites = getSprites(view.activeRange);
        const updatedSprites = update(getSprites, fpsDeviation);
        const visibleSprites = clip(updatedSprites, view.clipRange);
        renderSprites(visibleSprites, view.clipRange);
      });
    });

  return {
    setView: (val) => view = val,
    setUpdate: (val) => update = val,
    setRender2d: (val) => render2d = val
  };
}
