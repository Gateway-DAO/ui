import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useMemo } from 'react';

import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import ShareIcon from '@mui/icons-material/IosShare';
import {
  Avatar,
  Chip,
  Box,
  Stack,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Button,
} from '@mui/material';

import { a11yTabProps, TabPanel, useTab } from '../../../components/atoms/tabs';
import { Navbar } from '../../../components/organisms/navbar/navbar';
import { generateImageUrl } from '../../../hooks/use-file';
import { useAuth } from '../../../providers/auth';
import { Users } from '../../../services/graphql/types.generated';
import { SessionUser } from '../../../types/user';
import { AvatarFile } from '../../atoms/avatar-file';
import { FollowButtonUser } from '../../atoms/follow-button-user';
import { SocialButtons } from '../../organisms/social-buttons';
import { ActivityTab, OverviewTab } from './tabs';

type Props = {
  user: SessionUser | PartialDeep<Users>;
};

export default function ProfileTemplate({ user }: Props) {
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();
  const { me } = useAuth();

  const tabs = useMemo(
    () => [
      {
        key: 'overview',
        label: t('common:tabs.overview'),
        section: <OverviewTab user={user} />,
      },
      // {
      //   key: 'activity',
      //   label: t('activity'),
      //   section: <ActivityTab />,
      // },
    ],
    []
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
      >
        <AvatarFile
          sx={{
            height: (theme) => theme.spacing(16.25),
            width: (theme) => theme.spacing(16.25),
            border: (theme) => `${theme.spacing(0.5)} solid`,
            borderColor: 'background.default',
          }}
          file={user.picture}
          fallback={'/logo.png'}
        ></AvatarFile>
        <Box>
          <Typography style={{ color: '#fff' }} component="h1" variant="h4">
            {user.name}
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: '10px',
              mt: 2,
            }}
          >
            <Typography>
              {user?.following_aggregate?.aggregate?.count ?? 0} connections
            </Typography>
            .<Typography>{user.credentials.length} credential(s)</Typography>
          </Box>
          <Stack
            direction="row"
            gap={1}
            sx={{
              mt: 4,
            }}
          >
            {(user as Users)?.wallet && (
              <FollowButtonUser wallet={(user as Users).wallet} />
            )}
            <SocialButtons socials={user.socials} copyNetworks={['discord']} />
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
            <Tab
              sx={{ fontSize: '12px' }}
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
    </>
  );
}
