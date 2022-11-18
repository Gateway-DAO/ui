import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, ComponentType } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest';
import { v4 as uuidv4 } from 'uuid';

import { TOKENS } from '@gateway/theme';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  AvatarGroup,
  Chip,
  Grid,
  Stack,
  Typography,
  Box,
  Divider,
  Tooltip,
  IconButton,
  Avatar,
} from '@mui/material';

import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../../../providers/auth';
import { gqlAnonMethods } from '../../../services/api';
import { Gates } from '../../../services/graphql/types.generated';
import { AvatarFile } from '../../atoms/avatar-file';
import { Props as MintCredentialButtonProps } from '../../atoms/mint-button';
import MorePopover from '../../atoms/more-popover';
import { ReadMore } from '../../atoms/read-more-less';
import { ShareButton } from '../../atoms/share-button';
import ConfirmDialog from '../../organisms/confirm-dialog/confirm-dialog';
import GateCompletedModal from '../../organisms/gates/view/modals/gate-completed';
import type { Props as HolderDialogProps } from '../../organisms/holder-dialog';
import { DirectHoldersList } from './direct-holders-list/direct-holders-list';
import { DirectHoldersHeader } from './direct-holders-list/header';
import { DraftDirectHoldersList } from './draft-direct-holders-list/draft-direct-holders-list';
import { TaskList } from './task-list';

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

const HolderDialog: ComponentType<HolderDialogProps> = dynamic(
  () => import('../../organisms/holder-dialog').then((mod) => mod.HolderDialog),
  { ssr: false }
);

type GateViewProps = {
  gateProps: PartialDeep<Gates>;
};

