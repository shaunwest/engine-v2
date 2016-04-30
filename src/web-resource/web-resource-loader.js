import imageLoader from './image-loader';
import 'isomorphic-fetch';

const webResourceCache = {};

export const saveToCache = (src, val) => webResourceCache[src] = val;

export const loadWebResource = (src, handlerFn) =>
  webResourceCache[src] ?
    Promise.resolve(webResourceCache[src]) :
    handlerFn(src);

export const fetchImageFromWeb = src => loadWebResource(src, imageLoader);

export const fetchFromWeb = src => loadWebResource(src, fetch);

export const getWebImage = src =>
  fetchImageFromWeb(src)
    .then(
      img => saveToCache(src, img),
      onWebImageError
    );

const onWebImageError = error =>
  `${ error }: Failed to load source web image`;
