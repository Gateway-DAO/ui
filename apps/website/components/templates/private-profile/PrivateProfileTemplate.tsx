import { InferGetStaticPropsType } from 'next';
import { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';

import {
  Avatar,
  Link,
  Box,
  Stack,
  Typography,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/IosShare';
import EditIcon from '@mui/icons-material/Edit';

import { Navbar } from '../../../components/organisms/navbar/navbar';
import { TOKENS } from '@gateway/theme';
import { gqlAdminMethods } from '../../../services/api';

import { a11yTabProps, TabPanel, useTab } from '../../../components/atoms/tabs';
import { OverviewTab } from './tabs/OverviewTab';
import { ActivityTab } from './tabs/ActivityTab';
import { DashboardTemplate } from '../../../components/templates/dashboard';

import { useRouter } from 'next/router';
import { ROUTES } from '../../../constants/routes';

export const getStaticProps = async () => {
  const exploreProps = await gqlAdminMethods.get_home();

  return {
    props: {
      exploreProps,
    },
    revalidate: 10,
  };
};

export default function PrivateProfileTemplate() {
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();
  const router = useRouter();

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
      {
        key: 'bookmarked',
        label: t('Bookmarked'),
        //section: <ActivityTab />,
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
            <Typography
              sx={{ color: '#fff', marginTop: { xs: '16px', md: '24px' } }}
              component="h1"
              variant="h4"
            >
              Test User
              <EditIcon
                onClick={() => router.push(ROUTES.EDIT_PROFILE)}
                sx={{
                  marginLeft: '15px',
                  color: 'rgba(255, 255, 255, 0.56)',
                  cursor: 'pointer',
                }}
              ></EditIcon>
            </Typography>
            <Typography
              component="h5"
              sx={{
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
                flexDirection: 'column',
                columnGap: '10px',
                mt: 2,
              }}
            >
              <Link
                sx={{ textDecoration: 'none', cursor:"pointer" }}
                onClick={() => router.push(ROUTES.EDIT_PROFILE + '#about')}
              >
                Write bio
              </Link>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
                width={{ xs: '100%', md: '50%' }}
              >
                Write about your years of experience, industry, or skills.
                People also talk about their achievements or previous job
                experiences.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '10px',
                mt: 2,
              }}
            >
              <Typography>0 connections</Typography>·
              <Typography>0 credentials</Typography>
            </Box>
            <Stack
              direction="row"
              gap={1}
              sx={{
                mt: 4,
              }}
            >
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
              <Tab key={key} label={label} {...a11yTabProps('dao', index)} />
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
