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
} from '@mui/material';
import { Link as MUILink } from '@mui/material';
import { ReadMore } from '../../atoms/read-more-less';

import { useRouter } from 'next/router';
import { useAuth } from '../../../providers/auth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { ROUTES } from '../../../constants/routes';
import Link from 'next/link';
import { TOKENS } from '@gateway/theme';
import { ShareButton } from '../../atoms/share-button';
import { ClientNav } from '../../organisms/navbar/client-nav';
import Image from 'next/image';
import ArcProgress from 'react-arc-progress';
import useTranslation from 'next-translate/useTranslation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Info, InfoOutlined } from '@mui/icons-material';
import { TokenFilled } from '../../molecules/mint-card/assets/token-filled';
import { useState } from 'react';
import LoadingModal from './LoadingModal';
import {
  gatewayProtocolAuthSDK,
  gatewayProtocolSDK,
} from 'apps/website/services/gateway-protocol/api';
import { useSession } from 'next-auth/react';
import { AvatarFile } from '../../atoms/avatar-file';
import { MintCredentialMutationVariables } from 'apps/website/services/gateway-protocol/types';
import { useQueryClient } from '@tanstack/react-query';
import { LoadingButton } from '../../atoms/loading-button';

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
  const { t } = useTranslation('credit-score');
  const { me, gqlAuthMethods, onUpdateMe } = useAuth();
  const router = useRouter();
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const queryClient = useQueryClient();
  const { data: credScore, error } = useQuery(
    ['cred-score-single', me?.wallet],
    async () => {
      const result = await gqlAuthMethods.get_cred_score({
        address: me?.wallet,
      });
      return result.get_cred_score;
    }
  );
  const isUser = !!me;
  const isCreditScore = !!credScore?.account;
  console.log(me);
  const checkIssued = me?.protocol?.issuedCredentials?.find(
    (something) =>
      something?.dataModel?.id === '937f9fc8-f3a7-4d28-88bc-826af1237c2c' // TODO: make env var; change on prod
  );
  const handleNavBack = () => {
    if (window.history.state.idx === 0) {
      router.replace(ROUTES.CREDIT_SCORE);
    } else {
      router.back();
    }
  };
  console.log(checkIssued);
  const issueCredential = async () => {
    refetch();
    setOpenLoadingModal(true);
  };

  const { data: session } = useSession();

  const {
    data: something,
    refetch,
    error: e,
    isLoading,
  } = useQuery(
    ['create-cred', me?.wallet],
    async () => {
      const result = await gqlAuthMethods.create_cred({
        gatewayId: me?.username,
        score: credScore?.value,
        bearerToken: session.token,
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
    { enabled: false }
  );

  // const use
  const { data: recipentsUsers } = useQuery(
    ['data-models-find-credit', '937f9fc8-f3a7-4d28-88bc-826af1237c2c'],
    async () => {
      const result =
        await gatewayProtocolSDK.findRecipientsByDataModelCreditScore({
          dataModelId: '937f9fc8-f3a7-4d28-88bc-826af1237c2c',
          skip: 0,
          take: 10,
        });
      console.log(result.findRecipientsByDataModel);
      return result.findRecipientsByDataModel;
    }
  );

  const { data: totalRecipents } = useQuery(
    ['data-models-total-creds', '937f9fc8-f3a7-4d28-88bc-826af1237c2c'],
    async () => {
      const s = await gatewayProtocolSDK.getDataModelStats({
        dataModelId: '937f9fc8-f3a7-4d28-88bc-826af1237c2c',
      });
      console.log(s);
      return s.getTotalofIssuersByDataModel;
    }
  );

  const { token } = useAuth();

  const {
    data: mintData,
    isLoading: isLoadingMintingCred,
    mutate,
    error: somethingError,
  } = useMutation(
    ['minting-stuff'],
    ({ credentialId }: MintCredentialMutationVariables) => {
      return gatewayProtocolAuthSDK(token).mintCredential({
        credentialId: credentialId,
      });
    },
    {
      onSuccess: async (data) => {
        console.log(data);
        await queryClient.resetQueries(['user_protocol', me?.id]);
      },
    }
  );

  console.log(mintData, somethingError);

  const size = 500;
  const fillColor = {
    gradient: ['#9A53FF', '#FE02B9', '#5DABFB', '#0075FF'],
  };
  const customText = [
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
              href={ROUTES.DAO_PROFILE.replace('[slug]', 'gateway')}
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
                  alt="Gateway"
                  src="/logo.png"
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

            {checkIssued?.dataModel?.id ? (
              <Stack flexDirection="row" gap={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() =>
                    router.push(
                      ROUTES.PROTOCOL_CREDENTIAL.replace(
                        '[id]',
                        checkIssued?.id
                      )
                    )
                  }
                  sx={{
                    mb: 2,
                  }}
                >
                  CHECK CREDENTIAL
                </Button>
                {!checkIssued?.nft?.minted && (
                  // <Button
                  //   variant="contained"
                  //   startIcon={
                  //     <TokenFilled height={20} width={20} color="action" />
                  //   }
                  //   fullWidth
                  //   onClick={() => mutate({ credentialId: checkIssued.id })}
                  //   sx={{
                  //     mb: 2,
                  //   }}
                  // >
                  //   MINT AS NFT
                  // </Button>
                  <LoadingButton
                    variant="contained"
                    startIcon={
                      <TokenFilled height={20} width={20} color="action" />
                    }
                    fullWidth
                    isLoading={isLoadingMintingCred}
                    onClick={() => mutate({ credentialId: checkIssued.id })}
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
                onClick={() => issueCredential()}
                sx={{
                  mb: 2,
                }}
              >
                ISSUE CREDENTIAL
              </Button>
            )}

            <Box
              component="img"
              src={'/creditscore.png'}
              alt={'credit score' + ' image'}
              marginBottom={(theme) => theme.spacing(4)}
              sx={{
                width: '100%',
                borderRadius: (theme) => theme.spacing(1),
              }}
            />
            <Grid container rowGap={(theme) => theme.spacing(3)}>
              {totalRecipents > 0 && (
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
                      {recipentsUsers?.length > 0 &&
                        recipentsUsers.map((holder, index) => {
                          if (index == 3) return null;
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
                                  <Avatar
                                    alt={holder.gatewayId}
                                    src={holder.gatewayId}
                                    sx={{
                                      height: (theme) => theme.spacing(4),
                                      width: (theme) => theme.spacing(4),
                                      marginRight: (theme) => theme.spacing(1),
                                    }}
                                  />
                                </Box>
                              </Tooltip>
                            </Link>
                          );
                        })}
                    </AvatarGroup>

                    {totalRecipents > 3 ? (
                      <Chip
                        label={`+ ${totalRecipents - 3}`}
                        // onClick={() => {
                        //   setIsHolderDialog(!isHolderDialog);
                        // }}
                      />
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
                    <Link passHref href={`/profile/Gateway`}>
                      <Tooltip title={'Gateway'}>
                        <Box
                          component="a"
                          sx={{
                            display: 'inline-block',
                            textDecoration: 'none',
                          }}
                        >
                          <Chip
                            variant="outlined"
                            label={'Gateway'}
                            avatar={<Avatar alt={'Gateway'} src={`logo.png`} />}
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
                thickness={20}
                progress={isUser && isCreditScore ? credScore?.value / 1000 : 0}
                // text={text}
                fillThickness={35}
                emptyColor="#FFFFFF26"
                size={size}
                fillColor={isUser ? fillColor : '#312938'}
                customText={customText}
                arcStart={140}
                arcEnd={400}
              />
              <Box position={'absolute'} top={160} left={170}>
                {isUser && isCreditScore && (
                  <>
                    <Typography align={'center'} variant="h1">
                      {credScore?.value}
                    </Typography>
                    <Typography align={'center'} variant="h6">
                      {credScore?.value_rating}
                    </Typography>
                  </>
                )}
                {!isUser && (
                  <>
                    <Typography
                      sx={{ marginTop: '60px' }}
                      align={'center'}
                      variant="body1"
                    >
                      Connect your wallet
                    </Typography>
                  </>
                )}
                {isUser && !isCreditScore && (
                  <>
                    <Typography
                      sx={{ marginTop: '-30px', marginLeft: '30px' }}
                      align={'center'}
                      variant="h1"
                    >
                      -
                    </Typography>
                    <Typography
                      sx={{ marginTop: '40px', marginLeft: '34px' }}
                      align={'center'}
                      variant="h6"
                    >
                      No Score
                    </Typography>
                    <Tooltip title={t('no-score.title')}>
                      <IconButton sx={{ marginLeft: '54px' }}>
                        <InfoOutlined />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Box>
              <Box position={'absolute'} bottom={35} left={198}>
                <Typography align={'center'} variant="body1">
                  {t('about.progress.powered-by')}
                  <MUILink
                    href="https://www.credprotocol.com/"
                    target="_blank"
                    underline="none"
                  >
                    <Typography>{t('about.progress.cred-protocol')}</Typography>
                  </MUILink>
                </Typography>
              </Box>
            </Box>
            <Button
              sx={{ marginBottom: 4 }}
              disabled={!isUser}
              variant="outlined"
              href="https://app.credprotocol.com/"
              target="_blank"
            >
              {t('about.progress.btn-title')}
            </Button>
          </Paper>

          <Stack spacing={5} mt={3}>
            <Stack spacing={1}>
              <Typography variant="h6" gutterBottom>
                {t('details.title')}
              </Typography>
              <Typography>{t('details.description')}</Typography>
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
            <Stack spacing={1}>
              <Typography variant="h6" gutterBottom>
                {t('start-using.title')}
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
                <MUILink
                  href="https://aave.com/"
                  target="_blank"
                  style={{ flexGrow: 1 }}
                >
                  <Item
                    elevation={2}
                    style={{ border: '1px solid rgba(229, 229, 229, 0.12)' }}
                  >
                    <Image src="/images/aave.png" width={66} height={20} />
                  </Item>
                </MUILink>
                <MUILink
                  href="https://uniswap.org/"
                  target="_blank"
                  style={{ flexGrow: 1 }}
                >
                  <Item
                    elevation={2}
                    style={{ border: '1px solid rgba(229, 229, 229, 0.12)' }}
                  >
                    <Image src="/images/uniswap.png" width={122} height={32} />
                  </Item>
                </MUILink>
                <MUILink
                  href="https://dydx.exchange/"
                  target="_blank"
                  style={{ flexGrow: 1 }}
                >
                  <Item
                    elevation={2}
                    style={{ border: '1px solid rgba(229, 229, 229, 0.12)' }}
                  >
                    <Image src="/images/dydx.png" width={66} height={20} />
                  </Item>
                </MUILink>
                <MUILink
                  href="https://teller.org/"
                  target="_blank"
                  style={{ flexGrow: 1 }}
                >
                  <Item
                    elevation={2}
                    style={{ border: '1px solid rgba(229, 229, 229, 0.12)' }}
                  >
                    <Image src="/images/teller.png" width={76} height={26} />
                  </Item>
                </MUILink>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <LoadingModal
        openLoadingModal={openLoadingModal}
        setOpenLoadingModal={setOpenLoadingModal}
      />
    </>
  );
}
