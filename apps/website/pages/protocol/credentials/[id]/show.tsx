import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { DateTime } from 'luxon';

import { HeadContainer } from '../../../../components/molecules/head-container';
import { DashboardTemplate } from '../../../../components/templates/dashboard';
import {
  CredentialProtocolShow,
  ProtocolTemplate,
} from '../../../../components/templates/protocol';
import { gatewayProtocolSDK } from '../../../../services/gateway-protocol/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolCredential({ credential, ogImage }: Props) {
  return (
    <>
      {credential.id && (
        <>
          <HeadContainer
            title={credential.title}
            ogTitle={`${credential.title} / Gateway`}
            description={credential.description}
            ogDescription={credential.description}
            ogImage={ogImage}
            twitterImage={ogImage}
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
      )}
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const host = ctx.req.headers.host || null;

  const credential = await gatewayProtocolSDK.credential({
    id: ctx.query.id as string,
  });

  const credentialData = credential.credential;

  const issuanceDate = DateTime.fromISO(credentialData.createdAt).toFormat(
    'MMM dd, yyyy a'
  );

  const ogImage = `https://${host}/api/og-image/credential?id=${
    credentialData.id
  }&title=${
    credentialData.title
  }&description=${credentialData.description.slice(0, 100)}&issuer=${
    credentialData.issuerUser?.gatewayId
  }&issuanceDate=${issuanceDate}${
    credentialData.image ? '&image=' + credentialData.image : ''
  }`;

  return {
    props: {
      credential: credential?.credential,
      ogImage,
    },
  };
};
