import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import {
  Avatar,
  Chip,
  Box,
  Stack,
  Typography,
  Button,
  Tabs,
  Tab,
} from '@mui/material';

import { Daos } from '../../../services/graphql/types.generated';
import { a11yTabProps, TabPanel, useTab } from '../../atoms/tabs';
import { Navbar } from '../../organisms/navbar/navbar';
import { Socials } from './socials';
import { GatesTab, OverviewTab } from './tabs';

type Props = {
  dao: PartialDeep<Daos>;
};

export function DaoProfileTemplate({ dao }: Props) {
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();

  const tabs = useMemo(
    () => [
      {
        key: 'overview',
        label: t('common:tabs.overview'),
        section: <OverviewTab dao={dao} setTab={setTab} />,
      },
      {
        key: 'gates',
        label: t('common:tabs.gates'),
        section: <GatesTab gates={dao?.gates ?? []} />,
      },
      /* {
        key: 'people',
        label: t('common:tabs.people'),
        section: null,
      }, */
    ],
    []
  );

  return (
    <>
      <Box
        sx={{
          height: (theme) => theme.spacing(35),
          background: `url(${dao.background_url})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          pt: 2,
        }}
      >
        <Navbar />
      </Box>
      <Box
        sx={{
          px: TOKENS.CONTAINER_PX,
          marginTop: -13,
        }}
      >
        <Avatar
          sx={{
            height: (theme) => theme.spacing(16.25),
            width: (theme) => theme.spacing(16.25),
            border: (theme) => `${theme.spacing(0.5)} solid`,
            borderColor: 'background.default',
          }}
          src={dao.logo_url}
        ></Avatar>
        <Box>
          <Typography component="h1" variant="h4">
            {dao.name}
          </Typography>
          {dao.categories && (
            <Stack direction="row" gap={2} sx={{ mt: 12 / 8 }}>
              {dao.categories.map((category) => (
                <Chip key={category} label={category} size="small" />
              ))}
            </Stack>
          )}
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              maxWidth: {
                md: 1 / 2,
              },
            }}
            color="text.secondary"
          >
            {dao.description}
          </Typography>
          <Stack
            direction="row"
            gap={2}
            divider={<span>·</span>}
            sx={{ mt: 12 / 8 }}
          >
            <Typography variant="body1">
              {t('common:gate-count', { count: dao.gates?.length ?? 0 })}
            </Typography>
          </Stack>
          <Socials dao={dao}>
            <Button variant="contained">{t('common:follow')}</Button>
          </Socials>
        </Box>
      </Box>
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
