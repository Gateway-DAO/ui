import Link from 'next/link';

import { AvatarFile } from '@/components/atoms/avatar-file';
import TierInfo from '@/components/features/loyalty/components/tier-info';
import { TierRuler } from '@/components/features/loyalty/components/tier-ruler';
import { query } from '@/constants/queries';
import { useActualTier } from '@/hooks/use-actual-tier';
import { useAuth } from '@/providers/auth';
import { Loyalty_Program } from '@/services/hasura/types';
import { useQuery } from '@tanstack/react-query';
import type { PartialDeep } from 'type-fest';

import { CardHeader, Box, Stack, Skeleton } from '@mui/material';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { CategoriesList } from '../categories-list';

type Props = PartialDeep<Loyalty_Program> & {
  href: string;
};

export function LoyaltyProgramCard({
  image,
  id,
  name,
  categories,
  dao,
  loyalty_tiers,
  href,
}: Props): JSX.Element {
  const { me, hasuraUserService, isAuthenticated } = useAuth();

  const { data: loyaltyProgress, isLoading } = useQuery(
    [
      query.loyalty_progress_by_user_id_by_loyalty,
      { user_id: me?.id, loyalty_id: id },
    ],
    () =>
      hasuraUserService.get_loyalty_progress_by_user_id_by_loyalty({
        user_id: me?.id,
        loyalty_id: id,
      }),
    {
      select: (data) => data.loyalty_progress.find((lp) => lp),
      enabled: isAuthenticated && !!id,
    }
  );

  const actualTier = useActualTier({
    tiers: loyalty_tiers,
    totalPoints: loyaltyProgress?.points,
  });

  return (
    <Link passHref href={href}>
      <MUICard sx={{ position: 'relative', cursor: 'pointer' }}>
        <CardMedia
          component="img"
          image={image}
          sx={{ aspectRatio: '1/1', p: 2, borderRadius: '50% 50% 0 0' }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '25px',
            paddingLeft: '16px',
          }}
        >
          <CardHeader
            sx={{
              pt: 2,
              pb: 1,
              '.MuiCardHeader-action': {
                position: 'absolute',
                right: 30,
              },
              px: 0,
            }}
            avatar={
              <AvatarFile
                file={dao?.logo}
                fallback={dao?.logo_url || '/logo.png'}
                sx={{ width: 32, height: 32 }}
                aria-label={`${dao?.name}'s DAO image`}
              >
                {dao?.name?.[0]}
              </AvatarFile>
            }
            title={dao?.name}
          />
        </Box>
        <CardContent sx={{ py: 1 }}>
          <Typography gutterBottom variant="h5" sx={{ cursor: 'pointer' }}>
            {name}
          </Typography>
          <Stack>
            <CategoriesList isPass categories={categories} />
          </Stack>
        </CardContent>
        {me?.id && (
          <Stack m={2}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <TierInfo
                  tier={actualTier?.tier}
                  totalPoints={loyaltyProgress?.points}
                />
                <TierRuler
                  tiers={loyalty_tiers}
                  totalPoints={loyaltyProgress?.points}
                  size="small"
                />
              </>
            )}
          </Stack>
        )}
      </MUICard>
    </Link>
  );
}
