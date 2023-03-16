import useTranslation from 'next-translate/useTranslation';

import { TOKENS } from '@gateway/theme';

import { Box, Tab, Tabs } from '@mui/material';

import { query } from '../../../../../constants/queries';
import { useTab, TabPanel, a11yTabProps } from '../../../../atoms/tabs';
import { IColumnGrid } from '../../../../organisms/data-grid/data-grid';
import GridViewTab from './components/grid-view-tab';
import { Header } from './components/header';
import OverviewTab from './components/overview-tab';

export function OrganizationProfileTemplate() {
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();

  const issuedColumns: IColumnGrid[] = [
    {
      column_name: 'credential_id',
      header_name: 'Credential ID',
    },
    {
      column_name: 'category',
      header_name: 'Category',
    },
    {
      column_name: 'recipient_id',
      header_name: 'Recipient ID',
    },
    {
      column_name: 'issuance_date',
      header_name: 'Issuance Date',
    },
    {
      column_name: 'status',
      header_name: 'Status',
    },
  ];

  const tabs = [
    {
      key: 'overview',
      label: t('common:tabs.overview'),
      section: <OverviewTab setActiveTab={setTab} />,
    },
    {
      key: 'credentials-issued',
      label: t('common:tabs.issued'),
      section: (
        <GridViewTab
          columns={issuedColumns}
          queryString={query.credentialsIssuedByOrg}
          queryFnName="findCredentialsByIssuerOrganization"
          parameterName="issuerOrganizationId"
          pageSize={20}
        />
      ),
    },
  ];

  return (
    <>
      <Header />
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          px: TOKENS.CONTAINER_PX,
          mt: 4,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          sx={{
            mb: '-1px',
          }}
        >
          {tabs.map(({ key, label }, index) => (
            <Tab
              key={key}
              label={label}
              sx={(theme) => ({
                fontWeight: 700,
                px: 0,
                mr: theme.spacing(3),
              })}
              {...a11yTabProps('organization', index)}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ key, section }, index) => (
        <TabPanel
          key={key}
          tabsId="organization"
          index={index}
          active={index === activeTab}
        >
          <Box sx={{ px: 3 }}>{section}</Box>
        </TabPanel>
      ))}
    </>
  );
}
