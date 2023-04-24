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
import DataModelTabs from 'apps/website/components/templates/protocol/data-models/show/components/data-model-tabs';
const GridViewTab = dynamic(
  () =>
    import(
      '../../../components/templates/protocol/data-models/show/components/grid-view-tab'
    ),
  { ssr: false }
);

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProtocolDataModelCredentials({
  dataModel,
  stats,
}: Props) {
  const { t } = useTranslation('protocol');
  const credentialGridColumns: IColumnGrid[] = [
    {
      column_name: 'credential_id',
      header_name: `${t('data-model.credentials-table.credential_id')}`,
    },
    {
      column_name: 'category',
      header_name: `${t('data-model.credentials-table.category')}`,
    },
    {
      column_name: 'issuer_id',
      header_name: `${t('data-model.credentials-table.issuer_id')}`,
    },
    {
      column_name: 'recipient_id',
      header_name: `${t('data-model.credentials-table.recipient_id')}`,
    },
    {
      column_name: 'issuance_date',
      header_name: `${t('data-model.credentials-table.issuance_date')}`,
    },
    {
      column_name: 'status',
      header_name: `${t('data-model.credentials-table.status')}`,
    },
    // {
    //   column_name: 'minted',
    //   header_name: `${t('data-model.credentials-table.minted')}`,
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
          <GridViewTab
            dataModel={dataModel}
            columns={credentialGridColumns}
            queryString={query.credentialsByDataModel}
            queryFnName={'findCredentialsByDataModel'}
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
ProtocolDataModelCredentials.PageLayout = DataModelTabs;