export function GateViewTemplate({ gateProps }: GateViewProps) {
  const [open, setOpen] = useState(false);
  const [isHolderDialog, setIsHolderDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmToggleState, setConfirmToggleState] = useState(false);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [published, setPublished] = useState(gateProps?.published);

  const { me, gqlAuthMethods } = useAuth();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const directCredentialInfo = useQuery(
    ['direct-credential-info', me?.wallet, gateProps.id],
    () =>
      gqlAnonMethods.direct_credential_info({
        gate_id: gateProps.id,
        wallet: me?.wallet ?? '',
      }),
    {
      enabled:
        gateProps &&
        gateProps.type === 'direct' &&
        gateProps.published === 'published',
    }
  );

  const completedGate =
    gateProps.type === 'direct'
      ? directCredentialInfo.data?.hasCredential?.aggregate?.count > 0
      : completedTasksCount === gateProps?.tasks?.length;

  const taskIds = gateProps?.tasks.map((task) => task.id);

  useEffect(() => {
    const completedTaskIds =
      me?.task_progresses
        .filter((task) => task.completed == 'done')
        .map((task) => task.task_id) || [];

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

  const { data: credential } = useQuery(['credential', credential_id], () =>
    gqlAuthMethods.credential({
      id: credential_id,
    })
  );

  const { mutate: publishGate } = useMutation(
    ['publishGate'],
    () =>
      gqlAuthMethods.publish_gate({
        gate_id: gateProps.id,
      }),
    {
      onSuccess: async (data) => {
        setPublished(data.publish_gate.published);

        enqueueSnackbar(
          `Credential ${
            published === 'not_published' || published === 'paused'
              ? 'published!'
              : 'unpublished!'
          }`
        );

        await queryClient.refetchQueries(['gate', gateProps?.id]);
        await queryClient.refetchQueries(['dao-gates', gateProps?.dao_id]);
      },
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

          enqueueSnackbar(
            `Credential ${
              published === 'not_published' || published === 'paused'
                ? 'published!'
                : 'unpublished!'
            }`
          );

          await queryClient.refetchQueries(['gate', gateProps?.id]);
          await queryClient.refetchQueries(['dao-gates', gateProps?.dao_id]);
        },
        onError() {
          enqueueSnackbar(`An error occured, couldn't toggle gate state.`);
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
          enqueueSnackbar(`Credential deleted!`);
          router.push(
            ROUTES.DAO_PROFILE.replace('[slug]', gateProps?.dao.slug)
          );
        },
        onError(error) {
          console.log(error);
        },
      }
    );

  const { data: gateProgress } = useQuery(
    ['gate_progress', gateProps?.id, me?.id],
    () =>
      gqlAuthMethods.GateProgress({
        gateID: gateProps?.id,
        userID: me?.id,
      })
  );

  const completedAt = gateProgress?.gate_progress[0]?.completed_at;

  const formattedDate = new Date(completedAt?.toLocaleString()).toLocaleString(
    'en-us',
    { hour12: true }
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
      <HolderDialog
        {...{
          isHolderDialog,
          setIsHolderDialog,
          credentialId: gateProps?.id,
        }}
      />
      <Grid item xs={12} md={5}>
        <Stack
          direction="row"
          flexGrow={1}
          alignItems="center"
          gap={1}
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
            px: TOKENS.CONTAINER_PX,
            flexGrow: {
              md: 0.5,
            },
          }}
        >
          <IconButton onClick={() => router.back()}>
            <Avatar>
              <ArrowBackIcon />
            </Avatar>
          </IconButton>
        </Stack>
        {/* DAO info */}
        <Box
          sx={(theme) => ({
            padding: {
              xs: `${theme.spacing(5)} ${theme.spacing(2)}`,
              md: `${theme.spacing(5)} ${theme.spacing(7)}`,
            },
          })}
        >
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
                {isAdmin && (
                  <MorePopover
                    options={gateOptions}
                    withBackground
                    key={uuidv4()}
                  />
                )}
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

          {completedGate &&
            !!credential &&
            credential?.credentials_by_pk.target_id == me?.id && (
              <MintCredentialButton
                credential={credential?.credentials_by_pk}
              />
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
            {gateProps?.holder_count > 0 && (
              <>
                <Grid
                  item
                  xs={4}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography
                    variant="body2"
                    color={(theme) => theme.palette.text.secondary}
                  >
                    Holders
                  </Typography>
                </Grid>
                <Grid item xs={8} display="flex" alignItems="center">
                  <AvatarGroup>
                    {gateProps?.holders.map((holder, index) => {
                      if (index == 3) return null;
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
                                sx={{
                                  mx: 1,
                                }}
                              />
                            </Box>
                          </Tooltip>
                        </Link>
                      );
                    })}
                  </AvatarGroup>

                  {gateProps?.holder_count > 3 ? (
                    <Chip
                      label={`+ ${gateProps?.holder_count - 3}`}
                      onClick={() => {
                        setIsHolderDialog(!isHolderDialog);
                      }}
                    />
                  ) : null}
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
                <Grid
                  item
                  xs={4}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography
                    variant="body2"
                    color={(theme) => theme.palette.text.secondary}
                  >
                    Created By
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Link
                    passHref
                    href={`/profile/${gateProps?.creator.username}`}
                  >
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
        </Box>
      </Grid>
      <Divider orientation="vertical" flexItem />
      {published !== 'not_published' && gateProps.type === 'direct' && (
        <DirectHoldersList
          gate={gateProps}
          isLoading={directCredentialInfo.isLoading}
          header={
            <DirectHoldersHeader
              hasCredential={completedGate}
              totalHolders={
                directCredentialInfo.data?.whitelisted_wallets_aggregate
                  ?.aggregate.count
              }
              completedAt={credential?.credentials_by_pk?.created_at}
            />
          }
        />
      )}
      {published !== 'published' && gateProps.type === 'direct' && (
        <DraftDirectHoldersList gate={gateProps} />
      )}
      {gateProps.type === 'task_based' && (
        <TaskList
          tasks={gateProps?.tasks}
          completedAt={completedAt}
          completedTasksCount={completedTasksCount}
          formattedDate={formattedDate}
          isAdmin={isAdmin}
          published={published}
          setOpen={setOpen}
        />
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
        onConfirm={
          gateProps?.published === 'not_published'
            ? publishGate
            : toggleGateState
        }
      >
        {published === 'published'
          ? 'If you unpublish this credential, users will not be able to see it anymore.'
          : 'Publishing this credential will make it accessible by all users.'}
      </ConfirmDialog>
    </Grid>
  );
}
