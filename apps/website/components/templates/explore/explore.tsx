import useTranslation from 'next-translate/useTranslation';


import { TOKENS } from '@gateway/theme';

import { Box, Tabs, Tab, Typography } from '@mui/material';

import { a11yTabProps, TabPanel, useTab } from '../../atoms/tabs';
import { Navbar } from '../../organisms/navbar';

import { useRouter } from 'next/router';

export function ExploreTemplate() {
  const { t } = useTranslation('explore');
  const router = useRouter();
  let _selectedTab = router.pathname;
  _selectedTab = _selectedTab.slice(_selectedTab.lastIndexOf('/')).slice(1);
  const routesForTabs = ['', 'earn', 'passes', 'issue', 'organizations'];
  const tabs = ['all', 'earn', 'passes', 'issue', 'organizations'];

  const selectedIndex =
    routesForTabs.indexOf(_selectedTab) === -1
      ? 0
      : routesForTabs.indexOf(_selectedTab);
  return (
    <>
      <Navbar />
      <Box pt={6}>
        <Typography variant="h4" whiteSpace="pre-line" px={TOKENS.CONTAINER_PX}>
          {t('title')}
        </Typography>
        <Typography
          variant="body1"
          whiteSpace="pre-line"
          px={TOKENS.CONTAINER_PX}
          color="text.secondary"
        >
          {t('subtitle')}
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
            value={selectedIndex}
            onChange={(_, index) => {
              const tab = routesForTabs.at(index);
              if (tab === '') {
                router.replace(`/explore`, undefined, {
                  shallow: true,
                });
              } else
                router.replace(`/explore/${tab}`, undefined, {
                  shallow: true,
                });
            }}
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
            {tabs.map((value, index) => (
              <Tab
                key={index}
                label={value}
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
      </Box>
    </>
  );
}
