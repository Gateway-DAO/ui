import Link from 'next/link';

import type { PartialDeep } from 'type-fest';

import { Avatar, Button, CardActionArea, CardHeader } from '@mui/material';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

import { Daos } from '../../services/graphql/types.generated';

/* TODO: Arias and Labels */

export function DaoCard({
  id,
  background_url,
  logo_url,
  name,
  categories,
  description,
}: PartialDeep<Daos>) {
  return (
    <MUICard>
      <Link passHref href={`/dao/${id}`}>
        <CardActionArea component="a">
          <CardMedia
            component="img"
            image={background_url}
            alt={`${name} cover`}
            height={128}
          />
        </CardActionArea>
      </Link>
      <Box sx={{ position: 'relative', ml: 2 }}>
        <Link passHref href={`/dao/${id}`}>
          <Button
            component="a"
            sx={{
              position: 'absolute',
              transform: 'translateY(-50%)',
              p: 0.5,
              m: 0,
              ml: -0.5,
              minWidth: 'unset',
            }}
          >
            <Avatar
              src={logo_url}
              sx={{
                width: 40,
                height: 40,
                border: '2px solid',
                borderColor: (theme) => theme.palette.divider,
              }}
              aria-label="recipe"
            >
              {name?.[0]}
            </Avatar>
          </Button>
        </Link>
      </Box>
      <CardHeader
        sx={{ pt: 4, pb: 1, '.MuiCardHeader-action': { alignSelf: 'unset' } }}
        action={
          <Button variant="outlined" size="small" color="secondary">
            Follow
          </Button>
        }
        title={name}
        titleTypographyProps={{ variant: 'h6' }}
        subheader="September 14, 2016"
        subheaderTypographyProps={{ variant: 'body2' }}
      />
      <CardContent sx={{ py: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {/* TODO: add line clamp */}
          {description}
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={1} px={2} pt={1} pb={2}>
        {categories.map((category) => (
          <Chip key={category} label={category} size="small" />
        ))}
      </Stack>
    </MUICard>
  );
}
