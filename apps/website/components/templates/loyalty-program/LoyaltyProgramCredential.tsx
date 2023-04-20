import { PartialDeep } from 'type-fest/source/partial-deep';

import { useCredentialByGateId } from '../../../hooks/use-credential-by-gate-id';
import { useGateStatus } from '../../../hooks/use-gate-status';
import { Gates, Loyalty_Program } from '../../../services/hasura/types';
import { GateViewTasks } from '../gate-view/gate-view-tasks';
import LoyaltyProgramTemplate from './LoyaltyProgramTemplate';
import { LoyaltySidebar } from './components/LoyaltySidebar';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  gate: PartialDeep<Gates>;
};

export function LoyaltyProgramCredential({ gate, loyalty }: Props) {
  const credential = useCredentialByGateId({ gateId: gate?.id });
  const gateStatus = useGateStatus(gate);

  return (
    <LoyaltyProgramTemplate
      sidebar={
        <LoyaltySidebar
          gate={gate}
          loyalty={loyalty}
          credential={credential}
          completedGate={gateStatus.isCompleted}
        />
      }
      mainContent={
        <GateViewTasks
          gateProps={gate}
          credential={credential}
          completedGate={gateStatus.isCompleted}
          completedTasksCount={gateStatus.completedTasksCount}
        />
      }
    />
  );
}
