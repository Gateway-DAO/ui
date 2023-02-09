import { PartialDeep } from 'type-fest';

import { Daos, Gates, Users } from '../../../services/hasura/types';

export type ExploreProps = {
  daos: PartialDeep<Daos>[];
  gates: PartialDeep<Gates>[];
  people: PartialDeep<Users>[];
  // dataModels: any[]; //[ ] Use PartialDeep
};
