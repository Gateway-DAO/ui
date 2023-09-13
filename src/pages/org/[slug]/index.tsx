import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import {
  DaoProfile,
  DaoProfileProvider,
} from '@/components/features/daos/view';
import { HeadContainer } from '@/components/molecules/head-container';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { useAuth } from '@/providers/auth';
import { hasuraApi, hasuraPublicService } from '@/services/hasura/api';
import { getServerSession } from '@/services/next-auth/get-server-session';
import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function DaoProfilePage({
  daoProps,
  loyaltyPrograms,
  issuedCredentials,
  stats,
}: Props) {
  const { me, hasuraUserService } = useAuth();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const isAdmin =
    me?.following_dao?.find((fdao) => fdao.dao_id === daoProps?.id)?.dao
      ?.is_admin ?? false;

  const credentialsQuery = useQuery(
    ['dao-gates', daoProps?.id],
    () => hasuraUserService.dao_gates_tab({ id: daoProps.id }),
    { enabled: !!daoProps?.id }
  );

  return (
    <>
      <HeadContainer
        title={`${daoProps.name} DAO`}
        description={daoProps.description}
      />
      <DashboardTemplate
        currentDao={daoProps}
        containerProps={{
          sx: {
            overflow: 'hidden',
          },
        }}
      >
        <DaoProfileProvider
          dao={daoProps}
          isAdmin={isAdmin}
          followersCount={daoProps.followers_aggregate?.aggregate.count}
          credentials={credentialsQuery.data}
          onRefetchFollowers={refreshData}
          issuedCredentials={issuedCredentials}
          stats={stats}
          loyaltyPrograms={loyaltyPrograms}
        >
          <DaoProfile />
        </DaoProfileProvider>
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.query.slug as string;

  const session = await getServerSession(ctx.req, ctx.res);

  const { daos } = await hasuraApi(session?.token).dao_profile_by_slug({
    slug,
  });

  const currentDao = daos[0];
  if (!currentDao) {
    return {
      redirect: {
        destination: '/explore',
        permanent: false,
      },
    };
  }

  const hasProtocolOrg = !!currentDao?.protocolOrganization;
  const protocolOrgId = hasProtocolOrg
    ? currentDao.protocolOrganization?.id
    : null;
  const credentials = hasProtocolOrg
    ? await hasuraPublicService.protocol_find_credentials_by_issuer_organization(
        {
          issuerOrganizationId: protocolOrgId,
          skip: 0,
          take: 5,
        }
      )
    : null;
  const stats = hasProtocolOrg
    ? await hasuraPublicService.protocol_get_dao_stats({
        organizationId: protocolOrgId,
      })
    : null;

  const { loyalty_program: loyaltyPrograms } =
    await hasuraPublicService.loyalty_programs_by_organization_id({
      id: currentDao.id,
    });

  return {
    props: {
      daoProps: currentDao,
      loyaltyPrograms,
      issuedCredentials: credentials
        ? (credentials.protocol_credential as PartialDeep<Credential>[])
        : null,
      stats,
    },
  };
};
