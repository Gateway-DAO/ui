import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { useQuery } from 'react-query';

import { TOKENS } from '@gateway/theme';

import {
  Box,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  Stack,
} from '@mui/material';

import { gqlAnonMethods } from '../../../services/api';
import { a11yTabProps, TabPanel, useTab } from '../../atoms/tabs';
import { Navbar } from '../../organisms/navbar';
import { DaosTab } from './tabs/daos-tab';
import { GatesTab } from './tabs/gates-tab';
import { PeopleTab } from './tabs/people-tab';

type TemplateProps = {
  query: string;
};

export function SearchTemplate({ query }: TemplateProps) {
  const { t } = useTranslation('search');
  const { activeTab, handleTabChange, setTab } = useTab();

  const { data, isLoading } = useQuery(
    `search-${query}`,
    async () =>
      await gqlAnonMethods.search({
        query,
      })
  );

  const count: number = data
    ? // eslint-disable-next-line no-unsafe-optional-chaining
      [...data?.daos.hits, ...data?.gates.hits, ...data?.users.hits].length
    : 0;

  const tabs = useMemo(
    () => [
      {
        key: 'gates',
        label: t('common:tabs.gates'),
        section: <GatesTab data={data?.gates.hits} />,
      },
      {
        key: 'daos',
        label: t('common:tabs.daos'),
        section: <DaosTab data={data?.daos.hits} />,
      },
      {
        key: 'people',
        label: t('common:tabs.people'),
        section: <PeopleTab data={data?.users.hits} />,
      },
    ],
    [data]
  );

  return (
    <>
      <Navbar />
      <Box pt={6}>
        <Typography variant="h4" whiteSpace="pre-line" px={TOKENS.CONTAINER_PX}>
          &quot;{query}&quot;
        </Typography>
        <Typography
          variant="body1"
          whiteSpace="pre-line"
          px={TOKENS.CONTAINER_PX}
          color="text.secondary"
        >
          {count} {t('results')}
        </Typography>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            px: TOKENS.CONTAINER_PX,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            sx={{ mb: '-1px' }}
          >
            {tabs.map(({ key, label }, index) => (
              <Tab key={key} label={label} {...a11yTabProps('search', index)} />
            ))}
          </Tabs>
        </Box>
        {tabs.map(({ key, section }, index) => (
          <TabPanel
            key={key}
            tabsId="search"
            index={index}
            active={index === activeTab}
          >
            {isLoading ? (
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  py: 6,
                }}
              >
                <CircularProgress />
              </Stack>
            ) : (
              section
            )}
          </TabPanel>
        ))}
      </Box>
    </>
  );
}
