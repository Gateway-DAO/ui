import { InferGetServerSidePropsType } from 'next';

import { DaoProfileTemplate } from '../../components/templates/dao-profile';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { withAuth } from '../../utils/withAuth';

export const getServerSideProps = withAuth(async ({ gql, ctx: { params } }) => {
  const { id } = params;

  const daoProps = await gql.dao_profile({
    id,
  });

  return {
    props: {
      daoProps,
    },
  };
});

export default function DaoProfilePage({
  daoProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
