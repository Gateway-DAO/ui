/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import-helpers/order-imports */
import { PartialDeep } from 'type-fest';
import { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { TOKENS } from '@gateway/theme';
import { Box, Typography, Tabs, Tab, Button, Card, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExploreIcon from '@mui/icons-material/Explore';

import { useViewMode, ViewMode } from '../../../../hooks/use-view-modes';
import { a11yTabProps, TabPanel, useTab } from '../../../atoms/tabs';
import { ReceivedTab } from './recommendations/ReceivedTab';

import { useRouter } from 'next/router';
import { ROUTES } from '../../../../constants/routes';

export function OverviewTab() {
  const { view, toggleView } = useViewMode();
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();
  const router = useRouter();
  const tabs = useMemo(
    () => [
      {
        key: 'overview',
        label: t('Received'),
        section: <ReceivedTab />,
      },
      {
        key: 'activity',
        label: t('Given'),
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
    <Box>
      {view === ViewMode.grid && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              md: '2fr 1fr',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRight: 1,
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                py: '50px',
                px: TOKENS.CONTAINER_PX,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '32px',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  style={{ color: '#fff', fontSize: '20px' }}
                  variant="h2"
                >
                  Experiences
                </Typography>
                <EditIcon
                  sx={{
                    marginLeft: '15px',
                    color: 'rgba(255, 255, 255, 0.56)',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    router.push(ROUTES.EDIT_PROFILE + '#experiences')
                  }
                ></EditIcon>
              </Box>
              <Card
                sx={{
                  width: '275px',
                  height: '443px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(154, 83, 255, 0.08)',
                  border: '1px dashed #9A53FF',
                  bordeRadius: '8px',
                  rowGap: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => router.push(ROUTES.EXPLORE)}
              >
                <ExploreIcon
                  sx={{
                    width: '55px',
                    height: '55px',
                    background: 'rgba(229, 229, 229, 0.16)',
                    borderRadius: '64px',
                    padding: '10px',
                  }}
                ></ExploreIcon>
                <Typography sx={{ color: '#fff' }} component="h3" variant="h6">
                  Explore Gates
                </Typography>
                <Typography
                  component="h5"
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.7)',
                    width: '80%',
                    textAlign: 'center',
                  }}
                  variant="h6"
                >
                  Complete an onboarding gate and start to contribute at DAO
                </Typography>
              </Card>
            </Box>
            <Box
              sx={{
                pt: '50px',
                px: TOKENS.CONTAINER_PX,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                style={{ color: '#fff', fontSize: '20px' }}
                variant="h2"
              >
                Recommendations
              </Typography>
            </Box>
            <Box
              sx={{
                pt: '20px',
                px: TOKENS.CONTAINER_PX,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '20px',
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="basic tabs example"
                sx={{ mb: '-1px' }}
              >
                {tabs.map(({ key, label }, index) => (
                  <Tab
                    key={key}
                    label={label}
                    {...a11yTabProps('dao', index)}
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
                sx={{
                  marginBottom: '200px',
                }}
              >
                {section}
              </TabPanel>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                py: '56px',
                px: TOKENS.CONTAINER_PX,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                rowGap: '32px',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '7fr 1fr',
                  width: '100%',
                }}
              >
                <Typography
                  style={{ color: '#fff', fontSize: '20px' }}
                  variant="h2"
                >
                  Skills
                </Typography>
                <EditIcon
                  sx={{
                    marginLeft: '15px',
                    color: 'rgba(255, 255, 255, 0.56)',
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push(ROUTES.EDIT_PROFILE + '#skills')}
                ></EditIcon>
              </Box>
              <Button
                sx={{
                  padding: '7px 10px',
                  fontSize: '13px',
                  border: '1px dashed #9A53FF',
                }}
                variant="outlined"
                onClick={() => router.push(ROUTES.EDIT_PROFILE + '#skills')}
              >
                Add your skills
              </Button>
            </Box>
            <Box
              sx={{
                py: '50px',
                px: TOKENS.CONTAINER_PX,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                rowGap: '32px',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '7fr 1fr',
                  width: '100%',
                }}
              >
                <Typography
                  style={{ color: '#fff', fontSize: '20px' }}
                  variant="h2"
                >
                  Languages
                </Typography>
                <EditIcon
                  sx={{
                    marginLeft: '15px',
                    color: 'rgba(255, 255, 255, 0.56)',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    router.push(ROUTES.EDIT_PROFILE + '#languages')
                  }
                ></EditIcon>
              </Box>

              <Button
                sx={{
                  padding: '7px 10px',
                  fontSize: '13px',
                  border: '1px dashed #9A53FF',
                }}
                variant="outlined"
                onClick={() => router.push(ROUTES.EDIT_PROFILE + '#languages')}
              >
                Add your languages
              </Button>
            </Box>
            <Box
              sx={{
                py: '50px',
                px: TOKENS.CONTAINER_PX,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '28px',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '7fr 1fr',
                }}
              >
                <Typography
                  style={{ color: '#fff', fontSize: '20px' }}
                  variant="h2"
                >
                  Timezones
                </Typography>
                <EditIcon
                  sx={{
                    marginLeft: '15px',
                    color: 'rgba(255, 255, 255, 0.56)',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    router.push(ROUTES.EDIT_PROFILE + '#timezones')
                  }
                ></EditIcon>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '34px',
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.5)',
                    letterSpacing: '0.25px',
                    marginBottom:"5px"
                  }}
                  variant="h6"
                >
                  0:00
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: '400',
                      color: 'rgba(255, 255, 255, 0.5)',
                      letterSpacing: '0.4px',
                    }}
                    component="span"
                  >
                    am
                  </Typography>
                </Typography>
                <Link
                  sx={{ textDecoration: 'none', cursor: 'pointer'}}
                  onClick={() => router.push(ROUTES.EDIT_PROFILE + '#timezones')}
                >
                  Select your time zone
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
