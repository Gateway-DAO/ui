import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { consumers } from 'stream';

import { DaoProfileTemplate } from '../../components/templates/dao-profile';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { gqlMethods } from '../../services/api';
import { Dao_ProfileQuery } from '../../services/graphql/types.generated';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
      props: {
        exploreProps: undefined,
      },
    };
  }

  /* TODO: Redirect if is new user */

  const { id } = params;

  const daoProps = await gqlMethods(session.user).dao_profile({
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
}: {
  daoProps?: Dao_ProfileQuery;
}) {
  if (!daoProps) return null;
  const { daos_by_pk: dao } = daoProps;
  console.log(dao);
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
