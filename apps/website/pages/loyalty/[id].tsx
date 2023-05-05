import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { useQuery } from '@tanstack/react-query';

import { HeadContainer } from '../../components/molecules/head-container';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { LoyaltyProgram } from '../../components/templates/loyalty-program/LoyaltyProgram';
import { query } from '../../constants/queries';
import { useAuth } from '../../providers/auth';
import { gqlAnonMethods } from '../../services/hasura/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function LoyaltyPage({ loyalty }: Props) {
  const { me, gqlAuthMethods } = useAuth();

  const { data: protocolCredential } = useQuery(
    [
      query.protocol_credential_by_loyalty_id_by_gate_id,
      {
        user_id: me?.id,
        loyalty_id: loyalty?.id,
        gate_id: null,
      },
    ],
    () =>
      gqlAuthMethods.protocol_credential_by_loyalty_id_by_gate_id({
        user_id: me?.id,
        loyalty_id: loyalty?.id,
        gate_id: null,
      }),
    {
      enabled: !!me?.id,
      select: ({ loyalty_protocol_credential }) =>
        loyalty_protocol_credential.credential,
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
  const { loyalty_program_by_pk } = await gqlAnonMethods.loyalty_program({
    id,
  });

  return {
    props: {
      loyalty: loyalty_program_by_pk,
    },
  };
};
