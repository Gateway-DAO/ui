import useTranslation from 'next-translate/useTranslation';

import ShareOn from '@/components/atoms/share-on';
import ModalContent from '@/components/molecules/modal/modal-basic';
import { useActualTier } from '@/hooks/use-actual-tier';
import { useAuth } from '@/providers/auth';
import {
  Loyalty_Program,
  Loyalty_Progress,
  Protocol_Credential,
} from '@/services/hasura/types';
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
  loyaltyProgress: PartialDeep<Loyalty_Progress>;
  protocolCredential: PartialDeep<Protocol_Credential>;
};

export function Tier({ loyalty, loyaltyProgress, protocolCredential }: Props) {
  const { t } = useTranslation('loyalty-program');
  const { me } = useAuth();

  const [shareLoyaltyIsOpen, setShareLoyaltyIsOpen] = useToggle(false);

  const actualTier = useActualTier({
    tiers: loyalty.loyalty_tiers,
    totalPoints:
      loyaltyProgress?.loyalty_program_protocol?.claim?.points ??
      loyaltyProgress?.points,
  });
  const getBgColour = (tier: string) => {
    if (tier === 'Novice')
      return {
        bgColor: LOYALTY_PASSES_BG_COLORS.basic,
        textColor: LOYALTY_PASSES_TEXT_COLORS.black,
      };
    if (tier === 'Bronze')
      return {
        bgColor: LOYALTY_PASSES_BG_COLORS.bronze,
        textColor: LOYALTY_PASSES_TEXT_COLORS.black,
      };
    if (tier === 'Silver')
      return {
        bgColor: LOYALTY_PASSES_BG_COLORS.silver,
        textColor: LOYALTY_PASSES_TEXT_COLORS.black,
      };
    if (tier === 'Gold')
      return {
        bgColor: LOYALTY_PASSES_BG_COLORS.gold,
        textColor: LOYALTY_PASSES_TEXT_COLORS.black,
      };
    if (tier === 'Platinum')
      return {
        bgColor: LOYALTY_PASSES_BG_COLORS.platinum,
        textColor: LOYALTY_PASSES_TEXT_COLORS.white,
      };
    if (tier === 'Tungsten')
      return {
        bgColor: LOYALTY_PASSES_BG_COLORS.tungsten,
        textColor: LOYALTY_PASSES_TEXT_COLORS.white,
      };
    return {
      bgColor: LOYALTY_PASSES_BG_COLORS.basic,
      textColor: LOYALTY_PASSES_TEXT_COLORS.black,
    };
  };

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
            {protocolCredential?.claim?.points ?? 0}
          </Typography>
          <Typography sx={{ color: alpha(brandColors.white.main, 0.7) }}>
            pts
          </Typography>
        </Stack>
        {me?.id && protocolCredential?.claim?.points && actualTier?.tier && (
          <MUICard
            sx={{
              backgroundColor: getBgColour(actualTier?.tier).bgColor,
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
                      <FullscreenOutlinedIcon
                        sx={{ background: getBgColour(actualTier?.tier) }}
                      />
                    </>
                  </IconButton>
                  <Typography
                    sx={{
                      fontWeight: '700',
                      fontSize: '16px',
                      color: '#120E0A',
                    }}
                  >
                    Expand
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontWeight: '700',
                    fontSize: '24px',
                    color: '#120E0A',
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
      <TierRuler
        tiers={loyalty.loyalty_tiers}
        totalPoints={protocolCredential?.claim?.points}
      />
      <ModalContent
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
        />
      </ModalContent>
    </Stack>
  );
}
