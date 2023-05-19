import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { limitCharsCentered } from '@/utils/string';
import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { IosShare, ReadMore } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { ROUTES } from '@/constants/routes';
import { useMintData } from '@/hooks/use-mint-data';
import { useAuth } from '../../../../providers/auth';
import { Gates, Loyalty_Program } from '@/services/hasura/types';
import { isDaoAdmin } from '../../../../utils/is-dao-admin';
import { AvatarFile } from '../../../atoms/avatar-file';
import ExternalLink from '../../../atoms/external-link';
import GateStateChip from '../../../atoms/gate-state-chip';
import ShareOn from '../../../atoms/share-on';
import GateMintButton from '../../../molecules/gate-mint-button';
import { MintDialogProtocol } from '../../../molecules/mint-dialog-protocol';
import ModalContent from '../../../molecules/modal/modal-basic';
import ModalShareCredential from '../../../molecules/modal/modal-share-credential';
import { OptionsCredential } from '../../../molecules/options-credential';
import { SmallTier } from './SmallTier';

type LoyaltySidebarProps = {
  loyalty: PartialDeep<Loyalty_Program>;
  gate?: PartialDeep<Gates>;
  protocolCredential?: PartialDeep<Credential>;
};

export function LoyaltySidebar({
  gate,
  loyalty,
  protocolCredential,
}: LoyaltySidebarProps) {
  const { t } = useTranslation();
  const { me } = useAuth();
  const router = useRouter();
  const isAdmin = isDaoAdmin({ me, gate });

  const {
    isOpen,
    setIsOpen,
    shareStatus,
    shareIsOpen,
    setShareIsOpen,
    mintCredential,
    mintData,
    showMintButton,
  } = useMintData({
    credential: protocolCredential,
    loyaltyProgramId: gate?.loyalty_id,
    gateId: gate?.id,
  });

  const [shareLoyaltyIsOpen, setShareLoyaltyIsOpen] = useToggle(false);

  const texts = {
    title: gate?.title || loyalty.name,
    categories: gate?.categories || loyalty.categories,
    description: gate?.description || loyalty.description,
    image: gate?.image || loyalty.image,
  };

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
        title={t('credential:share-dialog-title')}
      />

      <Grid item>
        <Box
          sx={(theme) => ({
            padding: {
              xs: `0 ${theme.spacing(2)}`,
              md: `0 ${theme.spacing(7)}`,
            },
          })}
        >
          <Link
            passHref
            href={ROUTES.DAO_PROFILE.replace('[slug]', loyalty.dao?.slug)}
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
                alt={loyalty.dao.name}
                file={loyalty.dao.logo}
                fallback={loyalty.dao.logo_url}
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
                {loyalty.dao.name}
              </Typography>
            </Stack>
          </Link>

          <Typography variant="h4" marginBottom={(theme) => theme.spacing(2)}>
            {texts.title}
          </Typography>

          <Box marginBottom={(theme) => theme.spacing(2)}>
            <Stack
              direction={'row'}
              sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
            >
              <Box>
                {isAdmin && <GateStateChip published={gate.published} />}
                {texts?.categories.map((category, idx) => (
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
                <IconButton
                  sx={{
                    p: 0,
                  }}
                  onClick={setShareLoyaltyIsOpen}
                  key="share"
                >
                  <Avatar sx={{ height: '30px', width: '31px' }}>
                    <IosShare
                      sx={{
                        mt: -0.25,
                        height: '20px',
                      }}
                    />
                  </Avatar>
                </IconButton>
                {gate && <OptionsCredential gate={gate} />}
              </Stack>
            </Stack>
          </Box>

          {texts?.description?.length > 250 ? (
            <ReadMore>{texts?.description}</ReadMore>
          ) : (
            <Typography
              variant="body1"
              marginBottom={(theme) => theme.spacing(4)}
              sx={{ wordBreak: 'break-word' }}
              paragraph={true}
            >
              {texts?.description}
            </Typography>
          )}

          <Stack direction="row" gap={2} mb={2}>
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
              {t('loyalty-program:sidebar.display-credential')}
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
            src={texts?.image}
            alt={texts?.title + ' image'}
            marginBottom={(theme) => theme.spacing(4)}
            sx={{
              width: '100%',
              borderRadius: gate?.image
                ? (theme) => theme.spacing(1)
                : '50% 50% 0 0',
            }}
          />
          {gate && <SmallTier loyalty={loyalty} gate={gate} />}
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Box
          sx={(theme) => ({
            padding: {
              xs: `0 ${theme.spacing(2)}`,
              md: `0 ${theme.spacing(7)} ${theme.spacing(7)}`,
            },
          })}
        >
          <Grid container rowGap={(theme) => theme.spacing(3)}>
            <Stack justifyContent="space-between" direction="row" width="100%">
              <Typography
                variant="body2"
                color={(theme) => theme.palette.text.secondary}
              >
                {t('loyalty-program:sidebar.data-model-id')}
              </Typography>
              <ExternalLink
                text={limitCharsCentered(loyalty.data_model_id, 6)}
                sxProps={{ alignSelf: 'flex-end' }}
                handleClick={() => {
                  router.push({
                    pathname: ROUTES.PROTOCOL_DATAMODEL,
                    query: { id: loyalty.data_model_id },
                  });
                }}
              />
            </Stack>
          </Grid>
        </Box>
      </Grid>
      <ModalContent
        open={shareLoyaltyIsOpen}
        title={t('common:social.share-on')}
        handleClose={() => setShareLoyaltyIsOpen(false)}
        handleOpen={() => setShareLoyaltyIsOpen(true)}
        swipeableDrawer={true}
        fullWidth
      >
        <ShareOn />
      </ModalContent>
    </>
  );
}
