import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import ArcProgress from 'react-arc-progress';

import { TOKENS } from '@gateway/theme';

import { InfoOutlined } from '@mui/icons-material';
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
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link as MUILink } from '@mui/material';

import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../../../providers/auth';
import {
  gatewayProtocolAuthSDK,
  gatewayProtocolSDK,
} from '../../../services/gateway-protocol/api';
import { MintCredentialMutationVariables } from '../../../services/gateway-protocol/types';
import { gqlAnonMethods } from '../../../services/hasura/api';
import { AvatarFile } from '../../atoms/avatar-file';
import { LoadingButton } from '../../atoms/loading-button';
import { ReadMore } from '../../atoms/read-more-less';
import { ShareButton } from '../../atoms/share-button';
import { TokenFilled } from '../../molecules/mint-card/assets/token-filled';
import { HolderDialog } from '../../organisms/holder-dialog';
import { ClientNav } from '../../organisms/navbar/client-nav';
import LoadingModal from './LoadingModal';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  display: 'flex',
  flexGrow: 1,
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  color: theme.palette.text.secondary,
  height: 108,
  padding: 35,
  lineHeight: '160%',
  textTransform: 'uppercase',
}));

export function CreditScoreTemplate() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const fillColor = {
    gradient: ['#9A53FF', '#FE02B9', '#5DABFB', '#0075FF'],
  };
  const customText = isMobile
    ? [
        {
          text: '300',
          font: 'Plus Jakarta Sans',
          size: '16px',
          color: '#FFFFFFB2',
          x: 50,
          y: 262,
        },
        {
          text: '1000',
          font: 'Plus Jakarta Sans',
          size: '16px',
          color: '#FFFFFFB2',
          x: 260,
          y: 262,
        },
      ]
    : [
        {
          text: '300',
          font: 'Plus Jakarta Sans',
          size: '16px',
          color: '#FFFFFFB2',
          x: 50,
          y: 422,
        },
        {
          text: '1000',
          font: 'Plus Jakarta Sans',
          size: '16px',
          color: '#FFFFFFB2',
          x: 420,
          y: 422,
        },
      ];
  const { t } = useTranslation('credit-score');

  const DATA_MODEL_ID = process.env.NEXT_PUBLIC_CRED_PROTOCOL_DM_ID;

  const { me, gqlAuthMethods, token } = useAuth();
  const router = useRouter();
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [isHolderDialog, setIsHolderDialog] = useState(false);
  const queryClient = useQueryClient();

  const { data: credScore } = useQuery(
    ['cred-api-score-single', me?.wallet],
    async () => {
      const result = await gqlAuthMethods.get_cred_score({
        address: me?.wallet,
      });
      return result.get_cred_score;
    },
    {
      enabled: !!me?.wallet,
    }
  );

  const scale = (1000 - 0) / (1000 - 300);
  const creditScore = 0 + (credScore?.value - 300) * scale;

  const isCreditScore = !!credScore?.account;
  const checkIfUserHasCredential = me?.protocol?.receivedCredentials?.find(
    (something) => something?.dataModel?.id === DATA_MODEL_ID
  );

  const handleNavBack = () => {
    if (window.history.state.idx === 0) {
      router.replace(ROUTES.CREDIT_SCORE);
    } else {
      router.back();
    }
  };

  const issueCredential = async () => {
    refetch();
    setOpenLoadingModal(true);
  };

  const { refetch, isFetching: createCredentialLoading } = useQuery(
    ['cred-api-create-credential', me?.wallet],
    async () => {
      const result = await gqlAuthMethods.create_cred({
        gatewayId: me?.username,
        score: credScore?.value,
        bearerToken: token,
      });

      await router.push(
        ROUTES.PROTOCOL_CREDENTIAL.replace(
          '[id]',
          result.create_cred.credentialId
        )
      );

      await queryClient.resetQueries(['user_protocol', me?.id]);

      return result.create_cred.credentialId;
    },
    {
      enabled: false,
    }
  );

  const { data: recipientsUsers } = useQuery(
    ['cred-api-find-recipient-user', DATA_MODEL_ID],
    async () => {
      const result = await gqlAnonMethods.findRecipientsByDataModel({
        dataModelId: DATA_MODEL_ID,
        skip: 0,
        take: 10,
      });
      return result.protocol_user;
    }
  );

  const { data: totalRecipientUsersCount } = useQuery(
    ['cred-api-find-total-users', DATA_MODEL_ID],
    async () => {
      const s = await gatewayProtocolSDK.getDataModelStats({
        dataModelId: DATA_MODEL_ID,
      });
      return s.getTotalCredentialsByDataModelGroupByRecipient;
    }
  );

  const { isLoading: isLoadingMintingCred, mutate } = useMutation(
    ['cred-api-mint-credential'],
    ({ credentialId }: MintCredentialMutationVariables) => {
      return gatewayProtocolAuthSDK(token).mintCredential({
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
              href={ROUTES.DAO_PROFILE.replace('[slug]', 'cred-protocol')}
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
                  alt="Cred Protocol"
                  src="/images/cred_protocol_logo.jpg"
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
                    key={'creditscore'}
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

            {checkIfUserHasCredential?.dataModel?.id ? (
              <Stack flexDirection="row" gap={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() =>
                    router.push(
                      ROUTES.PROTOCOL_CREDENTIAL.replace(
                        '[id]',
                        checkIfUserHasCredential?.id
                      )
                    )
                  }
                  sx={{
                    mb: 2,
                  }}
                >
                  CHECK CREDENTIAL
                </Button>
                {!checkIfUserHasCredential?.nft?.minted && (
                  <LoadingButton
                    variant="outlined"
                    startIcon={
                      <TokenFilled height={20} width={20} color="action" />
                    }
                    fullWidth
                    isLoading={isLoadingMintingCred}
                    onClick={() =>
                      mutate({ credentialId: checkIfUserHasCredential.id })
                    }
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
                disabled={!isCreditScore}
                onClick={() => refetch()}
                sx={{
                  mb: 2,
                }}
              >
                ISSUE CREDENTIAL
              </Button>
            )}

            <Box
              component="img"
              src={'/images/cred-protocol-page.png'}
              alt={'credit score' + ' image'}
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
                        'cred-protocol'
                      )}
                    >
                      <Tooltip title={'Cred Protocol'}>
                        <Box
                          component="a"
                          sx={{
                            display: 'inline-block',
                            textDecoration: 'none',
                          }}
                        >
                          <Chip
                            variant="outlined"
                            label={'Cred Protocol'}
                            avatar={
                              <Avatar
                                alt={'Cred Protocol'}
                                src={`https://pbs.twimg.com/profile_images/1425122906044964864/Xrgs0ACt_400x400.jpg`}
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
            alignContent={'center'}
          >
            <Box position={'relative'}>
              <ArcProgress
                style={
                  isMobile
                    ? {
                        width: '300px',
                        height: '300px',
                      }
                    : null
                }
                thickness={isMobile ? 10 : 20}
                progress={!!me && isCreditScore ? creditScore / 1000 : 0}
                fillThickness={isMobile ? 20 : 35}
                emptyColor="#FFFFFF26"
                size={isMobile ? 300 : 500}
                fillColor={me ? fillColor : '#312938'}
                customText={customText}
                arcStart={140}
                arcEnd={400}
              />
              <Box
                position={'absolute'}
                top={isMobile ? 100 : 170}
                left={isMobile ? 100 : 160}
                width={'40%'}
              >
                {!!me && isCreditScore && (
                  <>
                    <Typography
                      align={'center'}
                      variant={isMobile ? 'h2' : 'h1'}
                    >
                      {credScore?.value}
                    </Typography>
                    <Typography align={'center'} variant={'h6'}>
                      {credScore?.value_rating}
                    </Typography>
                  </>
                )}
                {!me && (
                  <>
                    <Typography
                      sx={{ marginTop: isMobile ? '30px' : '60px' }}
                      textAlign={'center'}
                      variant="h6"
                    >
                      Connect your wallet
                    </Typography>
                  </>
                )}
                {!!me && !isCreditScore && (
                  <>
                    <Typography
                      sx={{
                        marginTop: '-30px',
                        marginLeft: isMobile ? '-10px' : '0px',
                      }}
                      textAlign={'center'}
                      variant="h1"
                    >
                      -
                    </Typography>
                    <Typography
                      sx={{ marginTop: '-10px' }}
                      variant="h6"
                      textAlign={'center'}
                    >
                      No Score
                    </Typography>
                    <Tooltip title={t('no-score.title')}>
                      <IconButton sx={{ marginX: isMobile ? '30%' : '40%' }}>
                        <InfoOutlined />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Box>
              <Box
                position={'absolute'}
                bottom={isMobile ? 5 : 35}
                left={isMobile ? 110 : 198}
              >
                <Typography
                  align={'center'}
                  variant={isMobile ? 'body2' : 'body1'}
                >
                  {t('about.progress.powered-by')}
                  <MUILink
                    href="https://www.credprotocol.com/"
                    target="_blank"
                    underline="none"
                  >
                    <Typography variant={isMobile ? 'body2' : 'inherit'}>
                      {t('about.progress.cred-protocol')}
                    </Typography>
                  </MUILink>
                </Typography>
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
                {t('why.title')}
              </Typography>
              <Typography>{t('why.description')}</Typography>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="h6" gutterBottom>
                {t('utility.title')}
              </Typography>
              <Stack
                direction={{
                  lg: 'row',
                  md: 'column',
                  sm: 'column',
                  xs: 'column',
                }}
                spacing={3}
              >
                <Item variant="outlined">{t('utility.label-1')}</Item>
                <Item variant="outlined">{t('utility.label-2')}</Item>
                <Item variant="outlined">{t('utility.label-3')}</Item>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <LoadingModal openLoadingModal={createCredentialLoading} />
      <HolderDialog
        isHolderDialog={isHolderDialog}
        credentialId="937f9fc8-f3a7-4d28-88bc-826af1237c2c"
        setIsHolderDialog={setIsHolderDialog}
      />
    </>
  );
}
