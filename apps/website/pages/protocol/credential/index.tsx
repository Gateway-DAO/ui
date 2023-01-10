import { InferGetServerSidePropsType } from 'next';

import { DashboardTemplate } from '../../../components/templates/dashboard';
import {
  CredentialProtocolView,
  ProtocolTemplate,
} from '../../../components/templates/protocol';
import { useAuth } from '../../../providers/auth';
import { gatewayProtocolSDK } from '../../../services/gateway-protocol/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolCredential({ credential }: Props) {
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
        <CredentialProtocolView credential={credential} />
      </ProtocolTemplate>
    </DashboardTemplate>
  ) : null;
}

export const getServerSideProps = async () => {
  const credential = await gatewayProtocolSDK.credential({
    id: '63bc8114128934b464ffc811',
  });

  return {
    props: {
      credential: credential?.credentialById,
    },
  };
};
