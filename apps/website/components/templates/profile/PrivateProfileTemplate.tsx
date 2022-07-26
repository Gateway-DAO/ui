import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { FaDiscord } from 'react-icons/fa';

import { TOKENS } from '@gateway/theme';

import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/IosShare';
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from '@mui/icons-material/Twitter';
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

import { a11yTabProps, TabPanel, useTab } from '../../../components/atoms/tabs';
import { Navbar } from '../../../components/organisms/navbar/navbar';
import { DashboardTemplate } from '../../../components/templates/dashboard';
import { ROUTES } from '../../../constants/routes';
import { generateImageUrl } from '../../../hooks/use-file';
import { useAuth } from '../../../providers/auth';
import { AvatarFile } from '../../atoms/avatar-file';
import { SocialButtons } from '../../organisms/social-buttons';
import { ActivityTab, OverviewTab } from './tabs';

export default function PrivateProfileTemplate() {
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();
  const router = useRouter();
  const { me } = useAuth();

  const tabs = useMemo(
    () => [
      {
        key: 'overview',
        label: t('common:tabs.overview'),
        section: <OverviewTab user={me} />,
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
            src={generateImageUrl(me.cover.id)}
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
          fallback={me.pfp}
        ></AvatarFile>
        <Box>
          <Typography
            sx={{ color: '#fff', paddingTop: { xs: '16px', md: '24px' } }}
            component="h1"
            variant="h4"
          >
            {me.name}
            <EditIcon
              onClick={() => router.push(ROUTES.PROFILE_EDIT)}
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
              }}
              width={{ xs: '100%', md: '50%' }}
            >
              {me.bio ||
                'Write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.'}
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
            <Typography>{me.following.length} connection(s)</Typography>·
            <Typography>{me.credentials.length} credential(s)</Typography>
          </Box>
          <Stack
            direction="row"
            gap={1}
            sx={{
              mt: 4,
            }}
          >
            <SocialButtons socials={me.socials} />
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
    </>
  );
}
