import Link from 'next/link';

import type { PartialDeep } from 'type-fest';

import { CardHeader, Box } from '@mui/material';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { Loyalty_Program } from '../../../services/hasura/types';
import { AvatarFile } from '../../atoms/avatar-file';
import { CategoriesList } from '../categories-list';

type Props = PartialDeep<Loyalty_Program> & {
  href: string;
};

export function LoyaltyProgramCard({
  image,
  name,
  categories,
  dao,
  href,
}: Props): JSX.Element {
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
        </CardContent>
        <CategoriesList isGate categories={categories} />
      </MUICard>
    </Link>
  );
}
