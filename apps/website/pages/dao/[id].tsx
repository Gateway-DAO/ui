import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { DaoProfileTemplate } from '../../components/templates/dao-profile';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { gqlAnonMethods } from '../../services/api';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { id } = params;

  const daoProps = await gqlAnonMethods.dao_profile({
    id,
  });

  return {
    props: {
      daoProps,
    },
  };
};

export default function DaoProfilePage({
  daoProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!daoProps) return null;
  const { daos_by_pk: dao } = daoProps;
  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          overflow: 'hidden',
        },
      }}
    >
      <DaoProfileTemplate dao={dao} />
    </DashboardTemplate>
  );
}
