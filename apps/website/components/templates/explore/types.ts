import { PartialDeep } from 'type-fest';

import {
  Daos,
  Gates,
  Protocol_Data_Model,
  Users,
} from '../../../services/hasura/types';

export type ExploreProps = {
  daos: PartialDeep<Daos>[];
  gates: PartialDeep<Gates>[];
  people: PartialDeep<Users>[];
  dataModels: PartialDeep<Protocol_Data_Model>[];
};
