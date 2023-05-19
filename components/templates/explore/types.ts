import { PartialDeep } from 'type-fest';

import {
  Daos,
  Gates,
  Loyalty_Program,
  Users,
} from '../../../services/hasura/types';

export type ExploreProps = {
  daos: PartialDeep<Daos>[];
  gates: PartialDeep<Gates>[];
  people: PartialDeep<Users>[];
  loyalty_program: PartialDeep<Loyalty_Program>[];
};
