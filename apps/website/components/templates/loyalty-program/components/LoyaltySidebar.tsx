import { PartialDeep } from 'type-fest/source/partial-deep';

import { Gates, Loyalty_Program } from '../../../../services/hasura/types';

type LoyaltySidebarProps = {
  loyalty: PartialDeep<Loyalty_Program>;
  gate?: PartialDeep<Gates>;
};

export function LoyaltySidebar({ gate, loyalty }: LoyaltySidebarProps) {
  return <>Sidebar</>;
}
