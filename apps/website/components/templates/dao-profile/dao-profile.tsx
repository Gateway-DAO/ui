import useTranslation from 'next-translate/useTranslation';

import { TOKENS } from '@gateway/theme';

import { Box, Tabs, Tab } from '@mui/material';

import { a11yTabProps, TabPanel, useTab } from '../../atoms/tabs';
import { useDaoProfile } from './context';
import { DaoHeader } from './dao-header';
import { GatesTab, OverviewTab } from './tabs';
import { PeopleTab } from './tabs/people-tab';

export function DaoProfileTemplate() {
  const { followers, onRefetchFollowers, followersIsLoaded, credentials } =
    useDaoProfile();
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();

  const people = followers?.daos_by_pk?.followers.map(({ user }) => user) ?? [];

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
      label: t('common:tabs.credentials'),
      section: <GatesTab />,
    },
    {
      key: 'people',
      label: t('common:tabs.people'),
      section: <PeopleTab people={people} />,
    },
  ];

  return (
    <>
      <DaoHeader
        followIsLoaded={followersIsLoaded}
        followCount={
          followers?.daos_by_pk?.followers_aggregate?.aggregate?.count
        }
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
