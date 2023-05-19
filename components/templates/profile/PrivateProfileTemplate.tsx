import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { TOKENS } from '@/theme';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Stack, Typography, Tabs, Tab, Chip } from '@mui/material';

import { a11yTabProps, TabPanel, useTab } from '../../../components/atoms/tabs';
import { Navbar } from '../../../components/organisms/navbar/navbar';
import { ROUTES } from '@/constants/routes';
import { generateImageUrl } from '@/hooks/use-file';
import { useAuth } from '@/providers/auth';
import { AvatarFile } from '../../atoms/avatar-file';
import { SocialButtons } from '../../organisms/social-buttons';
import { IssuedTab, ReceivedTab } from './tabs';
import { Earned } from './tabs/Earned';

export default function PrivateProfileTemplate() {
  const { t } = useTranslation();
  const { activeTab, handleTabChange } = useTab();
  const router = useRouter();
  const { me } = useAuth();

  const tabs = [
    // {
    //   key: 'overview',
    //   label: t('common:tabs.overview'),
    //   section: <OverviewTab setActiveTab={setTab} isPrivateProfile user={me} />,
    // },
    {
      key: 'received',
      label: t('common:tabs.received'),
      count: me.protocol.totalOfreceivedCredentials,
      section: <ReceivedTab user={me} />,
    },
    {
      key: 'issued',
      label: t('common:tabs.issued'),
      count: me.protocol.totalOfIssuedCredentials,
      section: <IssuedTab user={me} />,
    },
    {
      key: 'earned',
      label: t('common:tabs.earned'),
      count: me.experiences
        .map((exp) => exp.credentials.length)
        .reduce((acc, cur) => (acc += cur), 0),
      section: <Earned user={me} />,
    },
  ];

  return (
    <>
      <Box
        sx={{
          height: (theme) => theme.spacing(35),
          pt: 2,
          position: 'relative',
          ...(!me.cover
            ? {
                background:
                  'linear-gradient(265.82deg, #432F70 0.24%, #23182E 84.35%);',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }
            : {}),
        }}
      >
        <Navbar sx={{ zIndex: 1 }} />
        {me.cover?.id && me.cover?.blur ? (
          <Image
            src={generateImageUrl(me.cover.s3_key)}
            blurDataURL={me.cover.blur}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt={me.name}
          />
        ) : null}
      </Box>
      <Box
        sx={{
          marginTop: -13,
        }}
        marginLeft={{ xs: '20px', md: '50px' }}
      >
        <AvatarFile
          sx={{
            height: (theme) => theme.spacing(16.25),
            width: (theme) => theme.spacing(16.25),
            border: (theme) => `${theme.spacing(0.5)} solid`,
            borderColor: 'background.default',
          }}
          file={me.picture}
          fallback={'/avatar.png'}
        ></AvatarFile>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              sx={{ color: '#fff', paddingTop: { xs: '16px', md: '24px' } }}
              component="h1"
              variant="h4"
            >
              {me.name ? me.name : me.username}
              <EditIcon
                onClick={() => router.push(ROUTES.SETTINGS_PUBLIC_PROFILE)}
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
              @{me.username}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                columnGap: '10px',
                mt: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.7)',
                  whiteSpace: 'pre-line',
                }}
                width={{ xs: '100%', md: '100%' }}
              >
                {me.bio ||
                  'This is your profesional bio. Click the pencil above to edit.'}
              </Typography>
            </Box>
            {/* <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '10px',
                mt: 2,
              }}
            >
              <ConnectionsButton wallet={me.wallet} />
            </Box> */}
            <Stack
              direction="row"
              gap={1}
              sx={{
                mt: 4,
              }}
            >
              <SocialButtons
                socials={me.socials || []}
                copyNetworks={['discord']}
              />
            </Stack>
          </Box>
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
          sx={{
            mb: '-1px',
          }}
        >
          {tabs.map(({ key, label, count }, index) => (
            <Tab
              key={key}
              label={label}
              sx={(theme) => ({
                fontWeight: 700,
                px: 0,
                mr: theme.spacing(3),
              })}
              {...(count
                ? {
                    icon: <Chip label={count} size="small" />,
                    iconPosition: 'end',
                  }
                : {})}
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
    </>
  );
}
