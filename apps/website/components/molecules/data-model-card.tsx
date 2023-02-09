import Link from 'next/link';

import {
  Avatar,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Box,
} from '@mui/material';
import MUICard from '@mui/material/Card';

import { CategoriesList } from './categories-list';

type Props = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  version: string;
};

export function DataModelCard({
  id,
  title,
  description,
  tags,
  version,
}: Props): JSX.Element {
  return (
    <Link passHref href={`/protocol/data-models/${id}/show`}>
      <MUICard sx={{ position: 'relative', cursor: 'pointer' }}>
        <CardHeader
          title={title}
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
          <Chip label={`Version ${version}`} variant="outlined" />
          <div style={{ width: '100%', marginTop: '-4px' }}>
            {tags && tags.length > 0 && <CategoriesList categories={tags} />}
          </div>
        </Box>
      </MUICard>
    </Link>
  );
}
