import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import {
  DaoProfileTemplate,
  DaoProfileProvider,
} from '../../../components/templates/dao-profile';
import { DashboardTemplate } from '../../../components/templates/dashboard';
import { useAuth } from '../../../providers/auth';
import { gqlAnonMethods } from '../../../services/api';

export default function DaoProfilePage({
  daoProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const id = router.query.id as string;

  const { me } = useAuth();

  const { data } = useQuery(
    ['dao', id],
    () =>
      gqlAnonMethods.dao_profile({
        id: router.query.id as string,
      }),
    {
      initialData: daoProps,
    }
  );

  const { daos_by_pk: dao } = data ?? {};

  const isAdmin =
    me?.following_dao?.find((fdao) => fdao.dao_id === id)?.dao?.is_admin ??
    false;

  const peopleQuery = useQuery(
    ['dao-people', id],
    () => gqlAnonMethods.dao_profile_people({ id }),
    { enabled: !!id }
  );

  const onResetPeopleQuery = () => {
    peopleQuery.refetch();
  };

  if (!dao) return null;
  return (
    <DashboardTemplate
      currentDao={dao}
      containerProps={{
        sx: {
          overflow: 'hidden',
        },
      }}
    >
      <DaoProfileProvider
        dao={dao}
        isAdmin={isAdmin}
        followers={peopleQuery.data}
        followersIsLoaded={peopleQuery.isSuccess}
        onRefetchFollowers={onResetPeopleQuery}
      >
        <DaoProfileTemplate />
      </DaoProfileProvider>
    </DashboardTemplate>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { daos } = await gqlAnonMethods.dao_pages();

  return {
    paths: daos.map((dao) => ({ params: { id: dao.id } })),
    fallback: true,
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
