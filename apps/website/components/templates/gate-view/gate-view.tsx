import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { useMutation } from 'react-query';
import { PartialDeep } from 'type-fest';

import ViewInArIcon from '@mui/icons-material/ViewInAr';
import {
  AvatarGroup,
  Chip,
  Grid,
  Stack,
  Typography,
  Box,
  Divider,
  Button,
  Tooltip,
  Snackbar,
} from '@mui/material';

import { useAuth } from '../../../../website/providers/auth';
import { ROUTES } from '../../../constants/routes';
import { useMint } from '../../../hooks/use-mint';
import { useSnackbar } from '../../../hooks/use-snackbar';
import { Gates } from '../../../services/graphql/types.generated';
import { AvatarFile } from '../../atoms/avatar-file';
import CircularProgressWithLabel from '../../atoms/circular-progress-label';
import GateStateChip from '../../atoms/gate-state-chip';
import MorePopover from '../../atoms/more-popover';
import { ReadMore } from '../../atoms/read-more-less';
import { ShareButton } from '../../atoms/share-button';
import ConfirmDialog from '../../organisms/confirm-dialog/confirm-dialog';
import GateCompletedModal from '../../organisms/gates/view/modals/gate-completed';
import { Task, TaskGroup } from '../../organisms/tasks';

type GateViewProps = {
  gateProps: PartialDeep<Gates>;
};

