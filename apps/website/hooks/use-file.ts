import { decodeBlurHash } from 'fast-blurhash';

import { Files } from '../services/graphql/types.generated';

/** Generates the url and blurred version from a File object  */
export const useFile = (file: Files) => {
  return {
    url: `https://api.staging.mygateway.xyz/storage/file?id=${file.id}`,
    blur: createImage(decodeBlurHash(file.blur, 32, 32)),
  };
};

const createImage = (data: Uint8ClampedArray) => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return '';
  }
  const imageData = new ImageData(data, 32, 32);
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};
