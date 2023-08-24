import {
  Credentials,
  Gates,
  Loyalty_Program,
  Protocol_Credential,
} from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import LeftSidebarTemplate from '../../templates/left-sidebar/left-sidebar';
import { GateViewContent } from '../gates/view/gate-view-content';
import { LoyaltySidebar } from './components/loyalty-sidebar';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  gate: PartialDeep<Gates>;
  credential: PartialDeep<Credentials>;
  loyaltyCredential: PartialDeep<Protocol_Credential>;
};

export function LoyaltyProgramCredential({
  credential,
  gate,
  loyalty,
  loyaltyCredential,
}: Props) {
  return (
    <LeftSidebarTemplate
      sidebar={
        <LoyaltySidebar
          gate={gate}
          loyalty={loyalty}
          protocolCredential={credential?.credentials_protocol}
          gatePoints={credential?.points}
          loyaltyPoints={loyaltyCredential?.claim?.points ?? 0}
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
