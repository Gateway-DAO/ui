import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { IColumnGrid } from '../../../components/organisms/data-grid/data-grid';
import { DataModelsTab } from '../../../components/templates/explore';
import { DataModelLayout } from '../../../components/templates/protocol/data-models/show/layout';
import { query } from '../../../constants/queries';

const GridViewTab = dynamic(
  () =>
    import(
      '../../../components/templates/protocol/data-models/show/components/grid-view-tab'
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
      queryFnName="findRecipientsByDataModel"
      pageSize={10}
    />
  );
}

ProtocolDataModelRecipients.PageLayout = DataModelLayout;
