import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { LoyaltyProgram } from '@/components/features/loyalty/loyalty';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { hasuraApi, hasuraPublicService } from '@/services/hasura/api';
import {
  Credentials_By_User_Id_By_Loyalty_IdQuery,
  Loyalty_CredentialQuery,
  Loyalty_ProgramQuery,
} from '@/services/hasura/types';
import { getServerSession } from '@/services/next-auth';
import { getLoyaltyPassImageURLParams } from '@/utils/loyalty-pass/build-image-url-params';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function LoyaltyPage({
  loyalty,
  credentialsByLoyalty,
  loyaltyCredential,
  ogImage,
}: Props) {
  return (
    <>
      <HeadContainer
        title={`${loyalty.name} Loyalty`}
        description={loyalty.description}
        ogImage={ogImage}
      />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: 'hidden',
          },
        }}
      >
        <LoyaltyProgram
          loyalty={loyalty}
          loyaltyCredential={loyaltyCredential}
          credentialsByLoyalty={credentialsByLoyalty}
        />
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.query.id as string;
  const session = await getServerSession(ctx.req, ctx.res);
  const host = ctx.req.headers.host || null;

  const { loyalty_program_by_pk } = await hasuraPublicService.loyalty_program({
    id,
  });

  let credentials: Credentials_By_User_Id_By_Loyalty_IdQuery;
  let loyaltyProgram: Loyalty_ProgramQuery;
  let loyaltyCredential: Loyalty_CredentialQuery;
  let ogImage;

  if (session) {
    credentials = await hasuraApi(
      session?.token
    ).credentials_by_user_id_by_loyalty_id({
      user_id: session?.hasura_id,
      loyalty_id: id,
    });
    loyaltyProgram = await hasuraApi(session?.token).loyalty_program({
      id,
    });
    loyaltyCredential = await hasuraApi(session?.token).loyalty_credential({
      user_id: session?.protocol_id,
      dm_id: loyaltyProgram?.loyalty_program_by_pk?.data_model_id,
    });

    const { gatewayId } =
      (await hasuraApi(session.token, session.hasura_id).gatewayId())?.protocol
        ?.me ?? {};

    const tier = (
      tiers: any[],
      totalPoints: number
    ): { current: any; next: any } => {
      const asc = tiers.sort((a, b) => a.min_pts - b.min_pts);
      const current = asc.findIndex(
        (tier, index) =>
          (totalPoints >= tier.min_pts && totalPoints <= tier.max_pts) ||
          (totalPoints >= tier.min_pts && index === asc.length - 1)
      );
      const next = current === asc.length - 1 ? null : asc[current + 1];
      return { current: asc[current], next: next };
    };

    const totalPoints =
      loyaltyCredential?.protocol_credential?.find((lc) => lc)?.claim?.points ??
      0;

    const loyaltyTier = tier(loyalty_program_by_pk.loyalty_tiers, totalPoints);

    const urlParams = getLoyaltyPassImageURLParams(
      loyalty_program_by_pk,
      gatewayId,
      loyaltyTier?.current?.tier
    );
    ogImage = `https://${host}/api/og-image/loyalty-pass${urlParams}`;
  }

  return {
    props: {
      loyalty: loyalty_program_by_pk,
      credentialsByLoyalty: credentials?.credentials ?? [],
      loyaltyCredential:
        loyaltyCredential?.protocol_credential?.find((lc) => lc) ?? null,
      ogImage: ogImage ?? null,
    },
  };
};
