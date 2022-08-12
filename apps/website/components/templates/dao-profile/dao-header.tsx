import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

import { TOKENS } from '@gateway/theme';

import { Edit } from '@mui/icons-material';
import {
  Chip,
  Box,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';

import { categoriesMap } from '../../../constants/dao';
import { ROUTES } from '../../../constants/routes';
import { useFile } from '../../../hooks/use-file';
import { AvatarFile } from '../../atoms/avatar-file';
import { FollowButtonDAO } from '../../atoms/follow-button-dao';
import { ShareButton } from '../../atoms/share-button';
import { Navbar } from '../../organisms/navbar/navbar';
import { SocialButtons } from '../../organisms/social-buttons';
import { useDaoProfile } from './context';

type Props = {
  followCount?: number;
  followIsLoaded: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
};

export function DaoHeader({
  followCount,
  followIsLoaded,
  onFollow,
  onUnfollow,
}: Props) {
  const { dao, isAdmin } = useDaoProfile();
  const cover = useFile(dao.background);
  const { t } = useTranslation('dao-profile');

  return (
    <>
      <Box
        sx={{
          height: (theme) => theme.spacing(35),
          pt: 2,
          position: 'relative',
          ...(!cover
            ? {
                background: `url(${dao.background_url})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }
            : {}),
        }}
      >
        <Navbar sx={{ zIndex: 1 }} />
        {cover?.url && cover?.blur ? (
          <Image
            src={cover.url}
            blurDataURL={cover.blur}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt={dao.name}
          />
        ) : null}
      </Box>
      <Box
        sx={{
          px: TOKENS.CONTAINER_PX,
          marginTop: -13,
        }}
      >
        <AvatarFile
          sx={{
            height: (theme) => theme.spacing(16.25),
            width: (theme) => theme.spacing(16.25),
            border: (theme) => `${theme.spacing(0.5)} solid`,
            borderColor: 'background.default',
          }}
          file={dao.logo}
          fallback={dao.logo_url}
        />
        <Box>
          <Stack direction="row" alignItems="baseline" gap={2}>
            <Typography component="h1" variant="h4" sx={{ paddingTop: '24px' }}>
              {dao.name}
            </Typography>

            {isAdmin && (
              <Link passHref href={ROUTES.DAO_EDIT.replace('[id]', dao.id)}>
                <Tooltip title={t('edit')}>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </Stack>
          {dao.categories && (
            <Stack direction="row" gap={1} sx={{ mt: 12 / 8 }}>
              {dao.categories.map((category) => {
                const label = categoriesMap.get(category) ?? category;
                const formattedLabel =
                  label.charAt(0).toUpperCase() + label.slice(1);
                return (
                  <Chip key={category} label={formattedLabel} size="small" />
                );
              })}
            </Stack>
          )}
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              maxWidth: {
                md: 1 / 2,
              },
            }}
            color="text.secondary"
          >
            {dao.description}
          </Typography>
          <Stack
            direction="row"
            gap={1}
            divider={<span>·</span>}
            sx={{ mt: 12 / 8 }}
          >
            {followIsLoaded && (
              <Typography variant="body1">
                {t('common:count.follower', {
                  count: followCount ?? 0,
                })}
              </Typography>
            )}
            <Typography variant="body1">
              {t('common:count.gate', { count: dao.gates?.length ?? 0 })}
            </Typography>
          </Stack>
          <SocialButtons socials={dao.socials} sx={{ mt: 4 }}>
            <FollowButtonDAO
              key={isAdmin ? 'isAdmin' : 'notAdmin'}
              daoId={dao.id}
              onFollow={onFollow}
              onUnfollow={onUnfollow}
              disabled={isAdmin}
            />
            <ShareButton title={`${dao.name} @ Gateway`} />
          </SocialButtons>
        </Box>
      </Box>
    </>
  );
}
