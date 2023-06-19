import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

import { AvatarFile } from '@/components/atoms/avatar-file';
import { FollowButtonDAO } from '@/components/atoms/buttons/follow-button-dao';
import { ShareButton } from '@/components/atoms/buttons/share-button';
import { ReadMore } from '@/components/atoms/read-more-less';
import { SlideUp } from '@/components/atoms/transitions/transitions';
import { Navbar } from '@/components/organisms/navbar/navbar';
import { SocialButtons } from '@/components/organisms/social-buttons';
import Stepper from '@/components/organisms/stepper/stepper';
import { categoriesMap } from '@/constants/dao';
import { ROUTES } from '@/constants/routes';
import { gateway_discord, gateway_support_email } from '@/constants/socials';
import { useFile } from '@/hooks/use-file';
import { TOKENS, brandColors } from '@/theme';
import { useToggle, useWindowSize } from 'react-use';

import { Edit } from '@mui/icons-material';
import {
  Chip,
  Box,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  Paper,
  Button,
  Link as LinkM,
} from '@mui/material';

import { useDaoProfile } from './context';

type Props = {
  followCount: number;
  onFollow: () => void;
  onUnfollow: () => void;
};

const ApprovalDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: any;
}): JSX.Element => {
  const windowSize = useWindowSize();
  const { t } = useTranslation('org-signup');

  const steps = [
    {
      title: t('step-success.stepper-1'),
    },
    {
      title: t('step-success.stepper-2'),
    },
    {
      title: t('step-success.stepper-3'),
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={SlideUp}
      fullScreen
    >
      <Stack
        sx={{
          backgroundColor: brandColors.background.main,
          height: { xs: 'auto', md: '100%' },
          flexWrap: 'nowrap',
          flexDirection: { xs: 'column', md: 'row' },
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          minHeight: `${windowSize.height}px`,
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          component={Stack}
          elevation={3}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          p={3}
          sx={{
            width: {
              xs: '100%',
              sm: '444px',
            },
            height: {
              xs: '100%',
              sm: '571px',
            },
          }}
        >
          <Stack textAlign="left" width="100%">
            <Typography mb={3} variant="h6">
              Waiting for approval
            </Typography>
            <Stepper steps={steps} activeStep={1} />
            <Box mt={3}>
              <Typography variant="body1" mb={1}>
                We are reviewing your application.
              </Typography>
              <Typography variant="body1" mb={1}>
                In the meantime you can customize your space, draft credentials,
                but can not issue them publicly.
              </Typography>
              <Typography variant="body1" mb={1}>
                If your application is denied, the profile and all draft
                credentials will be deleted.
              </Typography>
              <Typography variant="body1" mb={1}>
                If you have questions please reach out to us via{' '}
                <LinkM
                  sx={{ textDecoration: 'none' }}
                  href={`mailto:${gateway_support_email}`}
                >
                  email
                </LinkM>{' '}
                or{' '}
                <LinkM
                  sx={{ textDecoration: 'none' }}
                  href={gateway_discord}
                  target="_blank"
                >
                  Discord
                </LinkM>
                .
              </Typography>
            </Box>
            <Box mt={3}>
              <Button
                onClick={onClose}
                variant="outlined"
                size="large"
                fullWidth
              >
                Close
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Dialog>
  );
};

export function DaoHeader({ followCount, onFollow, onUnfollow }: Props) {
  const { dao, credentials, isAdmin } = useDaoProfile();
  const cover = useFile(dao.background);
  const { t } = useTranslation('dao-profile');
  const [approvalDialogStatus, toggleApprovalDialogStatus] = useToggle(false);

  return (
    <>
      <ApprovalDialog
        open={approvalDialogStatus}
        onClose={toggleApprovalDialogStatus}
      />
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
              <Link passHref href={ROUTES.DAO_EDIT.replace('[slug]', dao.slug)}>
                <Tooltip title={t('edit')}>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </Stack>
          <Stack direction="row" alignItems="center" gap="8px">
            {dao.status === 'pending' && (
              <Chip
                onClick={() => toggleApprovalDialogStatus()}
                sx={{ mt: 1.25 }}
                color="warning"
                label="Waiting for approval"
                size="small"
              />
            )}
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
          </Stack>
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
            <ReadMore>{dao.description}</ReadMore>
          </Typography>
          <Stack
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
                count: credentials?.daos_by_pk?.gates.length ?? 0,
              })}
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
