import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { DataModelLayout } from '@/components/features/protocol/data-models/view/layout';
import { IColumnGrid } from '@/components/organisms/data-grid/data-grid';
import { query } from '@/constants/queries';

const GridViewTab = dynamic(
  () =>
    import(
      '@/components/features/protocol/data-models/view/components/grid-view-tab'
    ),
  { ssr: false }
);

export default function ProtocolDataModelRecipients() {
  // const { t } = useTranslation('protocol');
  const router = useRouter();

  const { id: dataModelId } = router.query;
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
    <GridViewTab
      dataModelId={dataModelId as string}
      columns={recipientsGridColumns}
      queryString={query.recipientsByDataModel}
      queryFnName="protocol_find_recipients_by_data_model_api"
      pageSize={10}
    />
  );
}

ProtocolDataModelRecipients.PageLayout = DataModelLayout;
