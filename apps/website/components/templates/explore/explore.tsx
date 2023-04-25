import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Box, Tabs, Tab, Typography } from '@mui/material';

import { Protocol_Data_Model } from '../../../services/hasura/types';
import { a11yTabProps, TabPanel, useTab } from '../../atoms/tabs';
import { Navbar } from '../../organisms/navbar';
import { AllTab } from './tabs/all-tab';
import { DaosTab } from './tabs/daos-tab';
import DataModelsTab from './tabs/data-models-tab/data-models-tab';
import { GatesTab } from './tabs/gates-tab';
import PassesTab from './tabs/passes-tab';
import { ExploreProps } from './types';

type TemplateProps = {
  title: string;
  subtitle: string;
  data: ExploreProps;
  dataModels: PartialDeep<Protocol_Data_Model>[];
};

export function ExploreTemplate({
  title,
  subtitle,
  data,
  dataModels,
}: TemplateProps) {
  const { t } = useTranslation('explore');
  const { activeTab, handleTabChange, setTab } = useTab();

  const tabs = useMemo(() => {
    if (data?.loyalty_program && data?.loyalty_program.length > 0) {
      return [
        {
          key: 'all',
          label: t('common:tabs.all'),
          section: (
            <AllTab setActiveTab={setTab} {...data} dataModels={dataModels} />
          ),
        },
        {
          key: 'credentials',
          label: t('common:tabs.earn'),
          section: <GatesTab />,
        },
        {
          key: 'passes',
          label: t('passes-tab'),
          section: <PassesTab />,
        },
        {
          key: 'data-models',
          label: t('common:tabs.data-models'),
          section: <DataModelsTab />,
        },
        {
          key: 'organizations',
          label: t('common:tabs.organizations'),
          section: <DaosTab />,
        },
      ];
    }
    return [
      {
        key: 'all',
        label: t('common:tabs.all'),
        section: (
          <AllTab setActiveTab={setTab} {...data} dataModels={dataModels} />
        ),
      },
      {
        key: 'credentials',
        label: t('common:tabs.earn'),
        section: <GatesTab />,
      },
      {
        key: 'data-models',
        label: t('common:tabs.data-models'),
        section: <DataModelsTab />,
      },
      {
        key: 'organizations',
        label: t('common:tabs.organizations'),
        section: <DaosTab />,
      },
    ];
  }, [data.loyalty_program]);

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
