import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import GateStateChip from '@/components/atoms/gate-state-chip';
import MorePopover from '@/components/atoms/more-popover';
import ConfirmDialog from '@/components/molecules/modal/confirm-dialog';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { Gates } from '@/services/hasura/types';
import { badgeProps } from '@/utils/badge-props';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest';

import { ReadMore } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Chip,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

type GateRowProps = {
  isGate?: boolean;
  gate: PartialDeep<Gates>;
  showStatus?: boolean;
};

export default function GateRow({ isGate, gate, showStatus }: GateRowProps) {
  const { t } = useTranslation('gates-card');
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { hasuraUserService } = useAuth();
  const queryClient = useQueryClient();

  const [published, setPublished] = useState(gate.published);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmToggleState, setConfirmToggleState] = useState(false);

  const { mutate: toggleGateStateMutation } = useMutation(
    ['toggleGateState', gate.id],
    hasuraUserService.toggle_gate_state
  );

  const toggleGateState = () =>
    toggleGateStateMutation(
      {
        gate_id: gate.id,
        state: published === 'published' ? 'paused' : 'published',
      },
      {
        onSuccess: async (data) => {
          setPublished(data.update_gates_by_pk.published);

          enqueueSnackbar(
            published === 'not_published' || published === 'paused'
              ? t('credential.published')
              : t('credential.unpublished')
          );

          await queryClient.refetchQueries(['gate', gate.id]);
          await queryClient.refetchQueries(['dao-gates', gate.dao.id]);
        },
        onError() {
          enqueueSnackbar(t('credential.error.toggle'), { variant: 'error' });
        },
      }
    );

  const { mutate: deleteGateMutation } = useMutation(
    ['deleteGate', gate.id],
    hasuraUserService.deleteGate
  );

  const deleteGate = () =>
    deleteGateMutation(
      { gate_id: gate.id },
      {
        async onSuccess() {
          enqueueSnackbar(t('credential.deleted'));

          await queryClient.refetchQueries(['gate', gate.id]);
          await queryClient.refetchQueries(['dao-gates', gate.dao.id]);
        },
        onError() {
          enqueueSnackbar(t('credential.error.delete'));
        },
      }
    );

  const gateOptions = [
    {
      text:
        published === 'not_published' || published === 'paused'
          ? t('publish')
          : t('unpublish'),
      action: () => setConfirmToggleState(true),
      hidden: false,
    },
    {
      text: t('edit'),
      action: () =>
        router.push(`${ROUTES.GATE_NEW}?dao=${gate.dao.id}&gate=${gate.id}`),
      hidden: published === 'published' || published === 'paused',
    },
    {
      text: t('delete'),
      action: () => setConfirmDelete(true),
      hidden: false,
    },
  ];

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={gate.id}>
        <TableCell>
          <Stack alignItems="center" direction="row" gap={1}>
            <Avatar variant="rounded" {...badgeProps(gate)}>
              {gate.title?.[0]}
            </Avatar>
            <Box>
              <Typography>{gate.title}</Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'break-word',
                }}
              >
                {gate.description.length > 100 ? (
                  <ReadMore>{gate.description}</ReadMore>
                ) : (
                  gate.description
                )}
              </Typography>
            </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack direction="row" gap={1}>
            {isGate && showStatus && (
              <GateStateChip published={gate.published} />
            )}
            {gate.categories?.map((category) => (
              <Chip
                key={`gate-${gate.id}-category-${category}`}
                label={category}
              />
            ))}
          </Stack>
        </TableCell>
        <TableCell>
          <MorePopover options={gateOptions} />
        </TableCell>
      </TableRow>
      <ConfirmDialog
        title={t('credential.confirm.delete.title')}
        open={confirmDelete}
        positiveAnswer="Delete"
        negativeAnswer="Cancel"
        setOpen={setConfirmDelete}
        onConfirm={deleteGate}
      >
        {t('credential.confirm.delete.text')}
      </ConfirmDialog>
      <ConfirmDialog
        title={
          published === 'published'
            ? t('credential.confirm.unpublish.title')
            : t('credential.confirm.publish.title')
        }
        open={confirmToggleState}
        positiveAnswer={`${
          published === 'published' ? t('unpublish') : t('publish')
        }`}
        negativeAnswer={t('cancel')}
        setOpen={setConfirmToggleState}
        onConfirm={toggleGateState}
      >
        {published === 'published'
          ? t('credential.confirm.unpublish.text')
          : t('credential.confirm.publish.text')}
      </ConfirmDialog>
    </>
  );
}
