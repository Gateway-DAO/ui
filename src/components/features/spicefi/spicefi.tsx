import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ArcProgress = dynamic(() => import('react-arc-progress'), {
  ssr: false,
});

import { AvatarFile } from '@/components/atoms/avatar-file';
import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { ShareButton } from '@/components/atoms/buttons/share-button';
import { ReadMore } from '@/components/atoms/read-more-less';
import { HolderDialog } from '@/components/organisms/holder-dialog';
import { TokenFilled } from '@/components/organisms/mint/mint-card/assets/token-filled';
import { ClientNav } from '@/components/organisms/navbar/client-nav';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { hasuraPublicService } from '@/services/hasura/api';
import { Protocol_Mint_CredentialMutationVariables } from '@/services/hasura/types';
import { TOKENS } from '@/theme';
import { theme } from '@/theme';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';

export function SpiceFiTemplate() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const size = isMobile ? 325 : 500;
  const fillColor = {
    gradient: ['#9A53FF', '#FE02B9', '#5DABFB', '#0075FF'],
  };
  const customText = [
    {
      text: '0',
      font: 'Plus Jakarta Sans',
      size: '16px',
      color: '#FFFFFFB2',
      x: 50,
      y: 422,
    },
    {
      text: '36000',
      font: 'Plus Jakarta Sans',
      size: '16px',
      color: '#FFFFFFB2',
      x: 420,
      y: 422,
    },
  ];
  const { t } = useTranslation('sp-blur');

  const DATA_MODEL_ID = process.env.NEXT_PUBLIC_SPICE_DM_ID;

  const { me, hasuraUserService } = useAuth();
  const router = useRouter();
  const [isHolderDialog, setIsHolderDialog] = useState(false);
  const queryClient = useQueryClient();

  const { data: credentialData } = useQuery(
    ['spice-credential', me?.protocol?.id],
    () =>
      hasuraUserService.protocol_find_credentials_by_campaign({
        recipientUserId: me?.protocol?.id,
        dataModelId: DATA_MODEL_ID,
        take: 1,
        skip: 0,
      }),
    {
      enabled: !!me?.protocol?.id,
    }
  );

  const credential = credentialData?.protocol_credential[0];
  const points = credential?.claim?.rewardPoints || 0;
  const hasPoints = points > 0;

  const handleNavBack = () => {
    if (window.history.state.idx === 0) {
      router.replace(ROUTES.CREDIT_SCORE);
    } else {
      router.back();
    }
  };

  const { data: recipientsUsers } = useQuery(
    ['sp-blur-find-recipient-users', DATA_MODEL_ID],
    () =>
      hasuraPublicService.protocol_find_recipients_by_data_model({
        dataModelId: DATA_MODEL_ID,
        skip: 0,
        take: 10,
      }),
    {
      select: (data) => data.protocol_user,
    }
  );

  const { data: totalRecipientUsersCount } = useQuery(
    ['sp-blur-find-total-users', DATA_MODEL_ID],
    () =>
      hasuraPublicService.protocol_get_data_model_stats({
        dataModelId: DATA_MODEL_ID,
      }),
    {
      select: (data) =>
        data.protocol.getTotalCredentialsByDataModelGroupByRecipient,
    }
  );

  const { isLoading: isLoadingMintingCred, mutate } = useMutation(
    ['spice-api-mint-credential'],
    ({ credentialId }: Protocol_Mint_CredentialMutationVariables) => {
      return hasuraUserService.protocol_mint_credential({
        credentialId: credentialId,
      });
    },
    {
      onSuccess: () => queryClient.resetQueries(['user_protocol', me?.id]),
    }
  );

  return (
    <>
      <Grid
        container
        sx={{
          flexWrap: 'nowrap',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
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
              href={ROUTES.DAO_PROFILE.replace('[slug]', 'spice-finance')}
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
                <Avatar
                  alt="SpiceFi"
                  src="https://cdn.mygateway.xyz/image/jpeg/4d6997da-cbb4-414a-bc5a-ee9205154aee"
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
                  {t('gate.organization')}
                </Typography>
              </Stack>
            </Link>
            <Typography variant="h4" marginBottom={(theme) => theme.spacing(2)}>
              {t('gate.title')}
            </Typography>
            <Box marginBottom={(theme) => theme.spacing(2)}>
              <Stack
                direction={'row'}
                sx={{
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Chip
                    key={'points'}
                    label={t('gate.label')}
                    sx={{
                      marginRight: (theme) => theme.spacing(1),
                      marginBottom: (theme) => theme.spacing(1),
                    }}
                  />
                </Box>
                <Stack flexDirection="row" gap={1}>
                  <ShareButton title={t('gate.share-title')} />
                </Stack>
              </Stack>
            </Box>
            {t('gate.description')?.length > 250 ? (
              <ReadMore>{t('gate.description')}</ReadMore>
            ) : (
              <Typography
                variant="body1"
                marginBottom={(theme) => theme.spacing(4)}
                sx={{ wordBreak: 'break-word' }}
                paragraph={true}
              >
                {t('gate.description')}
              </Typography>
            )}

            {hasPoints ? (
              <Stack flexDirection="row" gap={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() =>
                    router.push(
                      ROUTES.PROTOCOL_CREDENTIAL.replace('[id]', credential.id)
                    )
                  }
                  sx={{
                    mb: 2,
                  }}
                >
                  SEE CREDENTIAL
                </Button>
                {!credential?.nft?.minted && (
                  <LoadingButton
                    variant="outlined"
                    startIcon={
                      <TokenFilled height={20} width={20} color="action" />
                    }
                    fullWidth
                    isLoading={isLoadingMintingCred}
                    onClick={() => mutate({ credentialId: credential?.id })}
                    sx={{
                      mb: 2,
                    }}
                  >
                    MINT AS NFT
                  </LoadingButton>
                )}
              </Stack>
            ) : (
              <Button
                variant="contained"
                fullWidth
                disabled={!hasPoints}
                onClick={() => router.push(ROUTES.EXPLORE)}
                sx={{
                  mb: 2,
                }}
              >
                SEE CREDENTIAL
              </Button>
            )}

            <Box
              component="img"
              src={credential?.image ?? '/images/campaigns/spice/default.png'}
              alt={'spice finance image'}
              marginBottom={(theme) => theme.spacing(4)}
              sx={{
                width: '100%',
                borderRadius: (theme) => theme.spacing(1),
              }}
            />
            <Grid container rowGap={(theme) => theme.spacing(3)}>
              {totalRecipientUsersCount > 0 && (
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
                    <AvatarGroup
                      total={
                        recipientsUsers?.length >= 3
                          ? 3
                          : recipientsUsers?.length
                      }
                      sx={{
                        justifyContent: 'flex-end',
                      }}
                    >
                      {recipientsUsers?.map((holder) => {
                        return (
                          <Link
                            key={holder.id}
                            passHref
                            href={`/profile/${holder.gatewayId}`}
                          >
                            <Tooltip title={holder.gatewayId}>
                              <Box
                                component="a"
                                sx={{ display: 'inline-block' }}
                              >
                                <AvatarFile
                                  alt={holder.gatewayId}
                                  file={holder?.gatewayUser?.picture}
                                  fallback={
                                    holder?.gatewayUser?.pfp || '/avatar.png'
                                  }
                                />
                              </Box>
                            </Tooltip>
                          </Link>
                        );
                      })}
                    </AvatarGroup>

                    {totalRecipientUsersCount > 3 ? (
                      <Chip label={`+ ${totalRecipientUsersCount - 3}`} />
                    ) : null}
                  </Grid>
                </>
              )}
              {true && (
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
                      {t('about.created-by')}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Link
                      passHref
                      href={ROUTES.DAO_PROFILE.replace(
                        '[slug]',
                        'spice-finance'
                      )}
                    >
                      <Tooltip title={t('gate.organization')}>
                        <Box
                          component="a"
                          sx={{
                            display: 'inline-block',
                            textDecoration: 'none',
                          }}
                        >
                          <Chip
                            variant="outlined"
                            label={t('gate.organization')}
                            avatar={
                              <Avatar
                                alt={t('gate.organization')}
                                src={`https://cdn.mygateway.xyz/image/jpeg/4d6997da-cbb4-414a-bc5a-ee9205154aee`}
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
        <Divider orientation="vertical" flexItem />
        <Grid
          display="flex"
          flexDirection="column"
          item
          xs={12}
          md
          sx={{
            px: {
              ...TOKENS.CONTAINER_PX,
              lg: 7.5,
            },
            pb: 2,
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              height: (theme) => theme.spacing(7),
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <ClientNav />
          </Stack>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">{t('about.title')}</Typography>
            <Typography variant="caption">{t('about.caption')}</Typography>
          </Box>

          <Paper
            component={Stack}
            elevation={3}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={3}
          >
            <Box position={'relative'}>
              <ArcProgress
                thickness={isMobile ? 15 : 20}
                progress={
                  !!me && hasPoints ? (points > 36000 ? 1 : points / 36000) : 0
                }
                fillThickness={isMobile ? 30 : 35}
                emptyColor="#FFFFFF26"
                size={size}
                fillColor={me ? fillColor : '#312938'}
                customText={customText}
                arcStart={140}
                arcEnd={400}
              />
              <Box
                position={'absolute'}
                top={-30}
                display="flex"
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                {!!me && hasPoints && (
                  <>
                    <Typography align={'center'} variant="h2">
                      {points}
                    </Typography>
                    <Typography align={'center'} variant="h6">
                      {credential?.title}
                    </Typography>
                  </>
                )}
                {!me && (
                  <>
                    <Typography
                      sx={{ marginTop: '60px' }}
                      align={'center'}
                      variant="body1"
                      marginLeft={{ xs: 2, md: 1 }}
                    >
                      Connect your wallet
                    </Typography>
                  </>
                )}
                {!!me && !hasPoints && (
                  <>
                    <Typography
                      sx={{
                        marginTop: '-30px',
                        marginLeft: { xs: '35%', md: '30px' },
                      }}
                      align={'center'}
                      variant="h1"
                    >
                      -
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: { xs: '0px', md: '40px' },
                        marginLeft: { xs: '42px', md: '34px' },
                      }}
                      align={'center'}
                      textAlign={'center'}
                      variant="h6"
                    >
                      {t('no-points.title')}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Paper>

          <Stack spacing={5} my={3}>
            <Stack spacing={1}>
              <Typography variant="h6" gutterBottom>
                {t('details.title')}
              </Typography>
              <Typography>{t('details.description')}</Typography>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="h6" gutterBottom>
                {t('how.title')}
              </Typography>
              <Typography>{t('how.description')}</Typography>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="h6" gutterBottom>
                {t('disclaimer.title')}
              </Typography>
              <Typography>{t('disclaimer.description')}</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <HolderDialog
        isHolderDialog={isHolderDialog}
        credentialId="937f9fc8-f3a7-4d28-88bc-826af1237c2c"
        setIsHolderDialog={setIsHolderDialog}
      />
    </>
  );
}
