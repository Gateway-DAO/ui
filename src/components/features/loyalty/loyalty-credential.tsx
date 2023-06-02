import { Gates, Loyalty_Program } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import LeftSidebarTemplate from '../../templates/left-sidebar/left-sidebar';
import { GateViewContent } from '../gates/view/gate-view-content';
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
        <GateViewContent
          gateProps={gate}
          protocolCredential={protocolCredential}
        />
      }
    />
  );
}
