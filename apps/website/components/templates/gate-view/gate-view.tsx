import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, ComponentType } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';
import { v4 as uuidv4 } from 'uuid';

import {
  AvatarGroup,
  Chip,
  Grid,
  Stack,
  Typography,
  Box,
  Divider,
  Tooltip,
  Snackbar,
} from '@mui/material';

import { useAuth } from '../../../../website/providers/auth';
import { ROUTES } from '../../../constants/routes';
import { useSnackbar } from '../../../hooks/use-snackbar';
import { Gates } from '../../../services/graphql/types.generated';
import { AvatarFile } from '../../atoms/avatar-file';
import CircularProgressWithLabel from '../../atoms/circular-progress-label';
import { Props as MintCredentialButtonProps } from '../../atoms/mint-button';
import MorePopover from '../../atoms/more-popover';
import { ReadMore } from '../../atoms/read-more-less';
import { ShareButton } from '../../atoms/share-button';
import ConfirmDialog from '../../organisms/confirm-dialog/confirm-dialog';
import GateCompletedModal from '../../organisms/gates/view/modals/gate-completed';
import { Task, TaskGroup } from '../../organisms/tasks';

const GateStateChip = dynamic(() => import('../../atoms/gate-state-chip'), {
  ssr: false,
});

const MintCredentialButton: ComponentType<MintCredentialButtonProps> = dynamic(
  () =>
    import('../../atoms/mint-button').then((mod) => mod.MintCredentialButton),
  {
    ssr: false,
  }
);

type GateViewProps = {
  gateProps: PartialDeep<Gates>;
};

