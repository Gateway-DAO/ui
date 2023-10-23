import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { LoyaltyProgram } from '@/components/features/loyalty/loyalty';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { useAuth } from '@/providers/auth';
import { hasuraApi, hasuraPublicService } from '@/services/hasura/api';
import {
  Loyalty_CredentialQuery,
  Loyalty_Program_InfoQuery,
} from '@/services/hasura/types';
import { getServerSession } from '@/services/next-auth/get-server-session';
import { getLoyaltyPassImageURLParams } from '@/utils/loyalty-pass/build-image-url-params';
import { useQuery } from '@tanstack/react-query';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function LoyaltyPage({
  id,
  loyalty,
  loyaltyCredential,
  ogImage,
}: Props) {
  const { me, hasuraUserService } = useAuth();

  const { data: pdas, isLoading } = useQuery(
    ['loyalty-pdas', id],
    () =>
      hasuraUserService.protocol_find_credentials_by_campaign({
        dataModelId: loyalty.data_model_id,
        recipientUserId: me?.protocolUser?.id,
        take: 100,
        skip: 0,
      }),
    { enabled: !!me }
  );

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
          isGatesLoading={isLoading}
          loyaltyCredential={loyaltyCredential}
          credentialsByLoyalty={pdas?.protocol_credential ?? []}
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

  let loyaltyProgram: Loyalty_Program_InfoQuery;
  let loyaltyCredential: Loyalty_CredentialQuery;
  let ogImage;

  if (session) {
    loyaltyProgram = await hasuraApi(session?.token).loyalty_program_info({
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
      id,
      loyalty: loyalty_program_by_pk,
      loyaltyCredential:
        loyaltyCredential?.protocol_credential?.find((lc) => lc) ?? null,
      ogImage: ogImage ?? null,
    },
  };
};
