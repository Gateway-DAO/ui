import { Link, Stack, Typography } from '@mui/material';
import { SocialAuthCard } from '@/components/atoms/social-auth-card';
import useTranslation from 'next-translate/useTranslation';
import { ConnectionHandlerGithub } from '@/services/social-connectors/github-connection';
import MailIcon from '@mui/icons-material/Mail';
import { AiFillGithub } from 'react-icons/ai';
import { FaTwitter } from 'react-icons/fa';
import { ConnectionHandlerTwitter } from '@/services/social-connectors/twitter-connection';

export function OtherAccount() {
  const { t } = useTranslation('settings');
  const githubConnection = ConnectionHandlerGithub();
  const twitterConnection = ConnectionHandlerTwitter();

  return (
    <Stack gap={3}>
      <div>
        <Typography variant="subtitle1" color={'white'} gutterBottom>
          {t('account-management.other-wallet.title')}
        </Typography>
        <Typography variant="caption" gutterBottom>
          {t('account-management.other-wallet.desc')}{' '}
          <Link href="/terms">{t('account-management.other-wallet.tos')}</Link>
        </Typography>
      </div>
      <Stack gap={3} direction={{ xs: 'column', md: 'row' }}>
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
    </Stack>
  );
}
