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

import { categoriesMap } from '../../../../../../constants/dao';
import { ROUTES } from '../../../../../../constants/routes';
import { useFile } from '../../../../../../hooks/use-file';
import { AvatarFile } from '../../../../../atoms/avatar-file';
import { FollowButtonDAO } from '../../../../../atoms/follow-button-dao';
import { ReadMore } from '../../../../../atoms/read-more-less';
import { ShareButton } from '../../../../../atoms/share-button';
import { Navbar } from '../../../../../organisms/navbar/navbar';
import { SocialButtons } from '../../../../../organisms/social-buttons';
import { useOrganizationContext } from '../context';
// import { useDaoProfile } from './context';

export function Header() {
  //   const { dao, credentials, isAdmin } = useDaoProfile();
  const { organization } = useOrganizationContext();
  //   const cover = useFile(dao.background);
  const cover = null;
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
                background:
                  'linear-gradient(265.82deg, #432F70 0.24%, #23182E 84.35%);',
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
            alt={organization.name}
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
          file={'/avatar.png'}
          fallback={'/avatar.png'}
        />
        <Box>
          <Stack direction="row" alignItems="baseline" gap={2}>
            <Typography component="h1" variant="h4" sx={{ paddingTop: '24px' }}>
              {organization.name}
            </Typography>

            {/* {isAdmin && (
              <Link
                passHref
                href={ROUTES.DAO_EDIT.replace('[slug]', organization.gatewayId)}
              >
                <Tooltip title={t('edit')}>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Link>
            )} */}
          </Stack>
          {/* {dao.categories && (
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
          )} */}
          <Typography
            component="h5"
            style={{
              fontSize: '16px',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
            variant="h6"
          >
            @{organization.gatewayId}
          </Typography>
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
            <ReadMore>{organization.description}</ReadMore>
          </Typography>
          {/* <Stack
            direction="row"
            gap={1}
            divider={<span>·</span>}
            sx={{ mt: 12 / 8 }}
          >
            <Typography variant="body1">
              {t('common:count.follower', {
                count: followCount ?? 0,
              })}
            </Typography>
            <Typography variant="body1">
              {t('common:count.credential', {
                count: credentials?.daos_by_pk.gates.length ?? 0,
              })}
            </Typography>
          </Stack> */}
          {/* <SocialButtons socials={dao.socials} sx={{ mt: 4 }}>
            <FollowButtonDAO
              key={isAdmin ? 'isAdmin' : 'notAdmin'}
              daoId={dao.id}
              onFollow={onFollow}
              onUnfollow={onUnfollow}
              disabled={isAdmin}
            />
            <ShareButton title={`${dao.name} @ Gateway`} />
          </SocialButtons> */}
        </Box>
      </Box>
    </>
  );
}
