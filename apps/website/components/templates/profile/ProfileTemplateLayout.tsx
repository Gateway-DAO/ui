import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography, Tabs, Tab, Chip } from '@mui/material';

import { TabPanel } from '../../atoms/tabs';
import { Navbar } from '../../organisms/navbar/navbar';
import { generateImageUrl } from '../../../hooks/use-file';
import { gatewayProtocolSDK } from '../../../services/gateway-protocol/api';
import { AvatarFile } from '../../atoms/avatar-file';
import { SocialButtons } from '../../organisms/social-buttons';
import { useRouter } from 'next/router';
import { useAuth } from 'apps/website/providers/auth';
import { HeadContainer } from '../../molecules/head-container';
import DashboardTemplate from '../dashboard/dashboard';

export default function ProfileTemplateLayout({ children }) {
  const router = useRouter();
  const { me, gqlAuthMethods } = useAuth();
  const { username } = router.query;
  const {
    data: {
      users: [user],
    },
  } = useQuery(['user', username], () =>
    gqlAuthMethods.get_user_by_username({
      username: username as string,
    })
  );
  const { data: credentialCount } = useQuery(
    ['credentialCount', user.protocolUser.id],
    () =>
      gatewayProtocolSDK.getUserCredentialCount({
        userId: user.protocolUser.id,
      })
  );

  let _selectedTab = router.asPath;
  _selectedTab = _selectedTab.slice(_selectedTab.lastIndexOf('/')).slice(1);

  const routesForTabs = ['', 'issued', 'earned'];
  const tabs = [
    {
      label: 'received',
      count: credentialCount?.totalReceived,
    },
    {
      label: 'issued',
      count: credentialCount?.totalIssued,
    },
    {
      label: 'earned',
      count: user.experiences
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
      <HeadContainer title={`${user.name} Profile`} />
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
            ...(!user.cover
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
          {user.cover?.id && user.cover?.blur ? (
            <Image
              src={generateImageUrl(user.cover.s3_key)}
              blurDataURL={user.cover.blur}
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              alt={user.name}
            />
          ) : null}
        </Box>
        <Box
          sx={{
            marginTop: -13,
          }}
          marginLeft={{ xs: '20px', md: '50px' }}
          mr={{ xs: '20px', md: '0' }}
        >
          <AvatarFile
            sx={{
              height: (theme) => theme.spacing(16.25),
              width: (theme) => theme.spacing(16.25),
              border: (theme) => `${theme.spacing(0.5)} solid`,
              borderColor: 'background.default',
            }}
            file={user.picture}
            fallback={'/avatar.png'}
          ></AvatarFile>
          <Box>
            <Typography style={{ color: '#fff' }} component="h1" variant="h4">
              {user.name ? user.name : user.username}
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
              @{user.username}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                columnGap: '10px',
                mt: 2,
              }}
            >
              {user.bio && (
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {user.bio}
                </Typography>
              )}
            </Box>

            <Stack direction="column" gap={4} mt={4}>
              {user?.socials?.length > 0 ? (
                <Stack direction="row" gap={1}>
                  <SocialButtons
                    socials={user.socials}
                    copyNetworks={['discord']}
                  />
                </Stack>
              ) : undefined}
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
            value={selectedIndex}
            onChange={(_, index) => {
              const tab = routesForTabs.at(index);
              if (tab === '') {
                router.replace(`/profile/${username}`, undefined, {
                  shallow: true,
                });
              } else
                router.replace(`/profile/${username}/${tab}`, undefined, {
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
