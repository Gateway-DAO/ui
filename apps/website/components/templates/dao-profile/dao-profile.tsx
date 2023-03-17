import useTranslation from 'next-translate/useTranslation';

import { TOKENS } from '@gateway/theme';

import { Box, Tabs, Tab } from '@mui/material';

import { query } from '../../../constants/queries';
import { a11yTabProps, TabPanel, useTab } from '../../atoms/tabs';
import { IColumnGrid } from '../../organisms/data-grid/data-grid';
import { useDaoProfile } from './context';
import { DaoHeader } from './dao-header';
import { GatesTab, OverviewTab } from './tabs';
import GridViewTab from './tabs/grid-view-tab';
import StaticGridViewTab from './tabs/static-grid-view-tab';

export function DaoProfileTemplate() {
  const { dao, onRefetchFollowers, followersCount, credentials } =
    useDaoProfile();
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();

  const people = dao?.followers?.map(({ user }) => user) ?? [];

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

  const signersColumns: IColumnGrid[] = [
    {
      column_name: 'user_id',
      header_name: 'User ID',
    },
    {
      column_name: 'role',
      header_name: 'Role',
    },
  ];

  const tabs = [
    {
      key: 'overview',
      label: t('common:tabs.overview'),
      section: (
        <OverviewTab
          people={people}
          setTab={setTab}
          credentials={credentials?.daos_by_pk.gates}
        />
      ),
    },
    {
      key: 'credentials',
      label: 'Earn',
      section: <GatesTab />,
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
    {
      key: 'credentials-signers',
      label: 'Signers',
      section: (
        <StaticGridViewTab
          columns={signersColumns}
          data={dao.protocolOrganization?.organization_accesses}
        />
      ),
    },
  ];

  return (
    <>
      <DaoHeader
        followCount={followersCount}
        onFollow={onRefetchFollowers}
        onUnfollow={onRefetchFollowers}
      />
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
              {...a11yTabProps('dao', index)}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ key, section }, index) => (
        <TabPanel
          key={key}
          tabsId="dao"
          index={index}
          active={index === activeTab}
        >
          {section}
        </TabPanel>
      ))}
    </>
  );
}
