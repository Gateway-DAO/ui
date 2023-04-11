// import credential from 'apps/website/pages/api/og-image/credential';
import { useRouter } from 'next/router';

import { time } from 'console';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { TOKENS } from '@gateway/theme';

import { ReadMore } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { ROUTES } from '../../../../constants/routes';
import { Gates, Loyalty_Program } from '../../../../services/hasura/types';
import { AvatarFile } from '../../../atoms/avatar-file';
import GateStateChip from '../../../atoms/gate-state-chip';
import MorePopover from '../../../atoms/more-popover';
import { ShareButton } from '../../../atoms/share-button';
import { TokenFilled } from '../../../molecules/mint-card/assets/token-filled';

type LoyaltySidebarProps = {
  loyalty: PartialDeep<Loyalty_Program>;
  gate?: PartialDeep<Gates>;
};

export function LoyaltySidebar({ gate, loyalty }: LoyaltySidebarProps) {
  const router = useRouter();

  const handleNavBack = () => {
    // If user directly lands to credential page using link
    if (window.history.state.idx === 0) {
      router.replace(ROUTES.MY_PROFILE);
    } else {
      router.back();
    }
  };

  const texts = {
    title: gate?.title || loyalty.name,
  };
  return (
    <Grid item xs={12} md={5}>
      {/* DAO info */}
      <Box
        sx={(theme) => ({
          padding: {
            xs: `${theme.spacing(5)} ${theme.spacing(2)}`,
            md: `${theme.spacing(5)} ${theme.spacing(7)}`,
          },
        })}
      >
        <Link passHref href={ROUTES.DAO_PROFILE.replace('[slug]', 'gateway')}>
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
            {/* <AvatarFile
              alt={gateProps?.dao.name}
              file={gateProps?.dao.logo}
              fallback={gateProps?.dao.logo_url}
              sx={{
                height: (theme) => theme.spacing(3),
                width: (theme) => theme.spacing(3),
                marginRight: (theme) => theme.spacing(1),
              }}
            /> */}
            {/* <Typography
              variant="body2"
              color={(theme) => theme.palette.text.secondary}
            >
              {gateProps?.dao.name}
            </Typography> */}
          </Stack>
        </Link>

        {/* <Typography variant="h4" marginBottom={(theme) => theme.spacing(2)}>
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
              startIcon={<TokenFilled height={20} width={20} color="action" />}
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
              startIcon={<TokenFilled height={20} width={20} color="action" />}
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
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
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
                  {new Date(gateProps.expire_date).toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })}
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
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
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
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
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
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
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
        </Grid> */}
      </Box>
    </Grid>
  );
}
