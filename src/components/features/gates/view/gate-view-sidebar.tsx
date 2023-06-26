import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentType, useState } from 'react';

import { AvatarFile } from '@/components/atoms/avatar-file';
import GateMintButton from '@/components/atoms/buttons/gate-mint-button';
import { ShareButton } from '@/components/atoms/buttons/share-button';
import { ReadMore } from '@/components/atoms/read-more-less';
import ModalShareCredential from '@/components/molecules/modal/modal-share-credential';
import { OptionsCredential } from '@/components/molecules/options-credential';
import type { Props as HolderDialogProps } from '@/components/organisms/holder-dialog';
import { MintDialogProtocol } from '@/components/organisms/mint/mint-modal/mint-dialog-protocol';
import { ROUTES } from '@/constants/routes';
import { useMintData } from '@/hooks/use-mint-data';
import { useAuth } from '@/providers/auth';
import { Gates } from '@/services/hasura/types';
import { TOKENS } from '@/theme';
import { isDaoAdmin } from '@/utils/is-dao-admin';
import { PartialDeep } from 'type-fest/source/partial-deep';

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

const HolderDialog: ComponentType<HolderDialogProps> = dynamic(
  () =>
    import('@/components/organisms/holder-dialog').then(
      (mod) => mod.HolderDialog
    ),
  { ssr: false }
);

const GateStateChip = dynamic(
  () => import('@/components/atoms/gate-state-chip'),
  {
    ssr: false,
  }
);

type GateViewSidebarProps = {
  gateProps: PartialDeep<Gates>;
  protocolCredential?: PartialDeep<Credential>;
};

export function GateViewSidebar({
  gateProps,
  protocolCredential,
}: GateViewSidebarProps) {
  const router = useRouter();
  const { me } = useAuth();
  const { t } = useTranslation('gate-profile');
  const [isHolderDialog, setIsHolderDialog] = useState(false);
  const isAdmin = isDaoAdmin({ me, gate: gateProps });

  const {
    isOpen,
    setIsOpen,
    shareStatus,
    shareIsOpen,
    setShareIsOpen,
    mintCredential,
    showMintButton,
  } = useMintData({
    credential: protocolCredential,
  });

  <HolderDialog
    {...{
      isHolderDialog,
      setIsHolderDialog,
      credentialId: gateProps?.id,
    }}
  />;

  const handleNavBack = () => {
    // If user directly lands to credential page using link
    if (window.history.state.idx === 0) {
      router.replace(ROUTES.MY_PROFILE);
    } else {
      router.back();
    }
  };

  const isLimitExceeded = gateProps?.claim_limit
    ? gateProps?.claim_limit <= gateProps?.holder_count
    : false;

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

  return (
    <>
      <MintDialogProtocol
        isOpen={mintCredential.isLoading || isOpen}
        status={shareStatus || mintCredential.status}
        onClose={() => setIsOpen(false)}
      />
      <ModalShareCredential
        credential={protocolCredential}
        handleClose={() => setShareIsOpen(false)}
        handleOpen={() => setShareIsOpen(true)}
        open={shareIsOpen}
        title={t('credential.share-dialog-title')}
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
                {isAdmin && <GateStateChip published={gateProps.published} />}
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
                <OptionsCredential gate={gateProps} />
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

          <Stack direction="row" gap={1} sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              disabled={!protocolCredential?.id}
              fullWidth
              size="large"
              sx={{
                mb: 2,
              }}
              onClick={() =>
                router.push({
                  host: ROUTES.PROTOCOL_CREDENTIAL,
                  query: { id: protocolCredential?.id },
                })
              }
            >
              {t('sidebar.see_credential')}
            </Button>
            <GateMintButton
              setMintModal={() => {
                setIsOpen(true);
                mintCredential.mutate({ credentialId: protocolCredential?.id });
              }}
              showButton={showMintButton}
            />
          </Stack>

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
                    {t('sidebar.claimed')}
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
                    {t('sidebar.holders')}
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
                    {t('sidebar.created_by')}
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
    </>
  );
}
