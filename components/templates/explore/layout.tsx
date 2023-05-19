import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { TOKENS } from '@/theme';

import { Box, Tabs, Typography, Tab } from '@mui/material';

import { query } from '@/constants/queries';
import { gqlAnonMethods } from '@/services/hasura/api';
import { a11yTabProps, TabPanel } from '../../atoms/tabs';
import { Navbar } from '../../organisms/navbar';
import { DashboardTemplate } from '../dashboard';

export function ExploreLayout({ children }) {
  const { t } = useTranslation('explore');

  const router = useRouter();
  let _selectedTab = router.pathname;
  _selectedTab = _selectedTab.slice(_selectedTab.lastIndexOf('/')).slice(1);
  const routesForTabs = ['', 'earn', 'issue', 'organizations'];
  const tabs = ['all', 'earn', 'issue', 'organizations'];

  const { data: passes } = useQuery([query.passes, 'only-one'], async () => {
    return (await gqlAnonMethods.loyalty_programs({ take: 1, skip: 0 }))
      .loyalty_program;
  });

  if (passes && passes.length > 0) {
    routesForTabs.splice(2, 0, 'passes');
    routesForTabs.join();
    tabs.splice(2, 0, 'passes');
    tabs.join();
  }

  const selectedIndex =
    routesForTabs.indexOf(_selectedTab) === -1
      ? 0
      : routesForTabs.indexOf(_selectedTab);

  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          pt: 2,
          overflow: 'hidden',
        },
      }}
    >
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
        <TabPanel tabsId={''} index={0} active>
          {children}
        </TabPanel>
      </Box>
    </DashboardTemplate>
  );
}
