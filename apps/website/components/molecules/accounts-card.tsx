import { Box, CircularProgress, IconButton, Paper, Stack, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { brandColors } from "@gateway/theme";

export type AccountHandlerConnection = {
  isConnected: boolean;
  connect: any;
  disconnect: any;
  isLoading: boolean;
}

export type AccountsCardProps = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  connectHandler: AccountHandlerConnection;
};

export function AccountsCard(props: AccountsCardProps) {
  const [connectedState, setConnectedState] = useState(false);
  const { id, title, description, icon, connectHandler } = props;

  useEffect(() => {
    setConnectedState(connectHandler.isConnected);
  }, [connectHandler.isConnected]);

  const connectToggle = () => {
    if (connectHandler.connect) {
      setConnectedState(false);
      connectHandler.connect.mutate();
    } else {
      setConnectedState(true);
      connectHandler.disconnect();
    }
  }

  return (
    <Paper
      component="div"
      id={id}
      elevation={1}
      sx={(theme) => ({
        width: {
          sx: '100%',
          md: '355px'
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
        <IconButton
          onClick={() => connectToggle()}
          sx={(theme) => ({
            borderRadius: '20px',
            cursor: 'pointer',
            background: connectedState ? brandColors.green.main : brandColors.background.light,
            fontSize: '11px',
            textTransform: 'uppercase',
            fontWeight: theme.typography.fontWeightBold,
            border: connectedState ? '1px solid transparent' : `1px solid ${brandColors.purple.main}`,
            color: connectedState ? '#170627' : brandColors.purple.main,
            padding: '4px 8px',
            minHeight: '30px',
            transition: 'all .3s ease',
            '&:hover': {
              borderColor: connectedState ? brandColors.green.dark : brandColors.purple.dark,
              backgroundColor: connectedState ? brandColors.green.dark : brandColors.background.light,
            },
          })}
          >
            {
              connectHandler.isLoading &&
              <CircularProgress size="15px" sx={{ mr: 1 }} />
            }
            {
              connectedState && !connectHandler.isLoading &&
              <CheckCircleIcon sx={{ fontSize: '15px', display: connectedState ? 'block' : 'none', mr: 1 }} />
            }
            {connectedState ? 'Connected' : 'Connect'}
        </IconButton>
      </Stack>
      <Stack>
        <Typography fontSize="16px" fontWeight={400} sx={{ mb: 1 }}>{title}</Typography>
        <Typography variant="body2" fontSize="12px">{description}</Typography>
      </Stack>
    </Paper>
  );
}
