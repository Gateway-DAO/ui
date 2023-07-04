import {
  Credentials,
  Gates,
  Loyalty_Program,
  Loyalty_Progress,
} from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import LeftSidebarTemplate from '../../templates/left-sidebar/left-sidebar';
import { GateViewContent } from '../gates/view/gate-view-content';
import { LoyaltySidebar } from './components/loyalty-sidebar';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  gate: PartialDeep<Gates>;
  credential: PartialDeep<Credentials>;
  loyaltyProgress: PartialDeep<Loyalty_Progress>;
};

export function LoyaltyProgramCredential({
  credential,
  gate,
  loyalty,
  loyaltyProgress,
}: Props) {
  return (
    <LeftSidebarTemplate
      sidebar={
        <LoyaltySidebar
          credential={credential}
          gate={gate}
          loyalty={loyalty}
          loyaltyProgress={loyaltyProgress}
          protocolCredential={credential?.credentials_protocol}
        />
      }
      mainContent={
        <GateViewContent
          gateProps={gate}
          protocolCredential={credential?.credentials_protocol}
        />
      }
    />
  );
}
