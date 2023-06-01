import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { IColumnGrid } from '@/components/organisms/data-grid/data-grid';
import { DataModelLayout } from '@/components/features/protocol/data-models/view/layout';
import { query } from '@/constants/queries';
import { DateTime } from 'luxon';
const GridViewTab = dynamic(
  () =>
    import(
      '@/components/features/protocol/data-models/view/components/grid-view-tab'
    ),
  { ssr: false }
);

export default function ProtocolDataModelIssuers() {
  const { t } = useTranslation('protocol');
  const router = useRouter();

  const { id: dataModelId } = router.query;
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
    <GridViewTab
      dataModelId={dataModelId as string}
      columns={issuersGridColumns}
      queryString={query.issuersByDataModel}
      queryFnName="findIssuersByDataModel"
      pageSize={10}
    />
  );
}

ProtocolDataModelIssuers.PageLayout = DataModelLayout;
