import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import {
  DaoProfileTemplate,
  DaoProfileProvider,
} from '../../../components/templates/dao-profile';
import { DashboardTemplate } from '../../../components/templates/dashboard';
import { useAuth } from '../../../providers/auth';
import { gatewayProtocolSDK } from '../../../services/gateway-protocol/api';
import { gqlAnonMethods } from '../../../services/hasura/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function DaoProfilePage({
  daoProps,
  issuedCredentials,
  stats,
}: Props) {
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
        stats={stats}
      >
        <DaoProfileTemplate />
      </DaoProfileProvider>
    </DashboardTemplate>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.query.slug as string;

  const { daos } = await gqlAnonMethods.dao_profile_by_slug({ slug });
  const hasProtocolOrg = !!daos[0].protocolOrganization;
  const protocolOrgId = hasProtocolOrg ? daos[0].protocolOrganization.id : null;
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

  /* const credentials = {
    findCredentialsByIssuerOrganization: [
      {
        id: '3cb2b422-ab62-4452-a457-25b891911b4f',
        title: 'Gateway Core Builder Credential',
        status: 'Valid',
        description:
          'Credential acknowledging Andre for his contributions to Gateway',
        image:
          'https://arweave.net/RXR-VQn3TUV8TjDcYkPCEuM-xdfdlgwWndf_y11YVkE',
        tags: ['Collaboration'],
        createdAt: '2023-03-14T20:39:36.068Z',
        issuerUser: {
          gatewayId: 'sank1',
        },
        recipientUser: {
          gatewayId: 'devfelizardo',
          id: '5581ab7a-1c91-4ec4-9123-03db8d30dbc5',
          primaryWallet: {
            address: '0x2D90ddd83FC928AF9340d26dd637a47E3d4847Ff',
            chain: 'EVM',
          },
        },
      },
      {
        id: '48ba6263-06a5-4bc8-87fb-e3a4e17f5695',
        title: 'Gateway Core Builder Credential',
        status: 'Valid',
        description:
          'Credential acknowledging Lucas for his contributions to Gateway',
        image:
          'https://arweave.net/wwug16dnmz0ooVe7NNZcIn0p_DJyS_QCqU0Z7oXl5Yw',
        tags: ['Collaboration'],
        createdAt: '2023-03-14T20:34:16.359Z',
        issuerUser: {
          gatewayId: 'sank1',
        },
        recipientUser: {
          gatewayId: 'kbooz',
          id: 'bbd3d343-e731-4005-8a3f-65d74474c417',
          primaryWallet: {
            address: '0x3e54d8f06CE568B62F7322197179b70de5dC173d',
            chain: 'EVM',
          },
        },
      },
      {
        id: '192d56d4-886f-4ae1-832e-5ac5a909c1c6',
        title: 'Gateway Core Builder Credential',
        status: 'Valid',
        description:
          'Credential acknowledging Abinesh for his contributions to Gateway (and more to come ;) )',
        image:
          'https://arweave.net/f85505JPzn0_Ojd-gl3CaqnzxvAWne9NvWyfaqFY4IU',
        tags: ['Collaboration'],
        createdAt: '2023-03-14T20:47:52.089Z',
        issuerUser: {
          gatewayId: 'sank1',
        },
        recipientUser: {
          gatewayId: 'stinglike.abi',
          id: 'aebb133b-28a1-473b-8949-248c340278d7',
          primaryWallet: {
            address: '0xB0D1c17591e7f5C17E15CA505F5fE758D6E40B57',
            chain: 'EVM',
          },
        },
      },
      {
        id: '1d8ef809-6d67-4d10-a664-01ec25b75c9d',
        title: 'Gateway Core Builder Credential',
        status: 'Valid',
        description: "Credential to acknowledge Rafa's work at Gateway",
        image:
          'https://arweave.net/e_szXGR6LfYPYYCeC6kVMZT4xtJEzsy1vTsxZKpxaOw',
        tags: ['Collaboration'],
        createdAt: '2023-03-14T20:25:14.269Z',
        issuerUser: {
          gatewayId: 'sank1',
        },
        recipientUser: {
          gatewayId: 'rafanon',
          id: '7094a633-d4a8-4098-afd7-950a9a60f564',
          primaryWallet: {
            address: '0x06B6a260231e3Ff035d28DD88391F1671c4d16D5',
            chain: 'EVM',
          },
        },
      },
    ],
  }; */

  return {
    props: {
      daoProps: daos[0],
      issuedCredentials: credentials
        ? (credentials.findCredentialsByIssuerOrganization as PartialDeep<Credential>[])
        : null,
      stats,
    },
  };
};
