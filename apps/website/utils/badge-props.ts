import { PartialDeep } from 'type-fest';

import { Gates } from '../services/hasura/types';

export const badgeProps = (gate: PartialDeep<Gates>) =>
  gate?.image
    ? {
        src: gate.image,
        alt: gate.title,
      }
    : undefined;
