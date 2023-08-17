import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { LoyaltyProgram } from '@/components/features/loyalty/loyalty';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { hasuraApi, hasuraPublicService } from '@/services/hasura/api';
import { getServerSession } from '@/services/next-auth';
import { getLoyaltyPassImageURLParams } from '@/utils/loyalty-pass/build-image-url-params';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function LoyaltyPage({
  loyalty,
  credentialsByLoyalty,
  loyaltyProgress,
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
          loyaltyProgress={loyaltyProgress}
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

  // const { me } = await hasuraApi(session.token, session.hasura_id).me();

  let loyaltyProgress;
  let credentials;
  let ogImage;

  if (session) {
    credentials = await hasuraApi(
      session?.token
    ).credentials_by_user_id_by_loyalty_id({
      user_id: session?.hasura_id,
      loyalty_id: id,
    });
    loyaltyProgress = await hasuraApi(
      session?.token
    ).get_loyalty_progress_by_user_id_by_loyalty({
      user_id: session?.hasura_id,
      loyalty_id: id,
    });

    const { gatewayId } = (
      await hasuraApi(session.token, session.hasura_id).gatewayId()
    ).protocol?.me;

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
      loyaltyProgress?.loyalty_progress?.find((lp) => lp.points) ?? 0;

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
      loyaltyProgress:
        loyaltyProgress?.loyalty_progress?.find((lp) => lp) ?? null,
      ogImage: ogImage ?? null,
    },
  };
};
