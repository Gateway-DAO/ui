import { decodeBlurHash } from 'fast-blurhash';
import { PartialDeep } from 'type-fest';

import { Files } from '../services/hasura/types';

export const generateImageUrl = (id?: string) =>
  id
    ? `${process.env.NEXT_PUBLIC_NODE_ENDPOINT}/storage/file?id=${id}`
    : undefined;

/** Generates the url and blurred version from a File object  */
export const useFile = (file?: PartialDeep<Files>) => {
  if (!file) {
    return undefined;
  }

  const url = generateImageUrl(file.id);
  const blur = file?.blur ? createImage(decodeBlurHash(file.blur, 32, 32)) : '';

  return {
    url,
    blur,
    background: {
      backgroundImage: `url(${blur})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
  };
};

const createImage = (data: Uint8ClampedArray) => {
  if (typeof window === 'undefined') {
    return '';
  }
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  const imageData = new ImageData(data, 32, 32);
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};
