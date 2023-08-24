import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { DataModelLayout } from '@/components/features/protocol/data-models/view/layout';
import { IColumnGrid } from '@/components/organisms/data-grid/data-grid';
import { query } from '@/constants/queries';
import { hasuraPublicService } from '@/services/hasura/api';

const GridViewTab = dynamic(
  () =>
    import(
      '@/components/features/protocol/data-models/view/components/grid-view-tab'
    ),
  { ssr: false }
);


export function getStaticProps() {
  return {
    notFound: true,
  };
}

export default function ProtocolDataModelCredentials() {
  const { t } = useTranslation('protocol');

  const router = useRouter();

  const { id: dataModelId } = router.query;

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
    <GridViewTab
      dataModelId={dataModelId as string}
      columns={credentialGridColumns}
      queryString={query.credentialsByDataModel}
      queryFn={async ({ pageParam }, pageSize) => {
        const res =
          await hasuraPublicService.protocol_find_credential_by_data_model({
            dataModelId: dataModelId as string,
            take: pageSize,
            skip: pageParam || 0,
          });

        return res.protocol.findCredentialsByDataModel;
      }}
      pageSize={10}
    />
  );
}

ProtocolDataModelCredentials.PageLayout = DataModelLayout;
