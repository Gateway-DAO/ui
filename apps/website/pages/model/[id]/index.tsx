import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { HeadContainer } from '../../../components/molecules/head-container';
import { DashboardTemplate } from '../../../components/templates/dashboard';
import {
  ProtocolTemplate,
  DataModelShow,
} from '../../../components/templates/protocol';
import { gatewayProtocolSDK } from '../../../services/gateway-protocol/api';
import DataModelTabs from 'apps/website/components/templates/protocol/data-models/show/components/data-model-tabs';
const OverviewTab = dynamic(
  () =>
    import(
      '../../../components/templates/protocol/data-models/show/components/overview-tab'
    ),
  { ssr: false }
);

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolDataModel({ dataModel, stats }: Props) {
  return (
    <>
      <HeadContainer title={`${dataModel.title} Data Model`} />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: '',
          },
          height: '100%',
        }}
      >
        <ProtocolTemplate>
          <OverviewTab dataModel={dataModel} stats={stats} />
        </ProtocolTemplate>
      </DashboardTemplate>
    </>
  );
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
ProtocolDataModel.PageLayout = DataModelTabs;
