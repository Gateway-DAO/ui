import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { HeadContainer } from '@/components/molecules/head-container';
import { AllTab, ExploreLayout } from '@/components/features/explore';
import { gqlAnonMethods } from '@/services/hasura/api';
import { useQuery } from '@tanstack/react-query';

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

  const dataModels = await gqlAnonMethods.dataModelsP2P({ skip: 0, take: 4 });

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
      <HeadContainer
        title={t('meta-data.all-title')}
        description={t('meta-data.all-description')}
      />
      <AllTab {...data} dataModels={dataModels} />
    </>
  );
}

Explore.PageLayout = ExploreLayout;
