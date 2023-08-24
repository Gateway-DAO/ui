import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { DataModelLayout } from '@/components/features/protocol/data-models/view/layout';
const OverviewTab = dynamic(
  () =>
    import(
      '@/components/features/protocol/data-models/view/components/overview-tab'
    ),
  { ssr: false }
);

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolDataModel({
  dataModel,
  stats,
  dataModelStatsUntilDayBefore,
}: Props) {
  return (
    <OverviewTab
      dataModel={dataModel}
      stats={stats}
      statsUntilYesterday={dataModelStatsUntilDayBefore}
    />
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {


  return {
    notFound: true,
  };
 
};
ProtocolDataModel.PageLayout = DataModelLayout;
