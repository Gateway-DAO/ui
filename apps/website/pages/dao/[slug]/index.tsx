import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { validate as validateUuid } from 'uuid';

import {
  DaoProfileTemplate,
  DaoProfileProvider,
} from '../../../components/templates/dao-profile';
import { DashboardTemplate } from '../../../components/templates/dashboard';
import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../../../providers/auth';
import { gqlAnonMethods } from '../../../services/api';

export default function DaoProfilePage({
  dao: daoProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const slug = router.query.slug as string;

  const { me, gqlAuthMethods } = useAuth();

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

  const credentialsQuery = useQuery(
    ['dao-gates', dao?.id],
    () => gqlAuthMethods.dao_gates_tab({ id: dao.id }),
    { enabled: !!dao?.id }
  );

  const onResetPeopleQuery = () => {
    peopleQuery.refetch();
  };

  // TODO: validate this
  useEffect(() => {
    credentialsQuery.refetch();
  }, [me]);

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
        credentials={credentialsQuery.data}
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
    // If slug is a UUID, then we redirect to the DAO profile page with the correct slug
    if (validateUuid(slug)) {
      const { daos_by_pk: dao } = await gqlAnonMethods.dao_profile_slug_by_id({
        id: slug,
      });
      return {
        redirect: {
          destination: ROUTES.DAO_PROFILE.replace('[slug]', dao.slug),
          permanent: true,
        },
      };
    }

    const { daos } = await gqlAnonMethods.dao_profile_by_slug({ slug });

    return {
      props: {
        dao: daos[0],
      },
      revalidate: 60,
    };
  } catch (err) {
    return {
      redirect: {
        destination: ROUTES.EXPLORE,
        permanent: true,
      },
    };
  }
};
