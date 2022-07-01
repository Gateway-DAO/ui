import { PartialDeep } from 'type-fest';
import { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { TOKENS } from '@gateway/theme';
import { Box, Typography, Tabs, Tab } from '@mui/material';

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
                rowGap: '20px',
              }}
            >
              <Typography
                style={{ color: '#fff', fontSize: '20px' }}
                variant="h2"
              >
                Experiences
              </Typography>
              <Typography
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
                variant="h6"
              >
                No experience yet
              </Typography>
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
                flexDirection: 'column',
                rowGap: '20px',
              }}
              borderTop={{ xs: '1px solid rgba(255, 255, 255, 0.12)', md: '0px' }}
            >
              <Typography
                style={{ color: '#fff', fontSize: '20px' }}
                variant="h2"
              >
                Skills
              </Typography>
              <Typography
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
                variant="h6"
              >
                No skills yet
              </Typography>
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
              <Typography
                style={{ color: '#fff', fontSize: '20px' }}
                variant="h2"
              >
                Languages
              </Typography>
              <Typography
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
                variant="h6"
              >
                No languages yet
              </Typography>
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
              <Typography
                style={{ color: '#fff', fontSize: '20px' }}
                variant="h2"
              >
                Timezones
              </Typography>
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
