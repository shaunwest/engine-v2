import { asyncReduce } from '../func';
import { fetchFromWeb, getWebImage, saveToCache } from '../web-resource/web-resource-loader';

const onGameImageError = error =>
  `${ error }: Failed to load Game Image source`;

const onGameImageSetError = error => {
  throw `${ error }: Failed to load Game Image Set source`;
}

const shallowMerge = (to, from) => Object.assign({}, to, from); 
const shallowClone = obj => Object.assign({}, obj); 

export const onGameImageSetSuccess = gameImageSetConfig =>
  asyncReduce(
    gameImageSetConfig, 
    (newConfig, gameImageConfig, configKey, ready) =>
      getWebImage(gameImageConfig.src)
        .then(img => {
          newConfig[configKey] = shallowMerge(gameImageConfig, {src: {
            url: gameImageConfig.src,
            image: img
          }});
          ready(newConfig);
        }),
    {});

export const loadGameImage = src =>
  fetchFromWeb(src)
    .then(
      response => saveToCache(src, response.json()),
      response => response.text()
    )
    .catch(error => error)
    .then(
      gameImageConfig =>
        getWebImage(gameImageConfig.src)
          .then(img => {
            const newConfig = shallowClone(gameImageConfig);
            newConfig.src = {
              url: gameImageConfig.src,
              image: img
            };
            return newConfig;
          }),
      onGameImageError
    );

export const loadGameImageSet = src =>
  fetchFromWeb(src)
    .then(response => {
      if (response.ok) {
        return saveToCache(src, response.json());
      } else {
        throw 'Network error';
      }
    })
    .then(onGameImageSetSuccess, onGameImageSetError);
