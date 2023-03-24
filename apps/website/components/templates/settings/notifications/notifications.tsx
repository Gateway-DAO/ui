import useTranslation from 'next-translate/useTranslation';

import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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

const EMAIL_ENUMS = {};

function NotificationsSettings() {
  const { t } = useTranslation('settings');

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
              <ListItem disablePadding>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Switch
                      edge="start"
                      checked
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': 'email-all' }}
                      sx={{ ml: -2.5 }}
                    />
                  </ListItemIcon>
                  <ListItemText id="email-all" primary={`Line item`} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': 'email-single' }}
                    />
                  </ListItemIcon>
                  <ListItemText id="email-single" primary={`Line item`} />
                </ListItemButton>
              </ListItem>
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
              <ListItem disablePadding>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Switch
                      edge="start"
                      checked
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': 'email-all' }}
                      sx={{ ml: -2.5 }}
                    />
                  </ListItemIcon>
                  <ListItemText id="email-all" primary={`Line item`} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': 'email-single' }}
                    />
                  </ListItemIcon>
                  <ListItemText id="email-single" primary={`Line item`} />
                </ListItemButton>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </div>
    </Stack>
  );
}

export default NotificationsSettings;
