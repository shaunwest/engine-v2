import { asyncReduce } from '../util/func';
import { getWebResource, getWebImage } from '../web-resource/web-resource-loader';

const onImshaError = error =>
  `${ error }: Failed to load Game Image source`;

const onImshaSetError = error => {
  throw `${ error }: Failed to load Game Image Set source`;
}

const shallowMerge = (to, from) => Object.assign({}, to, from); 
const shallowClone = obj => Object.assign({}, obj); 

export const loadImshaSet = imshaSetConfig =>
  asyncReduce(
    imshaSetConfig, 
    (newConfig, imshaConfig, configKey, ready) =>
      getWebImage(imshaConfig.src)
        .then(img => {
          newConfig[configKey] = shallowMerge(imshaConfig, {src: {
            url: imshaConfig.src,
            image: img
          }});
          ready(newConfig);
        }),
    {});

export const loadImsha = imshaConfig =>
  getWebImage(imshaConfig.src)
    .then(img => {
      const newConfig = shallowClone(imshaConfig);
      newConfig.src = {
        url: imshaConfig.src,
        image: img
      };
      return newConfig;
    });

export const loadImshaConfig = src =>
  getWebResource(src)
    .catch(error => error)
    .then(
      imshaConfig => loadImsha(imshaConfig),
      onImshaError
    );

export const loadImshaSetConfig = src =>
  getWebResource(src)
    .then(loadImshaSet, onImshaSetError);
