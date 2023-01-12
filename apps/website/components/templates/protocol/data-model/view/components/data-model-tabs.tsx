import useTranslation from 'next-translate/useTranslation';

import { TOKENS } from '@gateway/theme';

import { Box, Tab, Tabs } from '@mui/material';

import { useTab, TabPanel } from '../../../../../atoms/tabs';

export default function DataModelTabs() {
  const { activeTab, handleTabChange, setTab } = useTab();
  const { t } = useTranslation('protocol');

  const tabs = [
    {
      key: 'overview',
      label: t('common:tabs.overview'),
      section: <>Overview</>,
    },
    {
      key: 'issuers',
      label: t('common:tabs.issuers'),
      section: <>Issuers</>,
    },
    {
      key: 'recipients',
      label: t('common:tabs.recipients'),
      section: <>Recipients</>,
    },
    {
      key: 'credentials',
      label: t('common:tabs.credentials'),
      section: <>Credentials</>,
    },
    {
      key: 'playground',
      label: t('common:tabs.playground'),
      section: <>Playground</>,
    },
  ];

  return (
    <>
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
          sx={{
            mb: '-1px',
          }}
        >
          {tabs.map(({ key, label }) => (
            <Tab
              key={key}
              label={label}
              sx={(theme) => ({
                fontWeight: 700,
                px: 0,
                mr: theme.spacing(3),
              })}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ key, section }, index) => (
        <TabPanel
          key={key}
          tabsId="protocol"
          index={index}
          active={index === activeTab}
          sx={{ py: 3, px: TOKENS.CONTAINER_PX }}
        >
          {section}
        </TabPanel>
      ))}
    </>
  );
}
