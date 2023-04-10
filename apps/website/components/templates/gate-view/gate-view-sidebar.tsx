import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useAuth } from 'apps/website/providers/auth';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest/source/partial-deep';
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
  Tooltip,
  IconButton,
  Avatar,
  Button,
} from '@mui/material';

import { ROUTES } from '../../../constants/routes';
import {
  CredentialQuery,
  Gates,
  Scalars,
} from '../../../services/hasura/types';
import { queryClient } from '../../../services/query-client';
import { AvatarFile } from '../../atoms/avatar-file';
import MorePopover from '../../atoms/more-popover';
import { ReadMore } from '../../atoms/read-more-less';
import { ShareButton } from '../../atoms/share-button';
import { TokenFilled } from '../../molecules/mint-card/assets/token-filled';
import ConfirmDialog from '../../organisms/confirm-dialog/confirm-dialog';

const GateStateChip = dynamic(() => import('../../atoms/gate-state-chip'), {
  ssr: false,
});

type GateViewSidebarProps = {
  gateProps: PartialDeep<Gates>;
  isAdmin: boolean;
  completedGate: boolean;
  isLimitExceeded: boolean;
  credential: CredentialQuery;
  setMintModal: (value: boolean) => void;
  setPublished: (value: string) => void;
  published: Scalars['gate_state'];
};

export function GateViewSidebar({
  gateProps,
  isAdmin,
  completedGate,
  isLimitExceeded,
  credential,
  setMintModal,
  setPublished,
  published,
}: GateViewSidebarProps) {
  const router = useRouter();
  const { me, gqlAuthMethods } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmToggleState, setConfirmToggleState] = useState(false);
  const [isHolderDialog, setIsHolderDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleNavBack = () => {
    // If user directly lands to credential page using link
    if (window.history.state.idx === 0) {
      router.replace(ROUTES.MY_PROFILE);
    } else {
      router.back();
    }
  };

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

  const dateFormatAccordingToTimeZone = new Intl.DateTimeFormat('en-US', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeZoneName: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getTime = dateFormatAccordingToTimeZone.format(
    new Date(gateProps?.expire_date)
  );
  const time = getTime.substring(0, getTime.indexOf('M') + 1);
  const timeZone = getTime.substring(getTime.indexOf('M') + 1);

  const isDateExpired = (() => {
    if (!gateProps?.expire_date) {
      return false;
    }
    const expireDate = new Date(gateProps?.expire_date);
    return expireDate.getTime() < new Date().getTime();
  })();

  const createdByImage =
    gateProps?.creator?.picture === null
      ? gateProps?.creator.pfp
      : gateProps?.creator.picture.id;

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

  return (
    <>
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
          <IconButton onClick={() => handleNavBack()}>
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
            credential?.credentials_by_pk?.target_id == me?.id &&
            (credential?.credentials_by_pk?.status == 'minted' ? (
              <Button
                component="a"
                variant="outlined"
                href={credential.credentials_by_pk.transaction_url}
                target="_blank"
                startIcon={
                  <TokenFilled height={20} width={20} color="action" />
                }
                fullWidth
                sx={{
                  borderColor: '#E5E5E580',
                  color: 'white',
                  mb: 2,
                }}
              >
                VERIFY MINT TRANSACTION
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={
                  <TokenFilled height={20} width={20} color="action" />
                }
                fullWidth
                onClick={() => setMintModal(true)}
                sx={{
                  mb: 2,
                }}
              >
                MINT AS NFT
              </Button>
            ))}

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
            {gateProps?.expire_date && (
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
                    Expiry
                  </Typography>
                </Grid>
                <Grid item xs={8} sx={{ marginTop: '19px' }}>
                  <Typography
                    variant="subtitle2"
                    color={isDateExpired ? '#FFA726' : 'secondary'}
                    fontWeight={600}
                  >
                    {new Date(gateProps.expire_date).toLocaleDateString(
                      'en-us',
                      {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }
                    )}
                    {isDateExpired && (
                      <Chip
                        sx={{ marginLeft: 2 }}
                        label="expired"
                        color={'warning'}
                        variant="outlined"
                      />
                    )}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    display={'inline'}
                    color={isDateExpired ? '#FFA726' : 'secondary'}
                    fontWeight={600}
                  >
                    {time}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    display={'inline'}
                    color={isDateExpired ? '#FFA726' : '#FFFFFFB2'}
                    fontWeight={600}
                  >
                    {timeZone}
                  </Typography>
                </Grid>
              </>
            )}

            {gateProps?.claim_limit && (
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
                    Claimed
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    variant="subtitle2"
                    color={isLimitExceeded ? '#FFA726' : 'secondary'}
                    fontWeight={600}
                  >
                    {' '}
                    {gateProps?.holder_count} of {gateProps?.claim_limit}{' '}
                    {isLimitExceeded && (
                      <Chip
                        sx={{ marginLeft: 2 }}
                        label="completed"
                        color={'warning'}
                        variant="outlined"
                      />
                    )}
                  </Typography>
                </Grid>
              </>
            )}

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
                      <Box
                        component="a"
                        sx={{ display: 'inline-block', textDecoration: 'none' }}
                      >
                        <Chip
                          variant="outlined"
                          label={gateProps?.creator.username}
                          avatar={
                            <Avatar
                              alt={gateProps?.creator.username}
                              src={`https://api.staging.mygateway.xyz/storage/file?id=${createdByImage}`}
                            />
                          }
                          sx={{ cursor: 'pointer' }}
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
    </>
  );
}
