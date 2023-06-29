import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction } from 'react';

import { SocialAuthCard } from '@/components/atoms/social-auth-card';
import { useConnectionHandlerGithub } from '@/services/social-connectors/github-connection';
import { useConnectionHandlerTwitter } from '@/services/social-connectors/twitter-connection';
import { AiFillGithub } from 'react-icons/ai';
import { FaTwitter } from 'react-icons/fa';

import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button, Dialog, Link, Stack, Typography } from '@mui/material';
type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function ConnectMoreAuthDialog({ open, setOpen }: Props) {
  const { t } = useTranslation('authentication');

  const githubConnection = useConnectionHandlerGithub();
  const twitterConnection = useConnectionHandlerTwitter();
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
          <Avatar
            sx={{
              width: 40,
              height: 40,
              alignSelf: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon />
          </Avatar>
        </Stack>
        <Typography
          variant="h4"
          width={{ xs: '100%', md: '35%' }}
          mt={{ xs: 4, md: 20.75 }}
          gutterBottom
        >
          {t('connect-more.title')}
        </Typography>
        <Typography width={{ xs: '100%', md: '35%' }} variant="body1">
          {t('connect-more.description')}
        </Typography>
        <Stack marginTop={6} direction={{ xs: 'column', md: 'row' }} gap={2}>
          <SocialAuthCard
            title={t('connected-accounts.github.title')}
            description={t('connected-accounts.github.description')}
            icon={<AiFillGithub />}
            connectHandler={githubConnection}
          />

          <SocialAuthCard
            title={t('connected-accounts.twitter.title')}
            description={t('connected-accounts.twitter.description')}
            icon={<FaTwitter />}
            connectHandler={twitterConnection}
          />
          <SocialAuthCard
            title={t('connected-accounts.github.title')}
            description={t('connected-accounts.github.description')}
            icon={<AiFillGithub />}
            connectHandler={githubConnection}
          />

          <SocialAuthCard
            title={t('connected-accounts.twitter.title')}
            description={t('connected-accounts.twitter.description')}
            icon={<FaTwitter />}
            connectHandler={twitterConnection}
          />
        </Stack>
        <Typography
          width={{ xs: '100%', md: '35%' }}
          variant="caption"
          mt={4}
          gutterBottom
        >
          {t('connect-more.terms-data')}
          <Link href="/terms" underline="none">
            {' '}
            {t('connect-more.terms')}
          </Link>{' '}
          {t('connect-more.and')}{' '}
          <Link href="/terms" underline="none">
            {' '}
            {t('connect-more.privacy-policy')}{' '}
          </Link>
          .
        </Typography>
        <div>
          <Button
            size="large"
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => {
              setOpen(false);
            }}
          >
            {t('connect-more.done')}
          </Button>
        </div>
      </Stack>
    </Dialog>
  );
}
