import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { CredentialProtocolShow } from '@/components/features/protocol';
import Protocol from '@/components/features/protocol/protocol';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { gatewayProtocolSDK } from '@/services/gateway-protocol/api';
import { getCredentialImageURLParams } from '@/utils/credential/build-image-url-params';

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
            <Protocol credential={credential}>
              <CredentialProtocolShow credential={credential} />
            </Protocol>
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

  const urlParams = getCredentialImageURLParams(credentialData);

  const ogImage = `https://${host}/api/og-image/credential${urlParams}`;

  return {
    props: {
      credential: credential?.credential,
      ogImage,
    },
  };
};
