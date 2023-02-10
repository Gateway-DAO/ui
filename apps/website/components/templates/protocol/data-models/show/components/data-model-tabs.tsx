import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';

import { DateTime } from 'luxon';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Box, Tab, Tabs } from '@mui/material';

import { query } from '../../../../../../constants/queries';
import {
  DataModel,
  GetDataModelStatsQuery,
} from '../../../../../../services/gateway-protocol/types';
import { useTab, TabPanel } from '../../../../../atoms/tabs';
import { IColumnGrid } from '../../../../../organisms/data-grid/data-grid';

const OverviewTab = dynamic(() => import('./overview-tab'), { ssr: false });
const GridViewTab = dynamic(() => import('./grid-view-tab'), { ssr: false });

type Props = {
  dataModel: PartialDeep<DataModel>;
  stats: GetDataModelStatsQuery;
};

export default function DataModelTabs({ dataModel, stats }: Props) {
  const { activeTab, handleTabChange, setTab } = useTab();
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
      field: 'createdAt', //[ ] Change to issued number
    },
  ];

  const recipientsGridColumns: IColumnGrid[] = [
    //[ ] Update all columns
    { column_name: 'issuer_id', header_name: 'Recipient ID' },
    {
      column_name: 'default',
      header_name: 'Received Credentials',
      field: 'id',
    },
    {
      column_name: 'default',
      header_name: 'Minted',
      field: 'id',
    },
  ];

  const tabs = [
    {
      key: 'overview',
      label: t('common:tabs.overview'),
      section: <OverviewTab dataModel={dataModel} stats={stats} />,
    },
    // {
    //   key: 'issuers',
    //   label: t('common:tabs.issuers'),
    //   section: (
    //     <GridViewTab
    //       dataModel={dataModel}
    //       columns={issuersGridColumns}
    //       queryString={query.issuersByDataModel}
    //       queryFnName="findIssuersByDataModel"
    //       pageSize={3}
    //     />
    //   ),
    // },
    // {
    //   key: 'recipients',
    //   label: t('common:tabs.recipients'),
    //   section: (
    //     <GridViewTab
    //       dataModel={dataModel}
    //       columns={recipientsGridColumns}
    //       queryString={query.recipientsByDataModel}
    //       queryFnName={'findRecipientsByDataModel'}
    //       pageSize={3}
    //     />
    //   ),
    // },
    {
      key: 'credentials',
      noPadding: true,
      label: t('common:tabs.credentials'),
      section: (
        <GridViewTab
          dataModel={dataModel}
          columns={credentialGridColumns}
          queryString={query.credentialsByDataModel}
          queryFnName={'findCredentialsByDataModel'}
          pageSize={3}
        />
      ),
    },
    {
      key: 'playground',
      noPadding: true,
      label: t('common:tabs.playground'),
      section: (
        <>
          <iframe
            id="playground"
            src={process.env.NEXT_PUBLIC_GATEWAY_PROTOCOL_ENDPOINT}
            name="playground"
            width="100%"
            height="800"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          px: { xs: 0, md: 4, lg: 6 },
          mt: 4,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            mb: '-1px',
            '& > div': {
              maxWidth: { xs: '350px', md: '100%' },
              overflow: { xs: 'scroll!important', md: 'hidden' },
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            },
          }}
        >
          {tabs.map(({ key, label }) => (
            <Tab
              key={key}
              label={label}
              sx={(theme) => ({
                fontWeight: 700,
                px: 0,
                mr: theme.spacing(3),
                fontSize: '12px',
              })}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ key, noPadding, section }, index) => (
        <TabPanel
          key={key}
          tabsId="protocol"
          index={index}
          active={index === activeTab}
          sx={{
            py: noPadding ? 0 : 3,
            px: noPadding ? 0 : { xs: 0, md: 4, lg: 6 },
          }}
        >
          {section}
        </TabPanel>
      ))}
    </>
  );
}
