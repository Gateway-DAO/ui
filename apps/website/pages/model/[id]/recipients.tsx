import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { HeadContainer } from '../../../components/molecules/head-container';
import { DashboardTemplate } from '../../../components/templates/dashboard';
import {
  ProtocolTemplate,
  DataModelShow,
} from '../../../components/templates/protocol';
import { gatewayProtocolSDK } from '../../../services/gateway-protocol/api';
import { query } from 'apps/website/constants/queries';
import useTranslation from 'next-translate/useTranslation';
import { IColumnGrid } from 'apps/website/components/organisms/data-grid/data-grid';
import { DataModelsTab } from 'apps/website/components/templates/explore';
const GridViewTab = dynamic(
  () =>
    import(
      '../../../components/templates/protocol/data-models/show/components/grid-view-tab'
    ),
  { ssr: false }
);

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolDataModelRecipients({
  dataModel,
  stats,
}: Props) {
  const { t } = useTranslation('protocol');
  const recipientsGridColumns: IColumnGrid[] = [
    { column_name: 'recipient_id_issuers', header_name: 'Recipient ID' },
    {
      column_name: 'default',
      header_name: 'Received Credentials',
      field: 'totalOfreceivedCredentials',
    },
    // {
    //   column_name: 'default',
    //   header_name: 'Minted',
    //   field: 'id',
    // },
  ];

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
          <DataModelShow dataModel={dataModel} stats={stats} />
          <GridViewTab
            dataModel={dataModel}
            columns={recipientsGridColumns}
            queryString={query.recipientsByDataModel}
            queryFnName={'findRecipientsByDataModel'}
            pageSize={10}
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

  return {
    props: {
      dataModel: dataModel?.dataModel,
      stats,
    },
  };
};
ProtocolDataModelRecipients.PageLayout = DataModelsTab;
