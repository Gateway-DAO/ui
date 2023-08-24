import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { DataModelLayout } from '@/components/features/protocol/data-models/view/layout';
import { hasuraPublicService } from '@/services/hasura/api';
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
  // const dataModel = await hasuraPublicService.protocol_data_model({
  //   id: ctx.query.id as string,
  // });

  // const stats = await hasuraPublicService.protocol_get_data_model_stats({
  //   dataModelId: ctx.query.id as string,
  // });

  // const now = new Date();
  // const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  // const isoYesterday = yesterday.toISOString();

  // const dataModelStatsUntilDayBefore =
  //   await hasuraPublicService.getDMStatsUntilDayBefore({
  //     dataModelId: ctx.query.id as string,
  //     date: isoYesterday,
  //   });

  return {
    notFound: true,
  };
  // return {
  //   props: {
  //     dataModel: dataModel?.protocol?.dataModel,
  //     stats,
  //     dataModelStatsUntilDayBefore,
  //   },
  // };
};
ProtocolDataModel.PageLayout = DataModelLayout;
