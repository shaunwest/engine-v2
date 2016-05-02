import imageLoader from './image-loader';
import 'isomorphic-fetch';

const webResourceCache = {};

export const saveToCache = (src, val) => webResourceCache[src] = val;

export const loadWebResource = (src, handlerFn) =>
  webResourceCache[src] ?
    Promise.resolve(webResourceCache[src]) :
    handlerFn(src);

const fetchImageFromWeb = src => loadWebResource(src, imageLoader);

const fetchFromWeb = src => loadWebResource(src, fetch);

export const getWebImage = src =>
  fetchImageFromWeb(src)
    .then(
      img => saveToCache(src, img),
      onWebImageError
    );

export const getWebResource = src =>
  fetchFromWeb(src)
    .then(
      response => saveToCache(src, response.json()),
      onWebResourceError
    );

const onWebImageError = error =>
  `${ error }: Failed to load source web image`;

const onWebResourceError = error =>
  `${ error }: Failed to load web resource`;
