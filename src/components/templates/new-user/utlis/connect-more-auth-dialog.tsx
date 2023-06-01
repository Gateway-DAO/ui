import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Icon,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { FaTwitter } from 'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';
import { SocialAuthCard } from '../../../atoms/social-auth-card';
import { Dispatch, SetStateAction } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import useTranslation from 'next-translate/useTranslation';
import { ConnectionHandlerGithub } from '@/services/social-connectors/github-connection';
import { ConnectionHandlerTwitter } from '@/services/social-connectors/twitter-connection';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function ConnectMoreAuthDialog({ open, setOpen }: Props) {
  const { t } = useTranslation('dashboard-new-user');
  const githubConnection = ConnectionHandlerGithub();
  const twitterConnection = ConnectionHandlerTwitter();
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
            onClick={() => setOpen(false)}
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
          Connect accounts to make it easier to find you on Gateway and earn
          credentials
        </Typography>
        <Typography width={{ xs: '100%', md: '35%' }} variant="body1">
          Connect your social media, wallets, and other platform accounts to
          Gateway to strengthen your online identity and increase your
          visibility on the platform.
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
          We never share any of your data with third parties, and we only
          request the access permissions necessary to provide you with the best
          possible service when you connect your accounts to Gateway. Check our
          <Link href="/terms" underline="none">
            {' '}
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/terms" underline="none">
            {' '}
            Privacy Policy{' '}
          </Link>
          .
        </Typography>
        <div>
          <Button
            size="large"
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </div>
      </Stack>
    </Dialog>
  );
}
