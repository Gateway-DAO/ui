import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Box, Tabs, Tab, Typography } from '@mui/material';

import { DataModel } from '../../../services/gateway-protocol/types';
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
  dataModels: PartialDeep<DataModel>[];
};

export function ExploreTemplate({
  title,
  subtitle,
  data,
  dataModels,
}: TemplateProps) {
  const { t } = useTranslation('explore');
  const { activeTab, handleTabChange, setTab } = useTab();

  const tabs = useMemo(
    () => [
      {
        key: 'all',
        label: t('common:tabs.all'),
        section: (
          <AllTab setActiveTab={setTab} {...data} dataModels={dataModels} />
        ),
      },
      {
        key: 'credentials',
        label: t('common:tabs.credentials'),
        section: <GatesTab />,
      },
      {
        key: 'organizations',
        label: t('common:tabs.organizations'),
        section: <DaosTab />,
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
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={(theme) => ({
              mb: '-1px',
              [theme.breakpoints.down('md')]: {
                '.MuiTabs-scrollButtons.Mui-disabled': {
                  opacity: 0.3,
                },
              },
            })}
          >
            {tabs.map(({ key, label }, index) => (
              <Tab
                key={key}
                label={label}
                sx={(theme) => ({
                  px: 0,
                  mr: theme.spacing(3),
                  fontWeight: 700,
                })}
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
            hidden={index !== activeTab}
          >
            {activeTab === index && section}
          </TabPanel>
        ))}
      </Box>
    </>
  );
}
