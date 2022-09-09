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

  const slug = router.query.slug as string;

  const { me } = useAuth();

  const { data } = useQuery(
    ['dao', slug],
    () =>
      gqlAnonMethods.dao_profile_by_slug({
        slug,
      }),
    {
      initialData: {
        daos: [daoProps],
      },
    }
  );

  const dao = data?.daos?.[0];

  const isAdmin =
    me?.following_dao?.find((fdao) => fdao.dao_id === dao?.id)?.dao?.is_admin ??
    false;

  const peopleQuery = useQuery(
    ['dao-people', dao?.id],
    () => gqlAnonMethods.dao_profile_people({ id: dao.id }),
    { enabled: !!dao?.id }
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
    paths: daos.map((dao) => ({ params: { slug: dao.slug } })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;

  try {
    const { daos } = await gqlAnonMethods.dao_profile_by_slug({ slug });

    return {
      props: {
        daoProps: daos[0],
      },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: {
        daoProps: null,
      },
      revalidate: 60,
    };
  }
};
