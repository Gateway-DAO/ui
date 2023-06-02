import useTranslation from 'next-translate/useTranslation';
import { ReactNode, useEffect, useState } from 'react';

import { CheckedButton } from '@/components/atoms/buttons/check-button';
import { useLocalStorage } from 'react-use';

import { Paper, Stack, Typography } from '@mui/material';

export type AccountHandlerConnection = {
  isConnected: boolean;
  connect: any;
  disconnect: any;
  isLoading: boolean;
};

export type AccountsCardProps = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  connectHandler: AccountHandlerConnection;
};

export function AccountsCard({
  id,
  title,
  description,
  icon,
  connectHandler,
}: AccountsCardProps) {
  const [connectedState, setConnectedState] = useState(false);
  const { t } = useTranslation('settings');
  const [githubAccessToken, setGithubAccessToken, remove] = useLocalStorage(
    'github_access_token',
    ''
  );

  useEffect(() => {
    setConnectedState(connectHandler.isConnected);
  }, [connectHandler.isConnected]);

  const connectToggle = () => {
    if (connectedState) {
      setConnectedState(true);
      connectHandler.disconnect();
    } else {
      setConnectedState(false);
      connectHandler.connect();
    }
  };

  return (
    <Paper
      component="div"
      id={id}
      elevation={1}
      sx={(theme) => ({
        width: {
          sx: '100%',
          md: '355px',
        },
        margin: '0 16px 16px 0',
        padding: '16px 24px 24px',
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: '8px',
      })}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        {icon}
        <CheckedButton
          isLoading={connectHandler.isLoading}
          checked={connectedState}
          clickHandler={connectToggle}
          labelOn={t('connected-accounts.connected')}
          labelOff={t('connected-accounts.connect')}
          labelOffHover={t('connected-accounts.disconnect')}
        />
      </Stack>
      <Stack>
        <Typography fontSize="16px" fontWeight={400} sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" fontSize="12px">
          {description}
        </Typography>
      </Stack>
    </Paper>
  );
}
