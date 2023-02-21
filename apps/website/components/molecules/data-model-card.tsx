import Link from 'next/link';

import { PartialDeep } from 'type-fest';

import {
  Avatar,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Box,
} from '@mui/material';
import MUICard from '@mui/material/Card';

import { ROUTES } from '../../constants/routes'; //[ ] use right path
import { DataModel } from '../../services/gateway-protocol/types';
import { CategoriesList } from './categories-list';

export function DataModelCard({
  id,
  title,
  description,
  tags,
  version,
  createdBy,
}: PartialDeep<DataModel>): JSX.Element {
  const url = ROUTES.PROTOCOL_DATAMODEL.replace('[id]', id);
  return (
    <Link passHref href={url}>
      <MUICard sx={{ position: 'relative', cursor: 'pointer' }}>
        <CardHeader
          title={createdBy?.gatewayId}
          titleTypographyProps={{ fontSize: '14px', fontWeight: 400 }}
          avatar={
            <Avatar
              src="/images/avatar-default.png"
              sx={{ width: 32, height: 32 }}
            />
          }
        />
        <CardContent sx={{ py: 1 }}>
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
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            py: 1,
            px: 2,
            mt: 1,
          }}
        >
          <div style={{ width: '100%', marginTop: '-4px' }}>
            {tags && tags.length > 0 && <CategoriesList categories={tags} />}
          </div>
        </Box>
      </MUICard>
    </Link>
  );
}
