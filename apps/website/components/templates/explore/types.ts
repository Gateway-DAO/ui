import { PartialDeep } from 'type-fest';

import { Daos, Gates, Users } from '../../../services/graphql/types.generated';

export type ExploreProps = {
  daos: PartialDeep<Daos>[];
  gates: PartialDeep<Gates>[];
  people: PartialDeep<Users>[];
};
