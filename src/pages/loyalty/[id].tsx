import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { LoyaltyProgram } from '@/components/features/loyalty/loyalty';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { hasuraPublicService } from '@/services/hasura/api';
import { useQuery } from '@tanstack/react-query';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function LoyaltyPage({ loyalty }: Props) {
  const { me, gqlAuthMethods, authenticated } = useAuth();

  const { data: protocolCredential } = useQuery(
    [
      query.protocol_credential_by_loyalty_id,
      {
        user_id: me?.id,
        loyalty_id: loyalty?.id,
      },
    ],
    () =>
      gqlAuthMethods.get_protocol_by_loyalty_id({
        user_id: me?.id,
        loyalty_id: loyalty?.id,
      }),
    {
      enabled: authenticated,
      select: ({ get_protocol_by_loyalty_id }) =>
        get_protocol_by_loyalty_id.credential,
    }
  );

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
          protocolCredential={protocolCredential}
        />
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.query.id as string;
  const { loyalty_program_by_pk } = await hasuraPublicService.loyalty_program({
    id,
  });

  return {
    props: {
      loyalty: loyalty_program_by_pk,
    },
  };
};
