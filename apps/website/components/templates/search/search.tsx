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
  Chip,
} from '@mui/material';

import { gqlAnonMethods } from '../../../services/api';
import { SearchQuery } from '../../../services/graphql/types.generated';
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
  const { activeTab, handleTabChange } = useTab();

  const { data, isLoading } = useQuery<SearchQuery>(
    `search-${query}`,
    async () => {
      const { daos: daos_search, ...result } = await gqlAnonMethods.search({
        query,
      });
      const { daos } = await gqlAnonMethods.search_daos({
        ids: daos_search.hits.map((dao) => dao.id),
      });
      return {
        ...result,
        daos: {
          hits: daos,
        },
      };
    }
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
        count: data?.gates.hits.length,
      },
      {
        key: 'daos',
        label: t('common:tabs.daos'),
        section: <DaosTab data={data?.daos.hits} />,
        count: data?.daos.hits.length,
      },
      {
        key: 'people',
        label: t('common:tabs.people'),
        section: <PeopleTab data={data?.users.hits} />,
        count: data?.users.hits.length,
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
            sx={(theme) => ({
              mb: '-1px',
              '& .MuiTabs-indicator': {
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'transparent',
              },
              '& .MuiTabs-indicatorSpan': {
                maxWidth: '75%',
                width: '100%',
                backgroundColor: theme.palette.primary.main,
              },
            })}
            TabIndicatorProps={{
              children: <span className="MuiTabs-indicatorSpan" />,
            }}
          >
            {tabs
              .sort((obj1, obj2) => obj2.count - obj1.count)
              .map(({ key, label, count }, index) => (
                <Tab
                  key={key}
                  label={label}
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
