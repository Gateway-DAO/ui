import { useEffect, useRef, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
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
} from '@mui/material';

import { useAuth } from '@/providers/auth';
import { LoadingButton } from '../../../../../atoms/loading-button';
import { TaskIcon } from '../../../../../atoms/task-icon';

type Props = {
  taskNumber: number;
  gateId: string;
  isEnabled: boolean;
  onCompleteGate: () => void;
};
export function RecaptchaTask({
  taskNumber,
  isEnabled,
  gateId,
  onCompleteGate,
}: Props) {
  const { me, gqlAuthMethods } = useAuth();
  const [recaptchaResponse, setRecaptchaResponse] = useState<string>();
  const [expanded, toggleExpanded] = useToggle(isEnabled);
  const recaptchaRef = useRef<Reaptcha>(null);

  useEffect(() => {
    toggleExpanded(isEnabled);
  }, [isEnabled]);

  const snackbar = useSnackbar();

  const queryClient = useQueryClient();

  const completeGate = useMutation(
    ['complete-gate', { gateId }],
    gqlAuthMethods.complete_gate,
    {
      onSuccess: () => {
        onCompleteGate();
        queryClient.resetQueries(['user_info', me?.id]);
      },
      onError: (e: any) => {
        setRecaptchaResponse(undefined);
        recaptchaRef.current?.reset();
        snackbar.enqueueSnackbar(e?.response?.errors?.[0]?.message, {
          variant: 'error',
        });
      },
    }
  );

  return (
    <Card
      sx={(theme) => ({
        borderRadius: 0,
        borderLeft: 'none',
        borderTop: 'none',
        backgroundColor: 'transparent !important',
        backgroundImage: !expanded && 'none !important',
        px: { xs: theme.spacing(1), md: theme.spacing(7) },
        py: { xs: theme.spacing(1), md: theme.spacing(5) },
      })}
    >
      <CardHeader
        avatar={
          <Avatar
            variant="rounded"
            sx={{
              backgroundColor: 'transparent',
              color: (theme) =>
                expanded ? theme.palette.background.default : 'white',
              border: expanded ? 'none' : '1px solid #FFFFFF4D',
            }}
          >
            <TaskIcon type="recaptcha" />
          </Avatar>
        }
        title={<Typography variant="caption">Are you a robot?</Typography>}
        subheader={<Typography variant="h6">reCaptcha</Typography>}
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
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
            onVerify={(e) => {
              setRecaptchaResponse(e);
            }}
            ref={(e) => (recaptchaRef.current = e)}
          />
          <LoadingButton
            type="button"
            disabled={!recaptchaResponse || !isEnabled}
            isLoading={completeGate.isLoading}
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => {
              completeGate.mutate({ gateId, recaptcha: recaptchaResponse });
            }}
          >
            Submit
          </LoadingButton>
        </CardContent>
      </Collapse>
    </Card>
  );
}
