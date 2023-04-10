import { PartialDeep } from 'type-fest/source/partial-deep';

import { Loyalty_Program } from '../../../../../services/hasura/types';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
};

export function LoyaltyProgramMainContent({ loyalty }: Props) {
  return <p>Loyalty Program Main Content</p>;
}
