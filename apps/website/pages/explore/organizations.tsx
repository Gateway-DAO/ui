import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';

import { HeadContainer } from '../../components/molecules/head-container';
import { DashboardTemplate } from '../../components/templates/dashboard';
import {
  AllTab,
  DaosTab,
  ExploreTemplate,
  GatesTab,
} from '../../components/templates/explore';
import { gatewayProtocolSDK } from '../../services/gateway-protocol/api';
import { gqlAnonMethods } from '../../services/hasura/api';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

const HARDCODED_DAOS = ['goldfinch', 'cyberconnect', 'lifi'];

export const getStaticProps = async () => {
  const exploreProps = await gqlAnonMethods.get_home({
    daos_where: {
      slug: { _in: HARDCODED_DAOS },
    },
  });

  const dataModels = await gatewayProtocolSDK.dataModels({ skip: 0, take: 4 });

  return {
    props: {
      exploreProps,
      dataModels: dataModels.dataModels,
    },
    revalidate: 10,
  };
};

export default function Earn({
  exploreProps,
  dataModels,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const HARDCODED_DAOS = ['goldfinch', 'cyberconnect', 'lifi'];

  const { data } = useQuery(
    ['explore'],
    () =>
      gqlAnonMethods.get_home({
        daos_where: {
          slug: { _in: HARDCODED_DAOS },
        },
      }),
    {
      initialData: exploreProps,
    }
  );

  if (!data) return null;

  return (
    <>
      <HeadContainer />
      <DashboardTemplate
        containerProps={{
          sx: {
            pt: 2,
            overflow: 'hidden',
          },
        }}
      >
        <ExploreTemplate />
        <DaosTab />
      </DashboardTemplate>
    </>
  );
}
