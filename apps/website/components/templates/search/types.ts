import { PartialDeep } from 'type-fest';

import { AlgoliaSearchResults } from '../../../services/graphql/types.generated';

export type SearchProps = {
  daos: PartialDeep<AlgoliaSearchResults>;
  gates: PartialDeep<AlgoliaSearchResults>;
  users: PartialDeep<AlgoliaSearchResults>;
};
