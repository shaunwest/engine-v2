import imageLoader from '../web-image/image-loader';
import 'isomorphic-fetch';

export const webResourceCache = {};

export const loadWebResource = (src, handlerFn) =>
  webResourceCache[src] ?
    Promise.resolve(webResourceCache[src]) :
    handlerFn(src);

export const fetchImageFromWeb = src => loadWebResource(src, imageLoader);

export const fetchFromWeb = src => loadWebResource(src, fetch);

const getWebImage = src =>
  fetchImageFromWeb(src)
    .then(
      img => {
        webResourceCache[src] = img;
        return img;
      },
      onWebImageError
    );

/*
const onGameImageSuccess = gameImageConfig => 
  fetchImageFromWeb(gameImageConfig.src)
    .then(
      img => {
        webResourceCache[gameImageConfig.src] = img;
        gameImageConfig.src = {
          url: gameImageConfig.src,
          image: img
        };
        return gameImageConfig;
      },
      onWebImageError
    );
*/

/*
const onGameImageSetSuccess = gameImageSetConfig =>
  Promise.all(Object.keys(gameImageSetConfig)
    .map(configKey => {
      //onGameImageSuccess(gameImageSetConfig[configKey])
      const gameImageConfig = gameImageSetConfig[configKey];
      return getWebImage(gameImageConfig.src)
        .then(img => {
          gameImageConfig.src = {
            url: gameImageConfig.src,
            image: img
          };
          return gameImageConfig;
        }, error => {});
    })
  // no good... how to preserve the object keys??
  ).then(gameImageSets => gameImageSets.reduce((gameImageSet, gameImageConfigData) => {
    gameImageSet[gameImageConfigData.id] = gameImageConfigData.config;
    return gameImageSet;
  }, {})); 
*/

const onWebImageError = error =>
  `${ error }: Failed to load source web image`;

const onGameImageError = error =>
  `${ error }: Failed to load Game Image source`;

const onGameImageSetError = error => {
  throw `${ error }: Failed to load Game Image Set source`;
}

export const loadGameImage = src =>
  fetchFromWeb(src)
    .then(
      response => { 
        const json = response.json();
        webResourceCache[src] = json;
        return json 
      },
      response => response.text()
    )
    .catch(error => error)
    .then(
      gameImageConfig =>
        getWebImage(gameImageConfig.src)
          .then(img => {
            gameImageConfig.src = {
              url: gameImageConfig.src,
              image: img
            };
            return gameImageConfig;
          }),
      onGameImageError
    );

export const loadGameImageSet = src =>
  fetchFromWeb(src)
    .then(response => {
      if (response.ok) {
        const json = response.json();
        webResourceCache[src] = json;
        return json 
      } else {
        throw 'Network error';
      }
    })
    .then(
      gameImageSetConfig => new Promise((resolve, reject) => {
        const configKeys = Object.keys(gameImageSetConfig);
        let gameImageCount = configKeys.length;

        configKeys.map(configKey => {
          const gameImageConfig = gameImageSetConfig[configKey];
          getWebImage(gameImageConfig.src)
            .then(img => {
              gameImageConfig.src = {
                url: gameImageConfig.src,
                image: img
              };
              if (--gameImageCount === 0) {
                resolve(gameImageSetConfig);
              }
            });
        });
      }),
      onGameImageSetError
    );
