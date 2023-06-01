import { Gates, Loyalty_Program } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { GateViewTasks } from '../../templates/gate-view/gate-view-tasks';
import LeftSidebarTemplate from '../../templates/left-sidebar/left-sidebar';
import { LoyaltySidebar } from './components/loyalty-sidebar';

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
    <LeftSidebarTemplate
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
