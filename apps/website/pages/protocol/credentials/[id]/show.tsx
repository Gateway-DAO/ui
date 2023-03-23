import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import { DateTime } from 'luxon';

import { HeadContainer } from '../../../../components/molecules/head-container';
import { DashboardTemplate } from '../../../../components/templates/dashboard';
import {
  CredentialProtocolShow,
  ProtocolTemplate,
} from '../../../../components/templates/protocol';
import { gatewayProtocolSDK } from '../../../../services/gateway-protocol/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolCredential({ credential, host }: Props) {
  const issuanceDate = DateTime.fromISO(credential.createdAt).toFormat(
    'MMM dd, yyyy a'
  );
  return (
    <>
      <HeadContainer
        title={credential.title}
        ogImage={`https://${host}/api/og-image/credential?id=${
          credential.id
        }&title=${credential.title}&description=${credential.description.slice(
          0,
          100
        )}&issuer=${
          credential.issuerUser?.gatewayId
        }&issuanceDate=${issuanceDate}`}
        twitterImage={`https://${host}/api/og-image/credential?id=${
          credential.id
        }&title=${credential.title}&description=${credential.description.slice(
          0,
          100
        )}&issuer=${
          credential.issuerUser?.gatewayId
        }&issuanceDate=${issuanceDate}`}
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
