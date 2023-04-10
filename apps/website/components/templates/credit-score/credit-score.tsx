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
  const { me, gqlAuthMethods } = useAuth();

  const router = useRouter();

  const handleNavBack = () => {
    // If user directly lands to credential page using link
    if (window.history.state.idx === 0) {
      router.replace(ROUTES.CREDIT_SCORE);
    } else {
      router.back();
    }
  };

  const progress = 0.78;
  const text = '789';
  const size = 500;
  const fillColor = {
    gradient: [
      '#0075FF',
      '#9A53FF',
      '#FE02B9',
      '#5DABFB',
      '#0075FF',
      '#9A53FF',
    ],
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

            {/* {completedGate &&
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
              ))} */}

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
              {/* {gateProps?.holder_count > 0 && (
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
                              <Box
                                component="a"
                                sx={{ display: 'inline-block' }}
                              >
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
              )} */}
              {/* gateProps?.creator */}
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
                  {/* <Grid item xs={8}>
                    <Link
                      passHref
                      href={`/profile/${gateProps?.creator.username}`}
                    >
                      <Tooltip title={gateProps?.creator.name}>
                        <Box
                          component="a"
                          sx={{
                            display: 'inline-block',
                            textDecoration: 'none',
                          }}
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
                  </Grid> */}
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
                progress={progress}
                // text={text}
                fillThickness={35}
                emptyColor="#FFFFFF26"
                size={size}
                fillColor={fillColor}
                customText={customText}
                arcStart={140}
                arcEnd={400}
              />
              <Box position={'absolute'} top={160} left={170}>
                <Typography align={'center'} variant="h1">
                  789
                </Typography>
                <Typography align={'center'} variant="h6">
                  Excellent
                </Typography>
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
              disabled={me?.wallet ? false : true}
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
    </>
  );
}
