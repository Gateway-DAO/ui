import Link from 'next/link';
import { useMemo } from 'react';

import type { PartialDeep } from 'type-fest';

import { CardActionArea, CardHeader, lighten } from '@mui/material';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

import { ROUTES } from '../../constants/routes';
import { useFile } from '../../hooks/use-file';
import { Daos } from '../../services/graphql/types.generated';
import { AvatarFile } from '../atoms/avatar-file';
import { FollowButtonDAO } from '../atoms/follow-button-dao';

/* TODO: Arias and Labels */

export function DaoCard({
  id,
  background,
  background_url,
  logo_url,
  name,
  categories,
  description,
  logo,
}: PartialDeep<Daos>) {
  const url = useMemo(() => ROUTES.DAO_PROFILE.replace('[id]', id), [id]);

  const cover = useFile(background);
  return (
    <MUICard sx={{ position: 'relative' }}>
      <Link passHref href={url}>
        <CardActionArea component="a" sx={{ height: '100%' }}>
          <CardMedia
            component="img"
            image={cover?.url ?? background_url}
            alt={`${name} cover`}
            height={128}
            sx={{ ...cover?.background }}
          />
          <Box sx={{ position: 'relative', ml: 2 }}>
            <Box
              sx={{
                position: 'absolute',
                transform: 'translateY(-50%)',
                p: 0.5,
                m: 0,
                ml: -0.5,
                minWidth: 'unset',
              }}
            >
              <AvatarFile
                file={logo}
                fallback={logo_url}
                sx={{
                  width: 40,
                  height: 40,
                  border: '2px solid',
                  borderColor: (theme) =>
                    lighten(theme.palette.background.default, 0.05),
                }}
              >
                {name?.[0]}
              </AvatarFile>
            </Box>
          </Box>
          <CardHeader
            sx={{
              pt: 4,
              pb: 1,
              '.MuiCardHeader-action': { alignSelf: 'unset' },
            }}
            title={name}
            titleTypographyProps={{ variant: 'h6' }}
            subheader="September 14, 2016"
            subheaderTypographyProps={{ variant: 'body2' }}
          />
          <CardContent sx={{ py: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {/* TODO: add line clamp */}
              {description}
            </Typography>
          </CardContent>
          <Stack direction="row" spacing={1} px={2} pt={1} pb={2}>
            {categories.map((category) => (
              <Chip key={category} label={category} size="small" />
            ))}
          </Stack>
        </CardActionArea>
      </Link>

      <FollowButtonDAO
        daoId={id}
        variant="outlined"
        size="small"
        color="secondary"
        sx={{
          zIndex: 1,
          position: 'absolute',
          top: (theme) => theme.spacing(21.5),
          right: (theme) => theme.spacing(2),
        }}
      />
    </MUICard>
  );
}
