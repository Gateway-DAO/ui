import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { HeadContainer } from '../../components/molecules/head-container';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { LayoutProgramContextProvider } from '../../components/templates/loyalty-program/LoyaltyProgramContext';
import { LoyaltyProgram } from '../../components/templates/loyalty-program/loyalty-program/LoyaltyProgram';
import { gqlAnonMethods } from '../../services/hasura/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function LoyaltyPage({ loyalty }: Props) {
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
        <LayoutProgramContextProvider>
          <LoyaltyProgram loyalty={loyalty} />
        </LayoutProgramContextProvider>
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
