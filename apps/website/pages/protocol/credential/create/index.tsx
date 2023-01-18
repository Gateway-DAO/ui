import { DashboardTemplate } from '../../../../components/templates/dashboard';
import {
  CredentialProtocolCreate,
  ProtocolTemplate,
} from '../../../../components/templates/protocol';

export default function ProtocolCredentialCreate() {
  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          overflow: '',
        },
        height: '100%',
      }}
    >
      <ProtocolTemplate>
        <CredentialProtocolCreate />
      </ProtocolTemplate>
    </DashboardTemplate>
  );
}
