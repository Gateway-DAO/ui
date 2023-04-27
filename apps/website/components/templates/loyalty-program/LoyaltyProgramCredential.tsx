import { PartialDeep } from 'type-fest/source/partial-deep';

import { useCredentialByGateId } from '../../../hooks/use-credential-by-gate-id';
import { Gates, Loyalty_Program } from '../../../services/hasura/types';
import { GateViewTasks } from '../gate-view/gate-view-tasks';
import LoyaltyProgramTemplate from './LoyaltyProgramTemplate';
import { LoyaltySidebar } from './components/LoyaltySidebar';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  gate: PartialDeep<Gates>;
  credentialProtocol?: PartialDeep<Credential>;
};

export function LoyaltyProgramCredential({
  gate,
  loyalty,
  credentialProtocol,
}: Props) {
  const credential = useCredentialByGateId({ gateId: gate?.id });

  return (
    <LoyaltyProgramTemplate
      sidebar={
        <LoyaltySidebar
          gate={gate}
          loyalty={loyalty}
          credentialProtocol={credentialProtocol}
        />
      }
      mainContent={<GateViewTasks gateProps={gate} credential={credential} />}
    />
  );
}
