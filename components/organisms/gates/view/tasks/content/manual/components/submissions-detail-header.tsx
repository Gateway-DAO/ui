import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { PartialDeep } from 'type-fest';

import { Cancel, CheckCircle } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Stack, Typography } from '@mui/material';

import ConfirmDialog from '../../../../../../../../components/organisms/confirm-dialog/confirm-dialog';
import {
  Users,
  Task_Progress,
} from '../../../../../../../../services/hasura/types';
import { ManualTaskEventType } from '../../../../../../../../types/tasks';
import { AvatarFile } from '../../../../../../../atoms/avatar-file';
import { LoadingButton } from '../../../../../../../atoms/loading-button';

type Props = {
  progress: PartialDeep<Task_Progress>;
  user: PartialDeep<Users>;
  isSubmitEventLoading: boolean;
  latestSubmitEvent?: ManualTaskEventType;
  onSubmitEvent: (event_type: ManualTaskEventType) => void;
  onBack: () => void;
};

export function SubmissionsDetailHeader({
  progress,
  user,
  latestSubmitEvent,
  isSubmitEventLoading,
  onBack,
  onSubmitEvent,
}: Props) {
  const [selectedEvent, setSelectedEvent] = useState<
    Extract<ManualTaskEventType, 'approve' | 'reject'> | undefined
  >();
  const isCompleted =
    progress?.completed === 'reject' || progress?.completed === 'done';
  const { t } = useTranslation('gate-profile');
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ flex: 1, flexDirection: { lg: 'row', xs: 'column' } }}
      >
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
          <AvatarFile file={user?.picture} fallback="/avatar.png"></AvatarFile>
          <Typography
            sx={{ flexGrow: 1, ml: 0.5 }}
          >{`@${user?.username}`}</Typography>
        </Stack>
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          sx={{ mt: { xs: 2, lg: 0 } }}
        >
          <LoadingButton
            variant={
              progress?.completed === 'reject' ? 'contained' : 'outlined'
            }
            color="error"
            startIcon={<Cancel />}
            isLoading={isSubmitEventLoading && latestSubmitEvent === 'reject'}
            disabled={isSubmitEventLoading || isCompleted}
            onClick={() => setSelectedEvent('reject')}
          >
            {t('submissions.reject')}
          </LoadingButton>
          <LoadingButton
            variant={progress?.completed === 'done' ? 'contained' : 'outlined'}
            color="success"
            startIcon={<CheckCircle />}
            isLoading={isSubmitEventLoading && latestSubmitEvent === 'approve'}
            disabled={isSubmitEventLoading || isCompleted}
            onClick={() => setSelectedEvent('approve')}
          >
            {t('submissions.approve')}
          </LoadingButton>
        </Stack>
      </Stack>
      <ConfirmDialog
        title={`${t('submissions.dialog_title')} ${
          selectedEvent === 'approve'
            ? t('submissions.approve')
            : t('submissions.reject')
        }`}
        open={!!selectedEvent}
        setOpen={() => setSelectedEvent(undefined)}
        positiveAnswer={t('common:actions.confirm')}
        negativeAnswer={t('common:actions.cancel')}
        onConfirm={() => onSubmitEvent(selectedEvent)}
      >
        {t('submissions.dialog_text')}
      </ConfirmDialog>
    </>
  );
}
