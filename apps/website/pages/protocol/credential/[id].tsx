import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { DashboardTemplate } from '../../../components/templates/dashboard';
import {
  CredentialProtocolView,
  ProtocolTemplate,
} from '../../../components/templates/protocol';
import { gatewayProtocolSDK } from '../../../services/gateway-protocol/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolCredential({ credential, error }: Props) {
  if (error) return <div>{error}</div>;
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const credential = await gatewayProtocolSDK.credential({
      id: ctx.query.id as string,
    });

    return {
      props: {
        credential: credential?.credentialById,
      },
    };
  } catch (e) {
    return {
      props: {
        error: JSON.stringify(e),
      },
    };
  }
};
