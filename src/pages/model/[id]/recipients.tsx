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

export default function ProtocolDataModelRecipients() {
  const router = useRouter();

  const { id: dataModelId } = router.query;
  const recipientsGridColumns: IColumnGrid[] = [
    { column_name: 'recipient_id_issuers', header_name: 'Recipient ID' },
    {
      column_name: 'default',
      header_name: 'Received Credentials',
      field: 'totalOfreceivedCredentials',
    },
  ];

  return (
    <GridViewTab
      dataModelId={dataModelId as string}
      columns={recipientsGridColumns}
      queryString={query.recipientsByDataModel}
      queryFn={async ({ pageParam }, pageSize) => {
        const res =
          await hasuraPublicService.protocol_find_recipients_by_data_model_api({
            dataModelId: dataModelId as string,
            take: pageSize,
            skip: pageParam || 0,
          });

        return res.protocol.findRecipientsByDataModel;
      }}
      pageSize={10}
    />
  );
}

ProtocolDataModelRecipients.PageLayout = DataModelLayout;
