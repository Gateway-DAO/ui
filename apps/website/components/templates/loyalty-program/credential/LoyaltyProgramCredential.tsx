import { PartialDeep } from 'type-fest/source/partial-deep';

import { Gates, Loyalty_Program } from '../../../../services/hasura/types';
import LoyaltyProgramTemplate from '../LoyaltyProgramTemplate';
import { LoyaltySidebar } from '../components/LoyaltySidebar';
import { LoyaltyProgramCredentialTasks } from './components/LoyaltyProgramCredentialTasks';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  gate: PartialDeep<Gates>;
};

export function LoyaltyProgramCredential({ gate, loyalty }: Props) {
  return (
    <LoyaltyProgramTemplate
      sidebar={<LoyaltySidebar gate={gate} loyalty={loyalty} />}
      mainContent={<LoyaltyProgramCredentialTasks gate={gate} />}
    />
  );
}