export function GateViewTemplate({ gateProps }: GateViewProps) {
  const [open, setOpen] = useState(false);
  const [gateCompleted, setGateCompleted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmToggleState, setConfirmToggleState] = useState(false);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const { me, gqlAuthMethods } = useAuth();
  const { mint } = useMint();
  const router = useRouter();
  const snackbar = useSnackbar();

  const taskIds = gateProps?.tasks.map((task) => task.id);
  const tasksCount = gateProps.tasks.length;

  useEffect(() => {
    const completedTaskIds =
      me?.task_progresses.map((task) => task.task_id) || [];
    const allCompleted = taskIds.every((taskId) => {
      return completedTaskIds.includes(taskId);
    });

    setCompletedTasksCount(countSimiliarIds(completedTaskIds, taskIds));

    if (tasksCount > 0 && allCompleted) {
      setGateCompleted(true);
      handleOpen();
    }
  }, [taskIds, me?.task_progresses, completedTasksCount, tasksCount]);

  const isAdmin =
    me?.permissions?.filter((permission) => permission.dao?.is_admin).length >
    0;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const countSimiliarIds = (arr1: string[], arr2: string[]) => {
    return arr1.filter((id) => arr2.includes(id)).length;
  };

  const { mutate: toggleGateStateMutation } = useMutation(
    'toggleGateState',
    gqlAuthMethods.toggle_gate_state
  );

  const toggleGateState = () =>
    toggleGateStateMutation(
      {
        gate_id: gateProps.id,
        state: gateProps.published === 'published' ? 'paused' : 'published',
      },
      {
        onSuccess() {
          snackbar.onOpen({
            message: `Gate ${
              gateProps.published === 'not_published' ||
              gateProps.published === 'paused'
                ? 'published!'
                : 'unpublished!'
            }`,
          });
          //TODO: Refresh Chip component only
          router.reload();
        },
        onError() {
          snackbar.handleClick({
            message: "An error occured, couldn't toggle gate state.",
          });
        },
      }
    );

  const { mutate: deleteGateMutation } = useMutation(
    'deleteGate',
    gqlAuthMethods.deleteGate
  );

  const deleteGate = () =>
    deleteGateMutation(
      { gate_id: gateProps.id },
      {
        onSuccess() {
          snackbar.onOpen({
            message: 'Gate deleted!',
          });
          router.push(ROUTES.DAO_PROFILE.replace('[id]', gateProps.dao.id));
        },
        onError(error) {
          console.log(error);
        },
      }
    );

  const gateOptions = [
    {
      text:
        gateProps.published === 'not_published' ||
        gateProps.published === 'paused'
          ? 'Publish'
          : 'Unpublish',
      action: () => setConfirmToggleState(true),
      hidden: false,
    },
    {
      text: 'Edit',
      action: () =>
        router.push(
          `${ROUTES.GATE_NEW}?dao=${gateProps.dao.id}&gate=${gateProps.id}`
        ),
      hidden: gateProps.published === 'published',
    },
    {
      text: 'Delete',
      action: () => setConfirmDelete(true),
      hidden: false,
    },
  ];

  return (
    <Grid container height="100%" sx={{ flexWrap: 'nowrap' }}>
      <GateCompletedModal
        open={open}
        handleClose={handleClose}
        gate={gateProps}
      />
      <Grid item xs={12} md={5} p={(theme) => theme.spacing(7)}>
        {/* DAO info */}
        <Link passHref href={`/dao/${gateProps.dao.id}`}>
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
              alt={gateProps.dao.name}
              file={gateProps.dao.logo}
              fallback={gateProps.dao.logo_url}
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
              {gateProps.dao.name}
            </Typography>
          </Stack>
        </Link>

        <Typography variant="h4" marginBottom={(theme) => theme.spacing(2)}>
          {gateProps.title}
        </Typography>

        <Box marginBottom={(theme) => theme.spacing(4)}>
          <Stack
            direction={'row'}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box>
              {isAdmin && <GateStateChip published={gateProps.published} />}
              {gateProps.categories.map((category, idx) => (
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
              <ShareButton title={`${gateProps.title} @ Gateway`} />
              {isAdmin && <MorePopover options={gateOptions} />}
            </Stack>
          </Stack>
        </Box>
        {gateProps.description?.length > 250 ? (
          <ReadMore>{gateProps.description}</ReadMore>
        ) : (
          <Typography
            variant="body1"
            marginBottom={(theme) => theme.spacing(4)}
            sx={{ wordBreak: 'break-word' }}
            paragraph={true}
          >
            {gateProps.description}
          </Typography>
        )}
        {gateCompleted && (
          <Button
            fullWidth
            variant="contained"
            sx={{ marginBottom: 4 }}
            startIcon={<ViewInArIcon />}
            onClick={() => mint()}
          >
            Mint as NFT
          </Button>
        )}
        <Box
          component="img"
          src={gateProps.image}
          alt={gateProps.title + ' image'}
          marginBottom={(theme) => theme.spacing(4)}
          sx={{
            width: '100%',
            borderRadius: (theme) => theme.spacing(1),
          }}
        />

        <Grid container rowGap={(theme) => theme.spacing(3)}>
          {gateProps.holders.length > 0 && (
            <>
              <Grid item xs={4}>
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
                    gateProps.holders.length >= 5 ? 5 : gateProps.holders.length
                  }
                  sx={{
                    justifyContent: 'flex-end',
                  }}
                >
                  {gateProps.holders.map((holder) => {
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
          <Grid item xs={4}>
            <Typography
              variant="body2"
              color={(theme) => theme.palette.text.secondary}
            >
              Skills
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {gateProps.skills.map((skill, idx) => (
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
          {gateProps.creator && (
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
                <Link passHref href={`/profile/${gateProps.creator.username}`}>
                  <Tooltip title={gateProps.creator.name}>
                    <Box component="a" sx={{ display: 'inline-block' }}>
                      <AvatarFile
                        alt={gateProps.creator.username}
                        file={gateProps.creator.picture}
                        fallback={gateProps.creator.pfp || '/logo.png'}
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
        {/* Task Counter */}
        <Stack
          direction="row"
          alignItems="center"
          m={(theme) => theme.spacing(7)}
          marginBottom={(theme) => theme.spacing(10)}
        >
          <CircularProgressWithLabel
            variant="determinate"
            value={(completedTasksCount / gateProps.tasks.length) * 100}
            label={`${completedTasksCount}/${gateProps.tasks.length}`}
          />
          <Stack
            sx={{
              marginLeft: (theme) => theme.spacing(4),
            }}
          >
            <Typography variant="h6">Tasks</Typography>
            <Typography variant="caption">
              Complete the tasks to open this gate
            </Typography>
          </Stack>
        </Stack>

        <TaskGroup>
          {gateProps.tasks.map((task, idx) => (
            <Task key={'task-' + (idx + 1)} task={task} />
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
        title="Are you sure you want to delete this gate?"
        open={confirmDelete}
        positiveAnswer="Delete"
        negativeAnswer="Cancel"
        setOpen={setConfirmDelete}
        onConfirm={deleteGate}
      >
        If you delete this gate, you will not be able to access it and this
        action cannot be undone.
      </ConfirmDialog>
      <ConfirmDialog
        title={
          gateProps.published === 'published'
            ? 'Are you sure to unpublish this gate?'
            : 'Are you sure you want to publish this gate?'
        }
        open={confirmToggleState}
        positiveAnswer={`${
          gateProps.published === 'published' ? 'Unpublish' : 'Publish'
        }`}
        negativeAnswer="Cancel"
        setOpen={setConfirmToggleState}
        onConfirm={toggleGateState}
      >
        {gateProps.published === 'published'
          ? 'If you unpublish this gate, users will not be able to see it anymore.'
          : 'Publishing this gate will make it accessible by all users.'}
      </ConfirmDialog>
    </Grid>
  );
}
