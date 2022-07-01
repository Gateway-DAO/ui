import { PartialDeep } from 'type-fest';
import { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { TOKENS } from '@gateway/theme';
import { Box, Typography, Tabs, Tab, Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExploreIcon from '@mui/icons-material/Explore';

import { useViewMode, ViewMode } from '../../../../hooks/use-view-modes';
import { a11yTabProps, TabPanel, useTab } from '../../../atoms/tabs';
import { ReceivedTab } from './recommendations/ReceivedTab';

export function OverviewTab() {
  const { view, toggleView } = useViewMode();
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();

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
                  }}
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
                }}
              >
                <ExploreIcon
                  sx={{
                    width: '55px',
                    height: '55px',
                    background: 'rgba(229, 229, 229, 0.16)',
                    borderRadius: '64px',
                    padding:"10px"
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
                  <Tab sx ={{fontSize:'12px'}}
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
              >
                {section}
              </TabPanel>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                py: '64px',
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
                  }}
                ></EditIcon>
              </Box>
              <Button
                sx={{
                  padding: '7px 10px',
                  fontSize: '13px',
                  border: '1px dashed #9A53FF',
                }}
                variant="outlined"
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
                  Timezones
                </Typography>
                <EditIcon
                  sx={{
                    marginLeft: '15px',
                    color: 'rgba(255, 255, 255, 0.56)',
                  }}
                ></EditIcon>
              </Box>

              <Button
                sx={{
                  padding: '7px 10px',
                  fontSize: '13px',
                  border: '1px dashed #9A53FF',
                }}
                variant="outlined"
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
                rowGap: '20px',
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
                  }}
                ></EditIcon>
              </Box>
              <Typography
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
                variant="h6"
              >
                No timezone yet
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
