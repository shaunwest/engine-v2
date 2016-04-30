/**
 * Created by shaunwest on 9/11/15.
 */

const IMAGE_WAIT_INTERVAL = 100;

export const createImage = uri => {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = uri;
  return image;
}

export const waitForImage = image =>
  new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      if (image.complete) {
        clearInterval(intervalId);
        resolve(image);
      }
    }, IMAGE_WAIT_INTERVAL);

    image.onerror = () => {
      clearInterval(intervalId);
      reject('error');
    };
  });

export default (uri) => waitForImage(createImage(uri));
