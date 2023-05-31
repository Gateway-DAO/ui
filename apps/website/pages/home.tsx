import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';

import { HeadContainer } from '../components/molecules/head-container';
import { DashboardTemplate } from '../components/templates/dashboard';
import { ExploreTemplate } from '../components/templates/explore';
import { gqlAnonMethods } from '../services/hasura/api';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

const HARDCODED_DAOS = ['spice-finance', 'altitude', 'lifi'];

export const getStaticProps = async () => {
  const exploreProps = await gqlAnonMethods.get_home({
    daos_where: {
      slug: { _in: HARDCODED_DAOS },
    },
  });

  const dataModels = await gqlAnonMethods.dataModels({ skip: 0, take: 4 });

  return {
    props: {
      exploreProps,
      dataModels: dataModels.protocol_data_model,
    },
    revalidate: 10,
  };
};

export default function Explore({
  exploreProps,
  dataModels,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('explore');

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
        <ExploreTemplate
          title={t('title')}
          subtitle={t('subtitle')}
          data={data}
          dataModels={dataModels}
        />
      </DashboardTemplate>
    </>
  );
}
