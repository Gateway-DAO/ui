import {
  GetServerSidePropsContext,
  GetStaticPaths,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import {
  DaoProfileTemplate,
  DaoProfileProvider,
} from '../../../components/templates/dao-profile';
import { DashboardTemplate } from '../../../components/templates/dashboard';
import { useAuth } from '../../../providers/auth';
import {
  gatewayProtocolAuthSDK,
  gatewayProtocolSDK,
} from '../../../services/gateway-protocol/api';
import { gqlAnonMethods } from '../../../services/hasura/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function DaoProfilePage({ daoProps, issuedCredentials }: Props) {
  const { me, gqlAuthMethods } = useAuth();

  const isAdmin =
    me?.following_dao?.find((fdao) => fdao.dao_id === daoProps?.id)?.dao
      ?.is_admin ?? false;

  const credentialsQuery = useQuery(
    ['dao-gates', daoProps?.id],
    () => gqlAuthMethods.dao_gates_tab({ id: daoProps.id }),
    { enabled: !!daoProps?.id }
  );

  return (
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
        onRefetchFollowers={() => console.log('observe')}
        issuedCredentials={issuedCredentials}
      >
        <DaoProfileTemplate />
      </DaoProfileProvider>
    </DashboardTemplate>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.query.slug as string;

  const { daos } = await gqlAnonMethods.dao_profile_by_slug({ slug });
  const credentials = daos[0].protocolOrganization
    ? await gatewayProtocolSDK.findCredentialsByIssuerOrganization({
        issuerOrganizationId: daos[0].protocolOrganization.id,
        skip: 0,
        take: 5,
      })
    : null;

  return {
    props: {
      daoProps: daos[0],
      issuedCredentials: credentials
        ? credentials.findCredentialsByIssuerOrganization
        : null,
    },
  };
};
