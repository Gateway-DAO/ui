import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { LoyaltyProgram } from '@/components/features/loyalty/loyalty';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { hasuraApi, hasuraPublicService } from '@/services/hasura/api';
import { getServerSession } from '@/services/next-auth/get-server-session';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function LoyaltyPage({
  loyalty,
  credentialsByLoyalty,
  loyaltyProgress,
}: Props) {
  return (
    <>
      <HeadContainer
        title={`${loyalty.name} Loyalty`}
        description={loyalty.description}
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

  const { loyalty_program_by_pk } = await hasuraPublicService.loyalty_program({
    id,
  });

  let loyaltyProgress;
  let credentials;

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
  }

  return {
    props: {
      loyalty: loyalty_program_by_pk,
      credentialsByLoyalty: credentials?.credentials ?? [],
      loyaltyProgress:
        loyaltyProgress?.loyalty_progress?.find((lp) => lp) ?? null,
    },
  };
};
