import Link from 'next/link';
import { useMemo } from 'react';

import type { PartialDeep } from 'type-fest';

import { CardActionArea, CardHeader } from '@mui/material';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { ROUTES } from '../../constants/routes';
import { Gates } from '../../services/graphql/types.generated';
import { badgeProps } from '../../utils/badge-props';
import { AvatarFile } from '../atoms/avatar-file';
import { CategoriesList } from './ categories-list';

/* TODO: Arias and Labels */

export function GatesCard({
  title,
  image,
  description,
  categories,
  dao,
  id,
}: PartialDeep<Gates>) {
  const hasDao = !!dao;
  const url = useMemo(() => ROUTES.GATE_PROFILE.replace('[id]', id), [id]);
  return (
    <MUICard sx={{ position: 'relative' }}>
      <Link passHref href={url}>
        <CardActionArea component="a">
          <CardMedia
            component="img"
            {...badgeProps({ image, title })}
            sx={{ aspectRatio: '1/1' }}
          />

          <CardHeader
            sx={{
              pt: 2,
              pb: 1,
              '.MuiCardHeader-action': { alignSelf: 'unset' },
            }}
            avatar={
              hasDao && (
                <AvatarFile
                  file={dao?.logo}
                  fallback={dao?.logo_url}
                  sx={{ width: 32, height: 32 }}
                  aria-label={`${dao.name}'s DAO image`}
                >
                  {dao.name?.[0]}
                </AvatarFile>
              )
            }
            title={hasDao ? dao.name : title}
          />
          <CardContent sx={{ py: 1 }}>
            {hasDao && (
              <Typography gutterBottom variant="h5">
                {title}
              </Typography>
            )}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                /* TODO: make line-clamp reusable */
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>
          </CardContent>
          <CategoriesList categories={categories} />
        </CardActionArea>
      </Link>
    </MUICard>
  );
}
