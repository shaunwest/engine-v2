import { asyncReduce } from '../util/func';
import { getWebResource, getWebImage } from '../web-resource/web-resource-loader';

const onSheetAssetError = error =>
  `${ error }: Failed to load Game Image source`;

const onSheetAssetSetError = error => {
  throw `${ error }: Failed to load Game Image Set source`;
}

const shallowMerge = (to, from) => Object.assign({}, to, from); 
const shallowClone = obj => Object.assign({}, obj); 

export const loadSheetAssetSet = sheetAssetSetConfig =>
  asyncReduce(
    sheetAssetSetConfig, 
    (newConfig, sheetAssetConfig, configKey, ready) =>
      getWebImage(sheetAssetConfig.src)
        .then(img => {
          newConfig[configKey] = shallowMerge(sheetAssetConfig, {src: {
            url: sheetAssetConfig.src,
            image: img
          }});
          ready(newConfig);
        }),
    {});

export const loadSheetAsset = sheetAssetConfig =>
  getWebImage(sheetAssetConfig.src)
    .then(img => {
      const newConfig = shallowClone(sheetAssetConfig);
      newConfig.src = {
        url: sheetAssetConfig.src,
        image: img
      };
      return newConfig;
    });

export const loadSheetAssetConfig = src =>
  getWebResource(src)
    .catch(error => error)
    .then(
      sheetAssetConfig => loadSheetAsset(sheetAssetConfig),
      onSheetAssetError
    );

export const loadSheetAssetSetConfig = src =>
  getWebResource(src)
    .then(loadSheetAssetSet, onSheetAssetSetError);
