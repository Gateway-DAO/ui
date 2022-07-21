import { PartialDeep } from 'type-fest';
import { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { TOKENS } from '@gateway/theme';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { useViewMode, ViewMode } from '../../../../hooks/use-view-modes';
import { a11yTabProps, TabPanel, useTab } from '../../../atoms/tabs';
import { ReceivedTab } from './recommendations/ReceivedTab';

import ExperienceAccordion from './ExperienceComponents/ExperienceAccordion';

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
  const skills = [
    { title: 'UX Design' },
    { title: 'UI Design' },
    { title: 'Product Strategy' },
    { title: 'Product Design' },
    { title: 'Web3' },
    { title: 'Business Development' },
    { title: 'Blockchain' },
    { title: 'Cryptocurrency' },
  ];
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
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '32px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  px: TOKENS.CONTAINER_PX,
                  justifyContent: 'space-between',
                }}
              >
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
                    router.push(ROUTES.EDITPROFILE + '#experiences')
                  }
                ></EditIcon>
              </Box>
              <Stack>
                <ExperienceAccordion
                  title="Olympus Dao"
                  date="Jun 2021 — Present"
                  credential="5 credentials"
                />
                <Divider></Divider>
                <ExperienceAccordion
                  title="Yearn Finance"
                  date="Nov 2021 — Present"
                  credential="5 credentials"
                />
                <Divider></Divider>
                <ExperienceAccordion
                  title="City Dao"
                  date="Nov 2021 — Present"
                  credential="5 credentials"
                />
              </Stack>
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
                  onClick={() => router.push(ROUTES.EDITPROFILE + '#skills')}
                ></EditIcon>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  columnGap: '8px',
                  rowGap: '8px',
                  flexWrap: 'wrap',
                  height: 'auto',
                }}
              >
                {skills.map((skill) => (
                  <Chip variant="filled" label={skill.title}></Chip>
                ))}
              </Box>
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
                  onClick={() => router.push(ROUTES.EDITPROFILE + '#languages')}
                ></EditIcon>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  columnGap: '8px',
                }}
              >
                <Chip variant="filled" label="English"></Chip>
                <Chip variant="filled" label="Portuguese"></Chip>
                <Chip variant="filled" label="Spanish"></Chip>
              </Box>
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
                  Time Zone
                </Typography>
                <EditIcon
                  sx={{
                    marginLeft: '15px',
                    color: 'rgba(255, 255, 255, 0.56)',
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push(ROUTES.EDITPROFILE + '#timezones')}
                ></EditIcon>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '34px',
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 1)',
                    letterSpacing: '0.25px',
                    marginBottom: '5px',
                  }}
                  variant="h6"
                >
                  4:00
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: '400',
                      color: 'rgba(255, 255, 255, 1)',
                      letterSpacing: '0.4px',
                    }}
                    component="span"
                  >
                    pm
                  </Typography>
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  Eastern Standard Time (EST), UTC -5
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
