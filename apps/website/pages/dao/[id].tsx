import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import { DaoProfileTemplate } from '../../components/templates/dao-profile';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { gqlAnonMethods } from '../../services/api';

export default function DaoProfilePage({
  daoProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!daoProps?.daos_by_pk) return null;
  const { daos_by_pk: dao } = daoProps;
  return (
    <DashboardTemplate
      currentDao={dao}
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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { daos } = await gqlAnonMethods.dao_pages();

  return {
    paths: daos.map((dao) => ({ params: { id: dao.id } })),
    fallback: 'blocking', //TODO: add loading state and change to fallback: true
  };
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;

  const daoProps = await gqlAnonMethods.dao_profile({
    id,
  });

  return {
    props: {
      daoProps,
    },
    revalidate: 60,
  };
};
