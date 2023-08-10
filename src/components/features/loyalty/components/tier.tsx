import useTranslation from 'next-translate/useTranslation';

import { useActualTier } from '@/hooks/use-actual-tier';
import { useAuth } from '@/providers/auth';
import { Loyalty_Program, Loyalty_Progress } from '@/services/hasura/types';
import { TOKENS, brandColors } from '@/theme';
import { PartialDeep } from 'type-fest/source/partial-deep';

import ModalContent from '@/components/molecules/modal/modal-basic';

import {
  Avatar,
  Box,
  Button,
  Chip,
  Icon,
  IconButton,
  Stack,
  Typography,
  alpha,
} from '@mui/material';
import MUICard from '@mui/material/Card';

import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { TierRuler } from './tier-ruler';
import { useToggle } from 'react-use';
import ShareOn from '@/components/atoms/share-on';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  loyaltyProgress: PartialDeep<Loyalty_Progress>;
};

export function Tier({ loyalty, loyaltyProgress }: Props) {
  const { t } = useTranslation('loyalty-program');
  const { me } = useAuth();

  const [shareLoyaltyIsOpen, setShareLoyaltyIsOpen] = useToggle(false);

  const actualTier = useActualTier({
    tiers: loyalty.loyalty_tiers,
    totalPoints: loyaltyProgress?.points,
  });

  const getBgColour = (tier: string) => {
    if (tier === 'Baby' || tier === 'Bronze') return '#DDA490';
    else if (tier === 'Silver' || tier === 'Platinum') return '#D2D2D2';
    else if (tier === 'Gold') return '#FFAA29';
    else if (tier.includes('Diamond')) return '#363636';
    return '#DDA490';
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
            {loyaltyProgress?.points ?? 0}
          </Typography>
          <Typography sx={{ color: alpha(brandColors.white.main, 0.7) }}>
            pts
          </Typography>
        </Stack>
        {me?.id && loyaltyProgress?.points && actualTier?.tier && (
          <MUICard
            sx={{
              backgroundColor: getBgColour(actualTier?.tier),
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
        totalPoints={loyaltyProgress?.points}
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
