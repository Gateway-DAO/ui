import { DashboardTemplate } from '../../../components/templates/dashboard';
import {
  CredentialProtocolView,
  ProtocolTemplate,
} from '../../../components/templates/protocol';
import { useAuth } from '../../../providers/auth';

export default function ProtocolCredential() {
  const { me } = useAuth();

  return me?.id ? (
    <DashboardTemplate
      containerProps={{
        sx: {
          overflow: '',
        },
        height: '100%',
      }}
    >
      <ProtocolTemplate>
        <CredentialProtocolView />
      </ProtocolTemplate>
    </DashboardTemplate>
  ) : null;
}

ProtocolCredential.auth = true;
