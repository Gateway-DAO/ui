import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import { HeadContainer } from '../../../../components/molecules/head-container';
import { DashboardTemplate } from '../../../../components/templates/dashboard';
import {
  CredentialProtocolShow,
  ProtocolTemplate,
} from '../../../../components/templates/protocol';
import { gatewayProtocolSDK } from '../../../../services/gateway-protocol/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolCredential({ credential, host }: Props) {
  // const origin =
  //   typeof window !== 'undefined' && window.location.origin
  //     ? window.location.origin
  //     : '';

  console.log(host);

  return (
    <>
      <HeadContainer
        title={credential.title}
        ogImage="/api/og-image/credential"
        twitterImage="/api/og-image/credential"
      />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: '',
          },
          height: '100%',
        }}
      >
        <ProtocolTemplate>
          <CredentialProtocolShow credential={credential} />
        </ProtocolTemplate>
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const host = ctx.req.headers.host || null;

  const credential = await gatewayProtocolSDK.credential({
    id: ctx.query.id as string,
  });

  return {
    props: {
      credential: credential?.credential,
      host,
    },
  };
};
