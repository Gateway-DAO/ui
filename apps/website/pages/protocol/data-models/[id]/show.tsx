import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { HeadContainer } from '../../../../components/molecules/head-container';
import { DashboardTemplate } from '../../../../components/templates/dashboard';
import {
  ProtocolTemplate,
  DataModelShow,
} from '../../../../components/templates/protocol';
import { gatewayProtocolSDK } from '../../../../services/gateway-protocol/api';
import { gqlAnonMethods } from 'apps/website/services/hasura/api';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolDataModel({
  dataModel,
  stats,
  statsUntilYesterday,
}: Props) {
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
          <DataModelShow
            dataModel={dataModel}
            stats={stats}
            statsUntilYesterday={statsUntilYesterday}
          />
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

  // const getDMStatsUntilYesterday =
  //   await gqlAnonMethods.getDMStatsUntilDayBefore({
  //     dataModelId: ctx.query.id as string,
  //     date: new Date().toISOString(),
  //   });
  const getDMStatsUntilYesterday = {
    credential_count: { aggregate: { count: 10 } },
    issuer_count: { aggregate: { count: 10 } },
    recipient_count: { aggregate: { count: 10 } },
  };
  return {
    props: {
      dataModel: dataModel?.dataModel,
      stats,
      statsUntilYesterday: getDMStatsUntilYesterday,
    },
  };
};
