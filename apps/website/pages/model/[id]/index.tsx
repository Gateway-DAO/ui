import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { DataModelLayout } from '../../../components/templates/protocol/data-models/show/layout';
import { gatewayProtocolSDK } from '../../../services/gateway-protocol/api';
const OverviewTab = dynamic(
  () =>
    import(
      '../../../components/templates/protocol/data-models/show/components/overview-tab'
    ),
  { ssr: false }
);

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolDataModel({ dataModel, stats }: Props) {
  return <OverviewTab dataModel={dataModel} stats={stats} />;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const dataModel = await gatewayProtocolSDK.dataModel({
    id: ctx.query.id as string,
  });

  const stats = await gatewayProtocolSDK.getDataModelStats({
    dataModelId: ctx.query.id as string,
  });

  return {
    props: {
      dataModel: dataModel?.dataModel,
      stats,
    },
  };
};
ProtocolDataModel.PageLayout = DataModelLayout;
