import { useState } from 'react';

import { useToggle } from 'react-use';
import Reaptcha from 'reaptcha';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
  Collapse,
  Button,
} from '@mui/material';
type Props = {
  isEnabled: boolean;
};
export function RecaptchaTask({ isEnabled }: Props) {
  const [verified, setVerified] = useState<string>();
  const [expanded, toggleExpanded] = useToggle(false);

  return (
    <Card
      sx={(theme) => ({
        borderRadius: 0,
        borderLeft: 'none',
        borderTop: 'none',
        backgroundColor: 'transparent !important',
        backgroundImage: 'none !important',
        px: { xs: theme.spacing(1), md: theme.spacing(7) },
        py: { xs: theme.spacing(1), md: theme.spacing(5) },
      })}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: expanded ? 'white' : 'transparent',
              color: (theme) =>
                expanded ? theme.palette.background.default : 'white',
              border: expanded ? 'none' : '1px solid #FFFFFF4D',
            }}
          >
            {'TaskTitle'}
          </Avatar>
        }
        title={<Typography variant="caption">Captcha</Typography>}
        subheader={<Typography variant="h6">Recaptchaaaa</Typography>}
        action={
          <IconButton
            onClick={() => {
              toggleExpanded();
            }}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ marginLeft: { xs: '0px', md: '55px' } }}>
          <Reaptcha
            sitekey="6Lfi4kcjAAAAAOXoH341Iu2Gnd8R_P6cWzRmqLId"
            onVerify={(e) => {
              setVerified(e);
            }}
          />
          <Button
            type="button"
            disabled={!verified || !isEnabled}
            variant="contained"
            sx={{ mt: 4 }}
          >
            Submit
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
