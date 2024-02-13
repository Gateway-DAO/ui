import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';

import { SocialAuthCardLink } from '@/components/atoms/social-auth-card-link';
import { WalletIconsTransition } from '@/components/atoms/wallet-icons-transition';
import { ROUTES } from '@/constants/routes';
import { AiFillGithub } from 'react-icons/ai';
import { FaTwitter } from 'react-icons/fa';

import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button, Dialog, Link, Stack, Typography } from '@mui/material';

type Props = {
  open: boolean;
  onClose: string;
};

export function ConnectMoreAuthDialog({ open, onClose }: Props) {
  const { t } = useTranslation('authentication');

  return (
    <Dialog
      open={open}
      sx={{
        '& .MuiPaper-root': {
          backgroundImage: 'none',
        },
      }}
      fullScreen
      keepMounted={false}
    >
      <Stack margin={{ xs: 2, md: 5 }}>
        <Stack justifyContent={'space-between'} direction={'row'}>
          <Avatar
            alt="Gateway logo"
            src="favicon-192.png"
            sx={{
              width: 28,
              height: 28,
              alignSelf: 'center',
            }}
          />
          <NextLink href={onClose} passHref>
            <Avatar
              component="a"
              sx={{
                width: 40,
                height: 40,
                alignSelf: 'center',
                cursor: 'pointer',
              }}
            >
              <CloseIcon />
            </Avatar>
          </NextLink>
        </Stack>
        <Typography
          variant="h4"
          width={{ xs: '100%', md: '35%' }}
          mt={{ xs: 4, md: 20.75 }}
          gutterBottom
        >
          {t('steps.completed.connect-more.title')}
        </Typography>
        <Typography width={{ xs: '100%', md: '35%' }} variant="body1">
          {t('steps.completed.connect-more.description')}
        </Typography>
        <Stack marginTop={6} direction={{ xs: 'column', md: 'row' }} gap={2}>
          <SocialAuthCardLink
            title={t('connected-accounts.wallet.title')}
            description={t('connected-accounts.wallet.description')}
            icon={<WalletIconsTransition />}
            href={`${ROUTES.SETTINGS_ACCOUNT_MANAGEMENT}#wallets`}
          />
          <SocialAuthCardLink
            title={t('connected-accounts.github.title')}
            description={t('connected-accounts.github.description')}
            icon={<AiFillGithub />}
            href={`${ROUTES.SETTINGS_ACCOUNT_MANAGEMENT}#other-accounts`}
          />
          <SocialAuthCardLink
            title={t('connected-accounts.twitter.title')}
            description={t('connected-accounts.twitter.description')}
            icon={<FaTwitter />}
            href={`${ROUTES.SETTINGS_ACCOUNT_MANAGEMENT}#other-accounts`}
          />
        </Stack>
        <Typography
          width={{ xs: '100%', md: '35%' }}
          variant="caption"
          mt={4}
          gutterBottom
        >
          {t('steps.completed.connect-more.terms-data')}
          <Link href="/terms" underline="none">
            {' '}
            {t('steps.completed.connect-more.terms')}
          </Link>{' '}
          {t('steps.completed.connect-more.and')}{' '}
          <Link href="/terms" underline="none">
            {' '}
            {t('steps.completed.connect-more.privacy-policy')}{' '}
          </Link>
          .
        </Typography>
        <div>
          <NextLink href={onClose} passHref>
            <Button
              component="a"
              size="large"
              variant="contained"
              sx={{ mt: 4 }}
            >
              {t('steps.completed.connect-more.done')}
            </Button>
          </NextLink>
        </div>
      </Stack>
    </Dialog>
  );
}