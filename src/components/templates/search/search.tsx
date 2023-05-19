import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { TOKENS } from '@/theme';

import {
  Box,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  Stack,
  Chip,
} from '@mui/material';

import { SearchQuery } from '@/services/hasura/types';
import { a11yTabProps, TabPanel, useTab } from '@/components/atoms/tabs';
import { Navbar } from '@/components/organisms/navbar';
import { useAuth } from './../../../providers/auth';
import { DaosTab } from './tabs/daos-tab';
import { GatesTab } from './tabs/gates-tab';
import { PeopleTab } from './tabs/people-tab';

type TemplateProps = {
  query: string;
};

export function SearchTemplate({ query }: TemplateProps) {
  const { t } = useTranslation('search');
  const { activeTab, handleTabChange } = useTab();
  const { gqlAuthMethods } = useAuth();

  const { data, isLoading } = useQuery<SearchQuery>(
    [`search-${query}`],
    async () =>
      await gqlAuthMethods.search({
        query,
      })
  );

  const count: number = data
    ? // eslint-disable-next-line no-unsafe-optional-chaining
      [...(data?.daos || []), ...(data?.gates || []), ...(data?.users || [])]
        .length
    : 0;

  const tabs = useMemo(
    () => [
      {
        key: 'gates',
        label: t('common:tabs.credentials'),
        section: <GatesTab data={data?.gates} />,
        count: data?.gates?.length,
      },
      {
        key: 'daos',
        label: t('common:tabs.organizations'),
        section: <DaosTab data={data?.daos} />,
        count: data?.daos?.length,
      },
      {
        key: 'people',
        label: t('common:tabs.people'),
        section: <PeopleTab data={data?.users} />,
        count: data?.users?.length,
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
          {isLoading ? t('loading') : `${count} ${t('results')}`}
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
            sx={{
              mb: '-1px',
            }}
          >
            {tabs
              .sort((obj1, obj2) => obj2.count - obj1.count)
              .map(({ key, label, count }, index) => (
                <Tab
                  key={key}
                  label={label}
                  sx={(theme) => ({
                    fontSize: '12px',
                    fontWeight: 700,
                    px: 0,
                    mr: theme.spacing(3),
                  })}
                  {...(count
                    ? {
                        icon: <Chip label={count} size="small" />,
                        iconPosition: 'end',
                      }
                    : {})}
                  {...a11yTabProps('search', index)}
                />
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
