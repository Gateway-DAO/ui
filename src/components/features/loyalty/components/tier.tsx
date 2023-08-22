import useTranslation from 'next-translate/useTranslation';

import ShareOn from '@/components/atoms/share-on';
import ModalContent from '@/components/molecules/modal/modal-basic';
import ModalShareCredential from '@/components/molecules/modal/modal-share-credential';
import { useActualTier } from '@/hooks/use-actual-tier';
import { useAuth } from '@/providers/auth';
import { Loyalty_Program, Protocol_Credential } from '@/services/hasura/types';
import { TOKENS, brandColors } from '@/theme';
import {
  LOYALTY_PASSES_BG_COLORS,
  LOYALTY_PASSES_TEXT_COLORS,
} from '@/utils/loyalty-pass/colors';
import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest/source/partial-deep';

import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { Box, IconButton, Stack, Typography, alpha } from '@mui/material';
import MUICard from '@mui/material/Card';

import { TierRuler } from './tier-ruler';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  loyaltyPoints: number;
  protocolCredentialId?: string;
};

export function Tier({
  loyalty,
  loyaltyPoints = 0,
  protocolCredentialId,
}: Props) {
  const { t } = useTranslation('loyalty-program');
  const { me } = useAuth();

  const [shareLoyaltyIsOpen, setShareLoyaltyIsOpen] = useToggle(false);

  const actualTier = useActualTier({
    tiers: loyalty.loyalty_tiers,
    totalPoints: loyaltyPoints,
  });
  const getBgColour = (tier: string) => {
    if (tier === 'Novice')
      return {
        backgroundColor: LOYALTY_PASSES_BG_COLORS.basic,
        color: LOYALTY_PASSES_TEXT_COLORS.black,
      };
    if (tier === 'Bronze')
      return {
        backgroundColor: LOYALTY_PASSES_BG_COLORS.bronze,
        color: LOYALTY_PASSES_TEXT_COLORS.black,
      };
    if (tier === 'Silver')
      return {
        backgroundColor: LOYALTY_PASSES_BG_COLORS.silver,
        color: LOYALTY_PASSES_TEXT_COLORS.black,
      };
    if (tier === 'Gold')
      return {
        backgroundColor: LOYALTY_PASSES_BG_COLORS.gold,
        color: LOYALTY_PASSES_TEXT_COLORS.black,
      };
    if (tier === 'Platinum')
      return {
        backgroundColor: LOYALTY_PASSES_BG_COLORS.platinum,
        color: LOYALTY_PASSES_TEXT_COLORS.white,
      };
    if (tier === 'Tungsten')
      return {
        backgroundColor: LOYALTY_PASSES_BG_COLORS.tungsten,
        color: LOYALTY_PASSES_TEXT_COLORS.white,
      };
    return {
      backgroundColor: LOYALTY_PASSES_BG_COLORS.basic,
      color: LOYALTY_PASSES_TEXT_COLORS.black,
    };
  };

  const tierStyle = getBgColour(actualTier?.tier);

  return (
    <Stack
      sx={{
        mx: TOKENS.CONTAINER_PX,
        mt: 2,
        mb: 3,
      }}
    >
      <Typography
        fontSize={12}
        sx={{
          color: alpha(brandColors.white.main, 0.7),
          textTransform: 'uppercase',
          mb: { xs: 2, md: 3 },
        }}
      >
        {t('tier.your-tier')}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: { xs: 3, md: 4 } }}
      >
        <Stack direction="row" alignItems="baseline">
          <Typography
            fontWeight={700}
            lineHeight={0.9}
            sx={{ fontSize: { xs: 60, md: 96 } }}
          >
            {loyaltyPoints}
          </Typography>
          <Typography sx={{ color: alpha(brandColors.white.main, 0.7) }}>
            pts
          </Typography>
        </Stack>
        {me?.id && loyaltyPoints && actualTier?.tier && (
          <MUICard
            sx={{
              backgroundColor: tierStyle.backgroundColor,
              cursor: 'pointer',
            }}
            onClick={setShareLoyaltyIsOpen}
          >
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              gap={'40px'}
              mb={'-14px'}
            >
              <Stack direction={'column'} justifyContent={'space-between'}>
                <Stack direction={'row'} alignItems={'center'}>
                  <IconButton>
                    <>
                      <FullscreenOutlinedIcon sx={tierStyle} />
                    </>
                  </IconButton>
                  <Typography
                    sx={{
                      fontWeight: '700',
                      fontSize: '16px',
                      color: tierStyle.color,
                    }}
                  >
                    Expand
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontWeight: '700',
                    fontSize: '24px',
                    color: tierStyle.color,
                    mb: '20px',
                    ml: '10px',
                  }}
                >
                  {actualTier?.tier}
                </Typography>
              </Stack>
              <Box
                component="img"
                src={loyalty?.image}
                alt={loyalty?.name + ' image'}
                marginBottom={(theme) => theme.spacing(4)}
                sx={{
                  width: '87px',
                  height: '87px',
                  mt: '10px',
                  mr: '10px',
                  borderRadius: '50% 50% 0 0',
                }}
              />
            </Stack>
          </MUICard>
        )}
      </Stack>
      <TierRuler tiers={loyalty.loyalty_tiers} totalPoints={loyaltyPoints} />
      <ModalShareCredential
        open={shareLoyaltyIsOpen}
        title={t('common:social.share-on')}
        handleClose={() => setShareLoyaltyIsOpen(false)}
        handleOpen={() => setShareLoyaltyIsOpen(true)}
        isLoyalty
        loyaltyPass={loyalty}
        actualTier={actualTier?.tier}
        loyaltyCredentialId={protocolCredentialId}
      />

      {/* <ModalContent
        open={shareLoyaltyIsOpen}
        title={t('common:social.share-on')}
        handleClose={() => setShareLoyaltyIsOpen(false)}
        handleOpen={() => setShareLoyaltyIsOpen(true)}
        swipeableDrawer={true}
        fullWidth
      >
        <ShareOn
          isLoyaltyPass={true}
          loyaltyPass={loyalty}
          actualTier={actualTier?.tier}
          loyaltyCredentialId={protocolCredentialId}
        />
      </ModalContent> */}
    </Stack>
  );
}
