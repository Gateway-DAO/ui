import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { DateTime } from 'luxon';
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
import DataModelTabs from 'apps/website/components/templates/protocol/data-models/show/components/data-model-tabs';
const GridViewTab = dynamic(
  () =>
    import(
      '../../../components/templates/protocol/data-models/show/components/grid-view-tab'
    ),
  { ssr: false }
);

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolDataModelIssuers({ dataModel, stats }: Props) {
  const { t } = useTranslation('protocol');
  const issuersGridColumns: IColumnGrid[] = [
    {
      column_name: 'issuer_id_issuers',
      header_name: `${t('data-model.issuers-table.issuer_id')}`,
    },
    {
      column_name: 'issuance_date',
      header_name: `${t('data-model.issuers-table.started')}`,
      valueGetter: (params) =>
        DateTime.fromISO(params.createdAt).toFormat('MM/dd, yyyy'),
    },
    {
      column_name: 'default',
      header_name: `${t('data-model.issuers-table.issued')}`,
      field: 'totalOfIssuedCredentials',
    },
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
          <GridViewTab
            dataModel={dataModel}
            columns={issuersGridColumns}
            queryString={query.issuersByDataModel}
            queryFnName="findIssuersByDataModel"
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
ProtocolDataModelIssuers.PageLayout = DataModelTabs;
