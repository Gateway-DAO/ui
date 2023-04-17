import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest/source/partial-deep';
import { v4 as uuidv4 } from 'uuid';

import { query } from '../../constants/queries';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../providers/auth';
import { Gates } from '../../services/hasura/types';
import { queryClient } from '../../services/query-client';
import MorePopover from '../atoms/more-popover';
import ConfirmDialog from '../organisms/confirm-dialog/confirm-dialog';

type Props = {
  gate: PartialDeep<Gates>;
};

export function OptionsCredential({ gate }: Props) {
  const { me, gqlAuthMethods } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmToggleState, setConfirmToggleState] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const isAdmin =
    me?.permissions?.filter(
      (permission) =>
        permission.dao_id === gate?.dao?.id && permission.dao?.is_admin
    ).length > 0;

  const onSuccess = async () => {
    enqueueSnackbar(
      `Credential ${
        gate.published === 'not_published' || gate.published === 'paused'
          ? 'published!'
          : 'unpublished!'
      }`
    );

    await queryClient.refetchQueries(['gate', gate?.id]);
    await queryClient.refetchQueries(['dao-gates', gate?.dao_id]);
    queryClient.refetchQueries([
      query.gate_progress_completed_by_loyalty_program,
      { userId: me?.id, loyaltyProgramId: gate.loyalty_id },
    ]);
    router.replace(router.asPath);
  };

  const gateOptions = useMemo(() => {
    return [
      {
        text:
          gate.published === 'not_published' || gate.published === 'paused'
            ? 'Publish'
            : 'Unpublish',
        action: () => setConfirmToggleState(true),
        hidden: false,
      },
      {
        text: 'Edit',
        action: () =>
          router.push(
            `${ROUTES.GATE_NEW}?dao=${gate?.dao.id}&gate=${gate?.id}`
          ),
        hidden: gate.published === 'published' || gate.published === 'paused',
      },
      {
        text: 'Delete',
        action: () => setConfirmDelete(true),
        hidden: false,
      },
    ];
  }, [gate?.dao.id, gate?.id, gate?.published, router]);

  const { mutate: deleteGateMutation } = useMutation(
    [query.delete_gate],
    gqlAuthMethods.deleteGate
  );

  const deleteGate = () =>
    deleteGateMutation(
      { gate_id: gate?.id },
      {
        onSuccess() {
          enqueueSnackbar(`Credential deleted!`);
          router.push(ROUTES.DAO_PROFILE.replace('[slug]', gate?.dao.slug));
        },
        onError(error) {
          console.log(error);
        },
      }
    );

  const { mutate: publishGate } = useMutation(
    [query.publish_gate],
    () =>
      gqlAuthMethods.publish_gate({
        gate_id: gate.id,
      }),
    {
      onSuccess,
    }
  );

  const { mutate: toggleGateStateMutation } = useMutation(
    ['toggleGateState'],
    gqlAuthMethods.toggle_gate_state
  );

  const toggleGateState = () =>
    toggleGateStateMutation(
      {
        gate_id: gate?.id,
        state: gate.published === 'published' ? 'paused' : 'published',
      },
      {
        onSuccess,
        onError() {
          enqueueSnackbar(`An error occured, couldn't toggle gate state.`);
        },
      }
    );

  return (
    <>
      {isAdmin && (
        <MorePopover options={gateOptions} withBackground key={uuidv4()} />
      )}
      <ConfirmDialog
        title="Are you sure you want to delete this credential?"
        open={confirmDelete}
        positiveAnswer="Delete"
        negativeAnswer="Cancel"
        setOpen={setConfirmDelete}
        onConfirm={deleteGate}
      >
        If you delete this credential, you will not be able to access it and
        this action cannot be undone.
      </ConfirmDialog>
      <ConfirmDialog
        title={
          gate.published === 'published'
            ? 'Are you sure to unpublish this credential?'
            : 'Are you sure you want to publish this credential?'
        }
        open={confirmToggleState}
        positiveAnswer={`${
          gate.published === 'published' ? 'Unpublish' : 'Publish'
        }`}
        negativeAnswer="Cancel"
        setOpen={setConfirmToggleState}
        onConfirm={
          gate?.published === 'not_published' ? publishGate : toggleGateState
        }
      >
        {gate.published === 'published'
          ? 'If you unpublish this credential, users will not be able to see it anymore.'
          : 'Publishing this credential will make it accessible by all users.'}
      </ConfirmDialog>
    </>
  );
}
