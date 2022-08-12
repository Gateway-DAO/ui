import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, Tabs, Tab, Typography } from '@mui/material';

import { a11yTabProps, TabPanel, useTab } from '../../atoms/tabs';
import { Navbar } from '../../organisms/navbar';
import { AllTab } from './tabs/all-tab';
import { DaosTab } from './tabs/daos-tab';
import { GatesTab } from './tabs/gates-tab';
import { PeopleTab } from './tabs/people-tab';
import { ExploreProps } from './types';

type TemplateProps = {
  title: string;
  subtitle: string;
  data: ExploreProps;
};

export function ExploreTemplate({ title, subtitle, data }: TemplateProps) {
  const { t } = useTranslation('explore');
  const { activeTab, handleTabChange, setTab } = useTab();

  const tabs = useMemo(
    () => [
      {
        key: 'all',
        label: t('common:tabs.all'),
        section: <AllTab {...data} setActiveTab={setTab} />,
      },
      {
        key: 'gates',
        label: t('common:tabs.gates'),
        section: <GatesTab />,
      },
      {
        key: 'daos',
        label: t('common:tabs.daos'),
        section: <DaosTab />,
      },
      {
        key: 'people',
        label: t('common:tabs.people'),
        section: <PeopleTab />,
      },
    ],
    []
  );

  return (
    <>
      <Navbar />
      <Box pt={6}>
        <Typography variant="h4" whiteSpace="pre-line" px={TOKENS.CONTAINER_PX}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          whiteSpace="pre-line"
          px={TOKENS.CONTAINER_PX}
          color="text.secondary"
        >
          {subtitle}
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
                maxWidth: '70%',
                width: '100%',
                backgroundColor: theme.palette.primary.main,
              },
            })}
            TabIndicatorProps={{
              children: <span className="MuiTabs-indicatorSpan" />,
            }}
          >
            {tabs.map(({ key, label }, index) => (
              <Tab
                key={key}
                label={label}
                sx={{
                  fontWeight: 700,
                }}
                {...a11yTabProps('explore', index)}
              />
            ))}
          </Tabs>
        </Box>
        {tabs.map(({ key, section }, index) => (
          <TabPanel
            key={key}
            tabsId="explore"
            index={index}
            active={index === activeTab}
          >
            {section}
          </TabPanel>
        ))}
      </Box>
    </>
  );
}
