import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { Box, Tab, Tabs } from '@mui/material';

import {
  DataModel,
  GetDataModelStatsQuery,
} from '../../../../../../services/gateway-protocol/types';
import { useTab, TabPanel } from '../../../../../atoms/tabs';
import GridViewTab from './grid-view-tab';

const OverviewTab = dynamic(() => import('./overview-tab'), { ssr: false });

type Props = {
  dataModel: PartialDeep<DataModel>;
  stats: GetDataModelStatsQuery;
};

export default function DataModelTabs({ dataModel, stats }: Props) {
  const { activeTab, handleTabChange, setTab } = useTab();
  const { t } = useTranslation('protocol');

  const credentialGridColumns = [
    'credential_id',
    'category',
    'issuer_id',
    'recipient_id',
    'issuance_date',
    'status',
    'minted',
  ];

  const credentialData = [
    {
      id: 'bd750ea8-8666-4195-859d-acfebf06b8ac',
      title: 'Valid Person Credential',
      image: '',
      createdAt: '2023-01-31T15:21:23.112Z',
      status: 'Valid',
      tags: [],
    },
    {
      id: '6814d47a-3571-4092-8ab5-8e5a34a52ec1',
      title: 'Valid Person Credential',
      image: '',
      createdAt: '2023-01-31T17:51:43.238Z',
      status: 'Revoked',
      tags: [],
    },
    {
      id: 'yh14d47a-3571-4092-8ab5-8e5a34a52ec1',
      title: 'Person Credential',
      image: '',
      createdAt: '2023-01-31T17:51:43.238Z',
      status: 'Invalid',
      tags: [],
    },
  ];

  const tabs = [
    {
      key: 'overview',
      label: t('common:tabs.overview'),
      section: <OverviewTab dataModel={dataModel} stats={stats} />,
    },
    {
      key: 'issuers',
      label: t('common:tabs.issuers'),
      section: <>Issuers</>,
    },
    {
      key: 'recipients',
      label: t('common:tabs.recipients'),
      section: <>Recipients</>,
    },
    {
      key: 'credentials',
      noPadding: true,
      label: t('common:tabs.credentials'),
      section: (
        <GridViewTab
          dataModel={dataModel}
          columns={credentialGridColumns}
          data={credentialData}
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
