import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useMemo } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography, Tabs, Tab, Chip } from '@mui/material';

import { a11yTabProps, TabPanel, useTab } from '../../../components/atoms/tabs';
import { Navbar } from '../../../components/organisms/navbar/navbar';
import { generateImageUrl } from '../../../hooks/use-file';
import { gatewayProtocolSDK } from '../../../services/gateway-protocol/api';
import { Users } from '../../../services/hasura/types';
import { SessionUser } from '../../../types/user';
import { AvatarFile } from '../../atoms/avatar-file';
import { SocialButtons } from '../../organisms/social-buttons';
import { ReceivedTab, IssuedTab } from './tabs';
import { Earned } from './tabs/Earned';

// const PendingReceivedSection = dynamic<any>(
//   () =>
//     import('./pending-received-section').then(
//       (mod) => mod.PendingReceivedSection
//     ),
//   {
//     ssr: false,
//   }
// );

// const FollowButtonUser = dynamic<any>(
//   () =>
//     import('../../atoms/follow-button-user').then(
//       (mod) => mod.FollowButtonUser
//     ),
//   {
//     ssr: false,
//   }
// );

// const ConnectionsButton = dynamic<any>(
//   () => import('./connections/button').then((mod) => mod.ConnectionsButton),
//   {
//     ssr: false,
//   }
// );

type Props = {
  user: SessionUser | PartialDeep<Users>;
};

export default function ProfileTemplate({ user }: Props) {
  const { t } = useTranslation('user-profile');
  const { activeTab, handleTabChange } = useTab();

  const { data: credentialCount } = useQuery(
    ['credentialCount', user.protocolUser.id],
    () =>
      gatewayProtocolSDK.getUserCredentialCount({
        userId: user.protocolUser.id,
      })
  );

  const tabs = useMemo(
    () => [
      {
        key: 'received',
        label: t('common:tabs.received'),
        count: credentialCount?.totalReceived,
        section: <ReceivedTab user={user} />,
      },
      {
        key: 'issued',
        label: t('common:tabs.issued'),
        count: credentialCount?.totalIssued,
        section: <IssuedTab user={user} />,
      },
      {
        key: 'earned',
        label: t('common:tabs.earned'),
        count: user.experiences
          .map((exp) => exp.credentials.length)
          .reduce((acc, cur) => (acc += cur), 0),
        section: <Earned user={user} />,
      },
    ],
    [credentialCount]
  );
  return (
    <>
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
            src={generateImageUrl(user.cover.id)}
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
          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: '10px',
              mt: 2,
            }}
          >
            <ConnectionsButton wallet={user.wallet} />
          </Box> */}
          <Stack direction="column" gap={4} mt={4}>
            {/* {!!(user as Users) && pendingType === 'received' && (
              <PendingReceivedSection
                username={user.username!}
                wallet={user.wallet!}
                onSuccess={onChangeConnections}
              />
            )} */}
            {user?.socials?.length > 0 ? (
              <Stack direction="row" gap={1}>
                {/* {(user as Users)?.wallet && pendingType !== 'received' && (
                  <FollowButtonUser
                    wallet={(user as Users).wallet}
                    onSuccess={onChangeConnections}
                  />
                )} */}
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
