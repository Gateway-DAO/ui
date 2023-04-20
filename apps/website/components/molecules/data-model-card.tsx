import Link from 'next/link';

import { PartialDeep } from 'type-fest';

import {
  Avatar,
  CardContent,
  CardHeader,
  Typography,
  Box,
} from '@mui/material';
import MUICard from '@mui/material/Card';

import { ROUTES } from '../../constants/routes';
import { Protocol_Data_Model } from '../../services/hasura/types';
import { AvatarFile } from '../atoms/avatar-file';
import { CategoriesList } from './categories-list';

export function DataModelCard({
  id,
  title,
  description,
  tags,
  version,
  createdBy,
}: PartialDeep<Protocol_Data_Model>): JSX.Element {
  const url = ROUTES.PROTOCOL_DATAMODEL.replace('[id]', id);
  return (
    <Link passHref href={url}>
      <MUICard
        sx={{
          position: 'relative',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <CardHeader
          title={createdBy.gatewayUser?.name || createdBy?.gatewayId}
          titleTypographyProps={{ fontSize: '14px', fontWeight: 400 }}
          avatar={
            <AvatarFile
              file={createdBy.gatewayUser?.picture}
              fallback={'/images/avatar.png'}
              sx={{ width: 32, height: 32 }}
            />
          }
        />
        <CardContent
          sx={{
            py: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <Box flexGrow={1}>
            <Typography gutterBottom variant="h5" sx={{ cursor: 'pointer' }}>
              {title}
            </Typography>
            <Typography
              height={40}
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>
          </Box>

          <Box mt={2}>
            {tags && tags.length > 0 && (
              <CategoriesList categories={tags as unknown as string[]} />
            )}
          </Box>
        </CardContent>
      </MUICard>
    </Link>
  );
}