export function GateViewTemplate({ gateProps }: GateViewProps) {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmToggleState, setConfirmToggleState] = useState(false);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [published, setPublished] = useState(gateProps?.published);

  const { me, gqlAuthMethods } = useAuth();
  const router = useRouter();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const completedGate = completedTasksCount === gateProps?.tasks?.length;

  const taskIds = gateProps?.tasks.map((task) => task.id);

  useEffect(() => {
    const completedTaskIds =
      me?.task_progresses.map((task) => task.task_id) || [];

    setCompletedTasksCount(countSimiliarIds(completedTaskIds, taskIds));
  }, [taskIds, me?.task_progresses, gateProps, router]);

  const isAdmin =
    me?.permissions?.filter(
      (permission) =>
        permission.dao_id === gateProps?.dao?.id && permission.dao?.is_admin
    ).length > 0;

  const handleClose = () => setOpen(false);

  const countSimiliarIds = (arr1: string[], arr2: string[]) => {
    return arr1.filter((id) => arr2.includes(id)).length;
  };

  const credential_id = me?.credentials?.find(
    (cred) => cred?.gate_id === gateProps?.id
  )?.id;

  const { data: credential } = useQuery(
    ['credential', credential_id],
    () =>
      gqlAuthMethods.credential({
        id: credential_id,
      }),
    {
      enabled: !!credential_id,
    }
  );

  const { mutate: toggleGateStateMutation } = useMutation(
    ['toggleGateState'],
    gqlAuthMethods.toggle_gate_state
  );

  const toggleGateState = () =>
    toggleGateStateMutation(
      {
        gate_id: gateProps?.id,
        state: published === 'published' ? 'paused' : 'published',
      },
      {
        onSuccess: async (data) => {
          setPublished(data.update_gates_by_pk.published);

          snackbar.onOpen({
            message: `Credential ${
              published === 'not_published' || published === 'paused'
                ? 'published!'
                : 'unpublished!'
            }`,
          });

          await queryClient.refetchQueries(['gate', gateProps?.id]);
          await queryClient.refetchQueries(['dao-gates', gateProps?.dao_id]);
        },
        onError() {
          snackbar.handleClick({
            message: "An error occured, couldn't toggle gate state.",
          });
        },
      }
    );

  const { mutate: deleteGateMutation } = useMutation(
    ['deleteGate'],
    gqlAuthMethods.deleteGate
  );

  const deleteGate = () =>
    deleteGateMutation(
      { gate_id: gateProps?.id },
      {
        onSuccess() {
          snackbar.onOpen({
            message: 'Credential deleted!',
          });
          router.push(
            ROUTES.DAO_PROFILE.replace('[slug]', gateProps?.dao.slug)
          );
        },
        onError(error) {
          console.log(error);
        },
      }
    );

  const gateOptions = [
    {
      text:
        published === 'not_published' || published === 'paused'
          ? 'Publish'
          : 'Unpublish',
      action: () => setConfirmToggleState(true),
      hidden: false,
    },
    {
      text: 'Edit',
      action: () =>
        router.push(
          `${ROUTES.GATE_NEW}?dao=${gateProps?.dao.id}&gate=${gateProps?.id}`
        ),
      hidden: published === 'published' || published === 'paused',
    },
    {
      text: 'Delete',
      action: () => setConfirmDelete(true),
      hidden: false,
    },
  ];

  return (
    <Grid
      container
      height="100%"
      sx={{ flexWrap: 'nowrap', flexDirection: { xs: 'column', md: 'row' } }}
    >
      <GateCompletedModal
        open={open}
        handleClose={handleClose}
        gate={gateProps}
      />
      <Grid
        item
        xs={12}
        md={5}
        sx={(theme) => ({
          padding: {
            xs: `${theme.spacing(5)} ${theme.spacing(2)}`,
            md: `${theme.spacing(5)} ${theme.spacing(7)}`,
          },
        })}
      >
        <Box sx={{ height: { xs: '0px', md: '60px' } }}></Box>
        {/* DAO info */}
        <Link
          passHref
          href={ROUTES.DAO_PROFILE.replace('[slug]', gateProps?.dao.slug)}
        >
          <Stack
            direction="row"
            alignItems="center"
            width="fit-content"
            marginBottom={(theme) => theme.spacing(2)}
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                width: '100%',
              },
              cursor: 'pointer',
            })}
          >
            <AvatarFile
              alt={gateProps?.dao.name}
              file={gateProps?.dao.logo}
              fallback={gateProps?.dao.logo_url}
              sx={{
                height: (theme) => theme.spacing(3),
                width: (theme) => theme.spacing(3),
                marginRight: (theme) => theme.spacing(1),
              }}
            />
            <Typography
              variant="body2"
              color={(theme) => theme.palette.text.secondary}
            >
              {gateProps?.dao.name}
            </Typography>
          </Stack>
        </Link>

        <Typography variant="h4" marginBottom={(theme) => theme.spacing(2)}>
          {gateProps?.title}
        </Typography>

        <Box marginBottom={(theme) => theme.spacing(2)}>
          <Stack
            direction={'row'}
            sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
          >
            <Box>
              {isAdmin && <GateStateChip published={published} />}
              {gateProps?.categories.map((category, idx) => (
                <Chip
                  key={'category-' + (idx + 1)}
                  label={category}
                  sx={{
                    marginRight: (theme) => theme.spacing(1),
                    marginBottom: (theme) => theme.spacing(1),
                  }}
                />
              ))}
            </Box>
            <Stack flexDirection="row" gap={1}>
              <ShareButton title={`${gateProps?.title} @ Gateway`} />
              {isAdmin && <MorePopover options={gateOptions} key={uuidv4()} />}
            </Stack>
          </Stack>
        </Box>
        {gateProps?.description?.length > 250 ? (
          <ReadMore>{gateProps?.description}</ReadMore>
        ) : (
          <Typography
            variant="body1"
            marginBottom={(theme) => theme.spacing(4)}
            sx={{ wordBreak: 'break-word' }}
            paragraph={true}
          >
            {gateProps?.description}
          </Typography>
        )}

        {completedGate && credential?.credentials_by_pk.target_id == me?.id && (
          <MintCredentialButton credential={credential?.credentials_by_pk} />
        )}

        <Box
          component="img"
          src={gateProps?.image}
          alt={gateProps?.title + ' image'}
          marginBottom={(theme) => theme.spacing(4)}
          sx={{
            width: '100%',
            borderRadius: (theme) => theme.spacing(1),
          }}
        />

        <Grid container rowGap={(theme) => theme.spacing(3)}>
          {gateProps?.holders.length > 0 && (
            <>
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.text.secondary}
                >
                  Holders
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <AvatarGroup
                  total={
                    gateProps?.holders.length >= 5
                      ? 5
                      : gateProps?.holders.length
                  }
                  sx={{
                    justifyContent: 'flex-end',
                  }}
                >
                  {gateProps?.holders.map((holder) => {
                    return (
                      <Link
                        key={holder.id}
                        passHref
                        href={`/profile/${holder.username}`}
                      >
                        <Tooltip title={holder.name}>
                          <Box component="a" sx={{ display: 'inline-block' }}>
                            <AvatarFile
                              alt={holder.username}
                              file={holder.picture}
                              fallback={holder.pfp || '/logo.png'}
                            />
                          </Box>
                        </Tooltip>
                      </Link>
                    );
                  })}
                </AvatarGroup>
              </Grid>
            </>
          )}
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body2"
              color={(theme) => theme.palette.text.secondary}
            >
              Skills
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {gateProps?.skills.map((skill, idx) => (
              <Chip
                key={'skill-' + (idx + 1)}
                label={skill}
                sx={{
                  marginRight: (theme) => theme.spacing(1),
                  marginBottom: (theme) => theme.spacing(1),
                }}
              />
            ))}
          </Grid>
          {gateProps?.creator && (
            <>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.text.secondary}
                >
                  Created By
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Link passHref href={`/profile/${gateProps?.creator.username}`}>
                  <Tooltip title={gateProps?.creator.name}>
                    <Box component="a" sx={{ display: 'inline-block' }}>
                      <AvatarFile
                        alt={gateProps?.creator.username}
                        file={gateProps?.creator.picture}
                        fallback={gateProps?.creator.pfp || '/logo.png'}
                      />
                    </Box>
                  </Tooltip>
                </Link>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item xs={12} md>
        <Box sx={{ height: { xs: '0px', md: '60px' } }}></Box>
        {/* Task Counter */}
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            margin: { xs: '16px 16px 40px 16px', md: '60px' },
          }}
        >
          <CircularProgressWithLabel
            variant="determinate"
            value={(completedTasksCount / gateProps?.tasks.length) * 100}
            label={`${completedTasksCount}/${gateProps?.tasks.length}`}
            size={50}
            thickness={4}
            sx={{
              color: '#6DFFB9',
            }}
          />
          <Stack
            sx={{
              marginLeft: (theme) => theme.spacing(4),
            }}
          >
            <Typography variant="h6">Tasks</Typography>
            <Typography variant="caption">
              Complete the tasks to unlock this credential
            </Typography>
          </Stack>
        </Stack>

        <TaskGroup>
          {gateProps?.tasks.map((task, idx) => (
            <Task
              key={'task-' + (idx + 1)}
              task={task}
              readOnly={published !== 'published'}
              setCompletedGate={setOpen}
              isAdmin={isAdmin}
            />
          ))}
        </TaskGroup>
      </Grid>
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
          published === 'published'
            ? 'Are you sure to unpublish this credential?'
            : 'Are you sure you want to publish this credential?'
        }
        open={confirmToggleState}
        positiveAnswer={`${
          published === 'published' ? 'Unpublish' : 'Publish'
        }`}
        negativeAnswer="Cancel"
        setOpen={setConfirmToggleState}
        onConfirm={toggleGateState}
      >
        {published === 'published'
          ? 'If you unpublish this credential, users will not be able to see it anymore.'
          : 'Publishing this credential will make it accessible by all users.'}
      </ConfirmDialog>
    </Grid>
  );
}
