import Image from 'next/image';
import { useRouter } from 'next/router';

import { AvatarFile } from '@/components/atoms/avatar-file';
import { TabPanel } from '@/components/atoms/tabs';
import { HeadContainer } from '@/components/molecules/head-container';
import { Navbar } from '@/components/organisms/navbar/navbar';
import { SocialButtons } from '@/components/organisms/social-buttons';
import { ROUTES } from '@/constants/routes';
import { generateImageUrl } from '@/hooks/use-file';
import { useAuth } from '@/providers/auth';
import { hasuraPublicService } from '@/services/hasura/api';
import { TOKENS } from '@/theme';
import { useQuery } from '@tanstack/react-query';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Stack, Typography, Tabs, Tab, Chip } from '@mui/material';

import { DashboardTemplate } from '../../templates/dashboard';

export default function PrivateProfile({ children }) {
  const router = useRouter();
  const { me } = useAuth();

  let _selectedTab = router.asPath;
  _selectedTab = _selectedTab.slice(_selectedTab.lastIndexOf('/')).slice(1);

  const { data: credentialCount } = useQuery(
    ['credentialCount', me.protocol.id],
    () =>
      hasuraPublicService.protocol_user_credential_count({
        userId: me.protocol.id,
      })
  );

  const routesForTabs = ['', 'issued', 'earned'];
  const tabs = [
    {
      label: 'received',
      count: credentialCount?.totalReceived.aggregate.count,
    },
    {
      label: 'issued',
      count: credentialCount?.totalIssued.aggregate.count,
    },
    {
      label: 'earned',
      count: me.experiences
        .map((exp) => exp.credentials.length)
        .reduce((acc, cur) => (acc += cur), 0),
    },
  ];

  const selectedIndex =
    routesForTabs.indexOf(_selectedTab) === -1
      ? 0
      : routesForTabs.indexOf(_selectedTab);

  return (
    <>
      <HeadContainer title="My Profile" ogImage="default" />
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
                {me.name ? me.name : me.protocolUser?.gatewayId}
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
                @{me.protocolUser?.gatewayId}
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
            value={selectedIndex}
            onChange={(_, index) => {
              const tab = routesForTabs.at(index);
              if (tab === '') {
                router.replace(`/profile`, undefined, {
                  shallow: true,
                });
              } else
                router.replace(`/profile/${tab}`, undefined, {
                  shallow: true,
                });
            }}
            aria-label="basic tabs example"
            sx={{
              mb: '-1px',
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                sx={(theme) => ({
                  fontWeight: 700,
                  px: 0,
                  mr: theme.spacing(3),
                  fontSize: '12px',
                })}
                {...(tab.count
                  ? {
                      icon: <Chip label={tab.count} size="small" />,
                      iconPosition: 'end',
                    }
                  : {})}
              />
            ))}
          </Tabs>
        </Box>
        <TabPanel tabsId={''} index={0} active>
          <Box>{children}</Box>
        </TabPanel>
      </DashboardTemplate>
    </>
  );
}
