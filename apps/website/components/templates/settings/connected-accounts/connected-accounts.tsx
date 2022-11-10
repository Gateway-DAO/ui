import useTranslation from 'next-translate/useTranslation';

import { AiFillGithub } from 'react-icons/ai';
import { FaTwitter } from 'react-icons/fa';

import { Stack, Typography } from '@mui/material';

import { AccountsCard } from './components/accounts-card';
import { ConnectionHandlerGithub } from './connectors/github-connection';
import { ConnectionHandlerTwitter } from './connectors/twitter-connection';

const ConnectedAccountsSettings = () => {
  const { t } = useTranslation('settings');
  const twitterConnection = ConnectionHandlerTwitter();
  const githubConnection = ConnectionHandlerGithub();

  return (
    <Stack>
      <Stack sx={{ width: '100%', mb: 5 }}>
        <Typography variant="h6" sx={{ mb: '4px' }}>
          {t('nav.connected-accounts-title')}
        </Typography>
        <Typography variant="body2" fontSize="12px">
          {t('connected-accounts.description')}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ flexWrap: 'wrap' }}
      >
        <AccountsCard
          id="twitter"
          title={t('connected-accounts.twitter.title')}
          description={t('connected-accounts.twitter.description')}
          icon={<FaTwitter fontSize="20px" />}
          connectHandler={twitterConnection}
        />
        <AccountsCard
          id="github"
          title={t('connected-accounts.github.title')}
          description={t('connected-accounts.github.description')}
          icon={<AiFillGithub fontSize="20px" />}
          connectHandler={githubConnection}
        />
      </Stack>
    </Stack>
  );
};

export default ConnectedAccountsSettings;
