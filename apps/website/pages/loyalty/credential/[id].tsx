import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { HeadContainer } from '../../../components/molecules/head-container';
import { DashboardTemplate } from '../../../components/templates/dashboard';
import { LoyaltyProgramCredential } from '../../../components/templates/loyalty-program/credential/LoyaltyProgramCredential';
import { gqlAnonMethods } from '../../../services/hasura/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function LoyaltyCredentialPage({ loyalty, gate }: Props) {
  return (
    <>
      <HeadContainer
        title={`${gate.title} Credential`}
        description={gate.description}
      />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: 'hidden',
          },
        }}
      >
        <LoyaltyProgramCredential gate={gate} loyalty={loyalty} />
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.query.id as string;

  const { gates_by_pk } = await gqlAnonMethods.gate({ id });
  const { loyalty_program_by_pk } = await gqlAnonMethods.loyalty_program({
    id: gates_by_pk.loyalty_id,
  });

  return {
    props: {
      loyalty: loyalty_program_by_pk,
      gate: gates_by_pk,
    },
  };
};
