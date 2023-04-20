import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, Tabs, Tab } from '@mui/material';

import { query } from '../../../constants/queries';
import { a11yTabProps, TabPanel, useTab } from '../../atoms/tabs';
import { IColumnGrid } from '../../organisms/data-grid/data-grid';
import { useDaoProfile } from './context';
import { DaoHeader } from './dao-header';
import { GatesTab, OverviewTab } from './tabs';
import GridViewTab from './tabs/grid-view-tab';
import PassesTab from './tabs/passes-tab';
import StaticGridViewTab from './tabs/static-grid-view-tab';

export function DaoProfileTemplate() {
  const {
    dao,
    onRefetchFollowers,
    followersCount,
    credentials,
    loyaltyPrograms,
  } = useDaoProfile();
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();

  const people = dao?.followers?.map(({ user }) => user) ?? [];
  const hasProtocolOrganization = !!dao.protocolOrganization;

  const issuedColumns: IColumnGrid[] = [
    {
      column_name: 'credential_id',
      header_name: `${t('dao-profile:issued-tab.grid-columns.credential_id')}`,
    },
    {
      column_name: 'category',
      header_name: `${t('dao-profile:issued-tab.grid-columns.category')}`,
    },
    {
      column_name: 'recipient_id',
      header_name: `${t('dao-profile:issued-tab.grid-columns.recipient_id')}`,
    },
    {
      column_name: 'issuance_date',
      header_name: `${t('dao-profile:issued-tab.grid-columns.issuance_date')}`,
    },
    {
      column_name: 'status',
      header_name: `${t('dao-profile:issued-tab.grid-columns.status')}`,
    },
  ];

  const signersColumns: IColumnGrid[] = [
    {
      column_name: 'user_id',
      header_name: `${t('dao-profile:signers-tab.grid-columns.user_id')}`,
    },
    {
      column_name: 'role',
      header_name: `${t('dao-profile:signers-tab.grid-columns.role')}`,
    },
  ];

  const tabs = useMemo(() => {
    const dApptabs = [
      {
        key: 'overview',
        label: t('common:tabs.overview'),
        section: (
          <OverviewTab
            people={people}
            setTab={setTab}
            credentials={credentials?.daos_by_pk.gates}
            loyaltyPrograms={loyaltyPrograms}
          />
        ),
      },
      {
        key: 'credentials',
        label: t('dao-profile:earn-tab'),
        section: <GatesTab />,
      },
    ];
    const protocolTabs = [
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
        label: t('dao-profile:signers-tab.title'),
        section: (
          <StaticGridViewTab
            columns={signersColumns}
            data={dao.protocolOrganization?.organization_accesses}
          />
        ),
      },
    ];
    if (loyaltyPrograms && loyaltyPrograms.length > 0) {
      dApptabs.push({
        key: 'passes',
        label: t('dao-profile:passes-tab'),
        section: <PassesTab />,
      });
    }
    return hasProtocolOrganization ? dApptabs.concat(protocolTabs) : dApptabs;
  }, [hasProtocolOrganization, loyaltyPrograms]);

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
