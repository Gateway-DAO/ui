import useTranslation from 'next-translate/useTranslation';

import { useQuery } from 'react-query';

import { TOKENS } from '@gateway/theme';

import { Box, Tabs, Tab } from '@mui/material';

import { gqlAnonMethods } from '../../../services/api';
import { a11yTabProps, TabPanel, useTab } from '../../atoms/tabs';
import { useDaoProfile } from './context';
import { DaoHeader } from './dao-header';
import { GatesTab, OverviewTab } from './tabs';
import { PeopleTab } from './tabs/people-tab';

export function DaoProfileTemplate() {
  const { dao } = useDaoProfile();
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();

  const peopleQuery = useQuery(
    ['dao-people', dao.id],
    () => gqlAnonMethods.dao_profile_people({ id: dao.id }),
    { enabled: !!dao?.id }
  );

  const onResetPeopleQuery = () => {
    peopleQuery.refetch();
  };

  const followers =
    peopleQuery.data?.daos_by_pk?.followers.map(({ user }) => user) ?? [];

  const tabs = [
    {
      key: 'overview',
      label: t('common:tabs.overview'),
      section: <OverviewTab people={followers} setTab={setTab} />,
    },
    {
      key: 'gates',
      label: t('common:tabs.gates'),
      section: <GatesTab />,
    },
    {
      key: 'people',
      label: t('common:tabs.people'),
      section: <PeopleTab people={followers} />,
    },
  ];

  return (
    <>
      <DaoHeader
        followIsLoading={peopleQuery.isSuccess}
        followCount={
          peopleQuery.data?.daos_by_pk?.followers_aggregate?.aggregate?.count
        }
        onFollow={onResetPeopleQuery}
        onUnfollow={onResetPeopleQuery}
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
          sx={{ mb: '-1px' }}
        >
          {tabs.map(({ key, label }, index) => (
            <Tab key={key} label={label} {...a11yTabProps('dao', index)} />
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
