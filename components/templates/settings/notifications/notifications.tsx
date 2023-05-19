import useTranslation from 'next-translate/useTranslation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ExpandMore } from '@mui/icons-material';
import { RestartAlt } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  Typography,
} from '@mui/material';

import { useAuth } from '../../../../providers/auth';
import { ChangeNotificationSettings } from '@/services/hasura/types';
import { DappNotifications, EmailNotifications } from './config';

function NotificationsSettings() {
  const { t } = useTranslation('settings');
  const { me, gqlAuthMethods } = useAuth();
  const settings = useQuery(
    ['notification-settings', me.id],
    () => gqlAuthMethods.me_notification_settings(),
    { select: (data) => data.me.notification_settings }
  );

  const changeSettings = useMutation(
    (input: ChangeNotificationSettings) =>
      gqlAuthMethods.notifications_settings_toggle_email({ input }),
    {
      onSuccess() {
        settings.refetch();
      },
    }
  );

  const isPageLoading =
    settings.isLoading || settings.isFetching || changeSettings.isLoading;
  const isEmailEnabled = settings.data === null || settings.data?.email_enabled;
  const isDappEnabled = settings.data === null || settings.data?.dapp_enabled;

  return (
    <Stack sx={{ width: '100%' }}>
      <Stack sx={{ width: '100%', mb: 5 }}>
        <Typography variant="h6" sx={{ mb: '4px' }}>
          {t('nav.notifications-title')}
        </Typography>
        <Typography variant="caption">
          {t('nav.notifications-description')}
        </Typography>
      </Stack>
      <div>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ mx: -2 }}
          >
            <Stack>
              <Typography>{t('notifications.dapp.title')}</Typography>
              <Typography variant="caption">
                {t('notifications.dapp.description')}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ mx: -2 }}>
            <List>
              <ListItem
                disablePadding
                secondaryAction={
                  <Button
                    variant="outlined"
                    startIcon={<RestartAlt />}
                    disabled={isPageLoading}
                    onClick={() => changeSettings.mutate({ dapp_reset: true })}
                  >
                    {t('common:actions.reset')}
                  </Button>
                }
              >
                <ListItemButton
                  role={undefined}
                  dense
                  disabled={isPageLoading}
                  onClick={() =>
                    changeSettings.mutate({ dapp_enabled: !isDappEnabled })
                  }
                >
                  <ListItemIcon>
                    <Switch
                      edge="start"
                      checked={isDappEnabled}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': 'dapp-all' }}
                      sx={{ ml: -2.5 }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id="dapp-all"
                    primary={t('notifications.dapp.all')}
                  />
                </ListItemButton>
              </ListItem>
              {DappNotifications.map((item) => (
                <ListItem disablePadding key={`dapp-${item}`}>
                  <ListItemButton
                    role={undefined}
                    dense
                    disabled={isPageLoading || !isDappEnabled}
                    onClick={() => changeSettings.mutate({ dapp_optout: item })}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={
                          !!(
                            isDappEnabled &&
                            !settings.data?.dapp_optout?.includes(item)
                          )
                        }
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': `dapp-${item}` }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={`dapp-${item}`}
                      primary={t(`notifications.types.${item}.title`)}
                      secondary={t(`notifications.types.${item}.description`)}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ mx: -2 }}
          >
            <Stack>
              <Typography>{t('notifications.email.title')}</Typography>
              <Typography variant="caption">
                {t('notifications.email.description')}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ mx: -2 }}>
            <List>
              <ListItem
                disablePadding
                secondaryAction={
                  <Button
                    variant="outlined"
                    startIcon={<RestartAlt />}
                    disabled={isPageLoading}
                    onClick={() => changeSettings.mutate({ email_reset: true })}
                  >
                    {t('common:actions.reset')}
                  </Button>
                }
              >
                <ListItemButton
                  role={undefined}
                  dense
                  disabled={isPageLoading}
                  onClick={() =>
                    changeSettings.mutate({ email_enabled: !isEmailEnabled })
                  }
                >
                  <ListItemIcon>
                    <Switch
                      edge="start"
                      checked={isEmailEnabled}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': 'email-all' }}
                      sx={{ ml: -2.5 }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id="email-all"
                    primary={t('notifications.email.all')}
                  />
                </ListItemButton>
              </ListItem>
              {EmailNotifications.map((item) => (
                <ListItem disablePadding key={`email-${item}`}>
                  <ListItemButton
                    role={undefined}
                    dense
                    disabled={isPageLoading || !isEmailEnabled}
                    onClick={() =>
                      changeSettings.mutate({ email_optout: item })
                    }
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={
                          !!(
                            isEmailEnabled &&
                            !settings.data?.email_optout?.includes(item)
                          )
                        }
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': `email-${item}` }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={`email-${item}`}
                      primary={t(`notifications.types.${item}.title`)}
                      secondary={t(`notifications.types.${item}.description`)}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </div>
    </Stack>
  );
}

export default NotificationsSettings;
