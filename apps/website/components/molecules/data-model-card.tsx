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
import { AvatarFile } from '../atoms/avatar-file';

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
      <MUICard
        sx={{
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: '#41216D',
          ':hover': {
            backgroundColor: '#492479',
          },
        }}
      >
        <>
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
                <img
                  src={'images/image-test-issue.png'}
                  alt="Professional recommendation"
                />
              }
            />
          </Box>
          <CardContent sx={{ py: 1 }}>
            {
              <Link passHref href={url}>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{ cursor: 'pointer' }}
                >
                  Professional recommendation
                </Typography>
              </Link>
            }
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
              }}
            >
              To be used by issuers indicating the completion of a degree
              program at a 2 year or 4 year university,
            </Typography>
          </CardContent>
          <CategoriesList showStatus={true} categories={['Work']} />
        </>
      </MUICard>
    </Link>
  );
}
