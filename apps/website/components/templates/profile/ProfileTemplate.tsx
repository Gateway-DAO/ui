import { InferGetStaticPropsType } from 'next';
import { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Avatar, Chip, Box, Stack, Typography, Tabs, Tab, IconButton, Button } from '@mui/material';
import ShareIcon from '@mui/icons-material/IosShare';
import { Navbar } from '../../../components/organisms/navbar/navbar';
import { TOKENS } from '@gateway/theme';
import { gqlAdminMethods } from '../../../services/api';

import { a11yTabProps, TabPanel, useTab } from '../../../components/atoms/tabs';
import { OverviewTab } from './tabs/OverviewTab';
import { ActivityTab } from './tabs/ActivityTab';
import { DashboardTemplate } from '../../../components/templates/dashboard';

export const getStaticProps = async () => {
  const exploreProps = await gqlAdminMethods.get_home();

  return {
    props: {
      exploreProps,
    },
    revalidate: 10,
  };
};

export default function ProfileTemplate() {
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();

  const tabs = useMemo(
    () => [
      {
        key: 'overview',
        label: t('common:tabs.overview'),
        section: <OverviewTab />,
      },
      {
        key: 'activity',
        label: t('activity'),
        section: <ActivityTab />,
      },
    ],
    []
  );
  return (
    <>
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            height: (theme) => theme.spacing(35),
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            background:
              'linear-gradient(265.82deg, #432F70 0.24%, #23182E 84.35%);',
            pt: 2,
          }}
        >
          <Navbar />
        </Box>
        <Box
          sx={{
            marginTop: -13,
            
          }}
          marginLeft={{ xs: '20px', md: '50px' }}
        >
          <Avatar
            sx={{
              height: (theme) => theme.spacing(16.25),
              width: (theme) => theme.spacing(16.25),
              border: (theme) => `${theme.spacing(0.5)} solid`,
              borderColor: 'background.default',
            }}
          ></Avatar>
          <Box>
            <Typography style={{ color: '#fff' }} component="h1" variant="h4">
              Test User
            </Typography>
            <Typography
              component="h5"
              style={{
                fontSize: '16px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
              variant="h6"
            >
              @testuser
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '10px',
                mt: 2,
              }}
            >
              <Typography>0 connections</Typography>.
              <Typography>0 credentials</Typography>
            </Box>
            <Stack
              direction="row"
              gap={1}
              sx={{
                mt: 4,
              }}
            >
              <Button sx = {{width: '95px',height: '36px'}} variant="contained">Connect</Button>
              <IconButton
                sx={{
                  p: 0,
                }}
                //onClick={onShare}
              >
                <Avatar>
                  <ShareIcon
                    sx={{
                      mt: -0.25,
                    }}
                  />
                </Avatar>
              </IconButton>
            </Stack>
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
              <Tab sx ={{fontSize:'12px'}} key={key} label={label} {...a11yTabProps('dao', index)} />
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
      </DashboardTemplate>
    </>
  );
}
