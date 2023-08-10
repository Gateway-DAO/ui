import Link from 'next/link';

import { ROUTES } from '@/constants/routes';
import { Protocol_Data_Model } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

import { CardContent, Typography, Box, CardMedia } from '@mui/material';
import MUICard from '@mui/material/Card';

import { CategoriesList } from '../categories-list';

export function DataModelCard({
  id,
  title,
  description,
  tags,
  createdBy,
  permissioning,
  image,
}: PartialDeep<Protocol_Data_Model>): JSX.Element {
  const url = ROUTES.PROTOCOL_DATAMODEL.replace('[id]', id);
  return (
    <Link passHref href={url}>
      <MUICard
        sx={{
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: 'rgba(154, 83, 255, 0.08)',
          ':hover': {
            backgroundColor: 'rgba(154, 83, 255, 0.16)',
            img: {
              filter: 'none',
              mixBlendMode: 'unset',
            },
          },
          border: '1px solid rgba(154, 83, 255, 0.3);',
        }}
      >
        <CardMedia
          component="img"
          src={image ? image : '/images/default-image-data-models.png'}
          sx={{
            aspectRatio: '1/1',
            ':hover': {
              img: {
                filter: 'none',
                mixBlendMode: 'unset',
              },
            },
          }}
        />
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: '25px',
              paddingLeft: '16px',
            }}
          ></Box>
          <CardContent sx={{ py: 1, mb: 1 }}>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ cursor: 'pointer', color: '#9A53FF' }}
            >
              {title}
            </Typography>

            <Typography
              height={40}
              variant="body2"
              color="text.secondary"
              sx={{
                /* TODO: make line-clamp reusable */
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mb: 1,
              }}
            >
              {description}
            </Typography>
            <CategoriesList categories={tags as unknown as string[]} />
          </CardContent>
        </>
      </MUICard>
    </Link>
  );
}
