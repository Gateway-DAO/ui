import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { HeadContainer } from '../../../components/molecules/head-container';
import {
  DaoProfileTemplate,
  DaoProfileProvider,
} from '../../../components/templates/dao-profile';
import { DashboardTemplate } from '../../../components/templates/dashboard';
import { useAuth } from '../../../providers/auth';
import { gatewayProtocolSDK } from '@/services/gateway-protocol/api';
import { gqlAnonMethods } from '@/services/hasura/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function DaoProfilePage({
  daoProps,
  loyaltyPrograms,
  issuedCredentials,
  stats,
}: Props) {
  const { me, gqlAuthMethods } = useAuth();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const isAdmin =
    me?.following_dao?.find((fdao) => fdao.dao_id === daoProps?.id)?.dao
      ?.is_admin ?? false;

  const credentialsQuery = useQuery(
    ['dao-gates', daoProps?.id],
    () => gqlAuthMethods.dao_gates_tab({ id: daoProps.id }),
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
          <DaoProfileTemplate />
        </DaoProfileProvider>
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.query.slug as string;

  const { daos } = await gqlAnonMethods.dao_profile_by_slug({ slug });
  const currentDao = daos[0];
  const hasProtocolOrg = !!currentDao.protocolOrganization;
  const protocolOrgId = hasProtocolOrg
    ? currentDao.protocolOrganization.id
    : null;
  const credentials = hasProtocolOrg
    ? await gatewayProtocolSDK.findCredentialsByIssuerOrganization({
        issuerOrganizationId: protocolOrgId,
        skip: 0,
        take: 5,
      })
    : null;
  const stats = hasProtocolOrg
    ? await gatewayProtocolSDK.getDaoStats({
        organizationId: protocolOrgId,
      })
    : null;

  const { loyalty_program: loyaltyPrograms } =
    await gqlAnonMethods.loyalty_programs_by_organization_id({
      id: currentDao.id,
    });

  return {
    props: {
      daoProps: currentDao,
      loyaltyPrograms,
      issuedCredentials: credentials
        ? (credentials.findCredentialsByIssuerOrganization as PartialDeep<Credential>[])
        : null,
      stats,
    },
  };
};
