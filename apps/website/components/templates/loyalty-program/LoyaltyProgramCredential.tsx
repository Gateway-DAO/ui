import { PartialDeep } from 'type-fest/source/partial-deep';

import { useCredentialByGateId } from '../../../hooks/use-credential-by-gate-id';
import { Gates, Loyalty_Program } from '../../../services/hasura/types';
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
  const credential = useCredentialByGateId({ gateId: gate?.id });

  return (
    <LoyaltyProgramTemplate
      sidebar={
        <LoyaltySidebar
          gate={gate}
          loyalty={loyalty}
          protocolCredential={protocolCredential}
        />
      }
      mainContent={<GateViewTasks gateProps={gate} credential={credential} />}
    />
  );
}
