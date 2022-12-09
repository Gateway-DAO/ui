import { PartialDeep } from 'type-fest';

import { Cancel, CheckCircle } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Stack, Typography } from '@mui/material';

import {
  Users,
  Task_Progress,
} from '../../../../../../../../services/graphql/types.generated';
import { ManualTaskEventType } from '../../../../../../../../types/tasks';
import { AvatarFile } from '../../../../../../../atoms/avatar-file';
import { LoadingButton } from '../../../../../../../atoms/loading-button';

type Props = {
  progress: PartialDeep<Task_Progress>;
  user: PartialDeep<Users>;
  isSubmitEventLoading: boolean;
  onSubmitEvent: (event_type: ManualTaskEventType) => void;
  onBack: () => void;
};

export function SubmissionsDetailHeader({
  progress,
  user,
  isSubmitEventLoading,
  onBack,
  onSubmitEvent,
}: Props) {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ flex: 1 }}>
      <Stack direction="row" gap={1} alignItems="center">
        <IconButton
          sx={{
            p: 1,
            background: 'rgba(229, 229, 229, 0.16)',
          }}
          onClick={onBack}
          key="arrow-left"
        >
          <ArrowBackIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <AvatarFile file={user.picture} fallback="/avatar.png"></AvatarFile>
        <Typography
          sx={{ flexGrow: 1, ml: 0.5 }}
        >{`@${user.username}`}</Typography>
      </Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <LoadingButton
          variant="outlined"
          color="error"
          disabled={progress.completed === 'reject'}
          startIcon={<Cancel />}
          isLoading={isSubmitEventLoading}
          onClick={() => onSubmitEvent('reject')}
        >
          Reject
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          color="success"
          startIcon={<CheckCircle />}
          isLoading={isSubmitEventLoading}
          disabled={progress.completed === 'done'}
          onClick={() => onSubmitEvent('approve')}
        >
          Approve
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
