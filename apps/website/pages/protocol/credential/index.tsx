import { InferGetServerSidePropsType } from 'next';
import { useEffect, useMemo } from 'react';

import { DashboardTemplate } from '../../../components/templates/dashboard';
import {
  CredentialProtocolView,
  ProtocolTemplate,
} from '../../../components/templates/protocol';
import { useAuth } from '../../../providers/auth';
import { gatewayProtocolSDK } from '../../../services/gateway-protocol/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolCredential({ credential }: Props) {
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
        <CredentialProtocolView credential={credential} />
      </ProtocolTemplate>
    </DashboardTemplate>
  );
}

export const getServerSideProps = async () => {
  const credential = await gatewayProtocolSDK.credential({
    id: '63b83a519564717ec74cb026',
  });

  return {
    props: {
      credential: credential?.credentialById,
    },
  };
};
