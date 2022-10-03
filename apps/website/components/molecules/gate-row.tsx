import { ReadMore } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Chip,
  Snackbar,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTES } from 'apps/website/constants/routes';
import { useSnackbar } from 'apps/website/hooks/use-snackbar';
import { useAuth } from 'apps/website/providers/auth';
import { badgeProps } from 'apps/website/utils/badge-props';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import GateStateChip from '../atoms/gate-state-chip';
import MorePopover from '../atoms/more-popover';
import ConfirmDialog from '../organisms/confirm-dialog/confirm-dialog';

type DaoType = {
  id?: string;
};

type GateType = {
  id?: string;
  title?: string;
  description?: string;
  published?: string;
  categories?: string[];
  dao?: DaoType;
};

type GateRowProps = {
  isGate?: boolean;
  gate: GateType;
  showStatus?: boolean;
};

export default function GateRow({ isGate, gate, showStatus }: GateRowProps) {
  const { t } = useTranslation('gates-card');
  const router = useRouter();
  const snackbar = useSnackbar();
  const { gqlAuthMethods } = useAuth();
  const queryClient = useQueryClient();

  const [published, setPublished] = useState(gate.published);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmToggleState, setConfirmToggleState] = useState(false);

  const { mutate: toggleGateStateMutation } = useMutation(
    ['toggleGateState', gate.id],
    gqlAuthMethods.toggle_gate_state
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

          snackbar.onOpen({
            message:
              published === 'not_published' || published === 'paused'
                ? t('credential.published')
                : t('credential.unpublished'),
          });

          await queryClient.refetchQueries(['gate', gate.id]);
          await queryClient.refetchQueries(['dao-gates', gate.dao.id]);
        },
        onError() {
          snackbar.handleClick({
            message: t('credential.error.toggle'),
          });
        },
      }
    );

  const { mutate: deleteGateMutation } = useMutation(
    ['deleteGate', gate.id],
    gqlAuthMethods.deleteGate
  );

  const deleteGate = () =>
    deleteGateMutation(
      { gate_id: gate.id },
      {
        async onSuccess() {
          snackbar.onOpen({
            message: t('credential.deleted'),
          });

          await queryClient.refetchQueries(['gate', gate.id]);
          await queryClient.refetchQueries(['dao-gates', gate.dao.id]);
        },
        onError() {
          snackbar.handleClick({
            message: t('credential.error.delete'),
          });
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
      <Snackbar
        anchorOrigin={{
          vertical: snackbar.vertical,
          horizontal: snackbar.horizontal,
        }}
        open={snackbar.open}
        onClose={snackbar.handleClose}
        message={snackbar.message}
      />
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
