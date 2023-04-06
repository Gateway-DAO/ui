import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { HeadContainer } from '../../components/molecules/head-container';
import { DashboardTemplate } from '../../components/templates/dashboard';
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
        id: {loyalty.id}
        name: {loyalty.name}
        description: {loyalty.description}
        image: {loyalty.image}
        categories: {loyalty.categories}
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.query.id as string;
  const { loyalty_program_by_pk } = await gqlAnonMethods.loyalty({ id });

  return {
    props: {
      loyalty: loyalty_program_by_pk,
    },
  };
};
