import { CircularProgress, IconButton, Paper, Stack, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { brandColors } from "@gateway/theme";
import { CheckedButton } from "../atoms/check-button";

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
    if (connectedState) {
      setConnectedState(true);
      connectHandler.disconnect();
    } else {
      setConnectedState(false);
      connectHandler.connect.mutate();
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
        <CheckedButton
          isLoading={connectHandler.isLoading}
          checked={connectedState}
          clickHandler={connectToggle}
        >
          {connectedState ? 'Connected' : 'Connect'}
        </CheckedButton>
      </Stack>
      <Stack>
        <Typography fontSize="16px" fontWeight={400} sx={{ mb: 1 }}>{title}</Typography>
        <Typography variant="body2" fontSize="12px">{description}</Typography>
      </Stack>
    </Paper>
  );
}
