import { Gates } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

export const badgeProps = (gate: PartialDeep<Gates>) =>
  gate?.image
    ? {
        src: gate.image,
        alt: gate.title,
      }
    : undefined;
