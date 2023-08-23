import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { CredentialProtocolView } from '@/components/features/protocol';
import Protocol from '@/components/features/protocol/protocol';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { hasuraPublicService } from '@/services/hasura/api';
import { getCredentialImageURLParams } from '@/utils/credential/build-image-url-params';
import { getLoyaltyPassImageURLParams } from '@/utils/loyalty-pass/build-image-url-params';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolCredential({
  credential,
  ogImage,
  loyalty,
}: Props) {
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
            <Protocol credential={credential} loyalty={loyalty}>
              <CredentialProtocolView
                loyalty={loyalty}
                credential={credential}
              />
            </Protocol>
          </DashboardTemplate>
        </>
      )}
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const host = ctx.req.headers.host || null;

  const res = await hasuraPublicService.protocol_credential({
    id: ctx.query.id as string,
  });

  const credential = res.protocol.credential;

  const dataModelId = credential?.dataModel?.id;

  const resDatamodel =
    await hasuraPublicService.loyalty_programs_by_data_model_id({
      id: dataModelId,
    });

  let isLoyaltyPDA = false;
  let filteredLoyalty = {};

  if (resDatamodel.loyalty_program && resDatamodel.loyalty_program.length > 0) {
    isLoyaltyPDA = true;
    filteredLoyalty = resDatamodel.loyalty_program[0];
  }

  const urlParams = isLoyaltyPDA
    ? getLoyaltyPassImageURLParams(
        filteredLoyalty,
        credential.recipientUser?.gatewayId,
        credential?.claim?.tier
      )
    : getCredentialImageURLParams(credential);

  const ogImage = `https://${host}/api/og-image/${
    isLoyaltyPDA ? 'loyalty-pass' : 'credential'
  }${urlParams}`;

  return {
    props: {
      credential,
      loyalty: filteredLoyalty,
      ogImage,
    },
  };
};
