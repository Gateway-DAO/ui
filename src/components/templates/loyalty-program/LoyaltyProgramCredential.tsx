import { PartialDeep } from 'type-fest/source/partial-deep';

import { Gates, Loyalty_Program } from '@/services/hasura/types';
import { GateViewTasks } from '../gate-view/gate-view-tasks';
import LoyaltyProgramTemplate from './LoyaltyProgramTemplate';
import { LoyaltySidebar } from './components/LoyaltySidebar';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  gate: PartialDeep<Gates>;
  protocolCredential?: PartialDeep<Credential>;
};

export function LoyaltyProgramCredential({
  gate,
  loyalty,
  protocolCredential,
}: Props) {
  return (
    <LoyaltyProgramTemplate
      sidebar={
        <LoyaltySidebar
          gate={gate}
          loyalty={loyalty}
          protocolCredential={protocolCredential}
        />
      }
      mainContent={
        <GateViewTasks
          gateProps={gate}
          protocolCredential={protocolCredential}
        />
      }
    />
  );
}
