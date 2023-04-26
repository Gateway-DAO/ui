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
import { CategoriesList } from './categories-list';
import { AvatarFile } from '../atoms/avatar-file';

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
          backgroundColor: 'rgba(154, 83, 255, 0.08)',
          ':hover': {
            backgroundColor: 'rgba(154, 83, 255, 0.16)',
          },
          border: '1px solid rgba(154, 83, 255, 0.3);',
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
                backgroundColor: '#9A53FF',
                px: 0,
                img: {
                  filter: 'grayscale(1)',
                  mixBlendMode: 'hard-light',
                },
                ':hover': {
                  img: {
                    filter: 'none',
                    mixBlendMode: 'unset',
                  },
                },
              }}
              avatar={
                <img
                  src={
                    'https://user-images.githubusercontent.com/63333707/234028818-2faa0548-20ed-483d-93b6-6e09d1308da9.png'
                  }
                  alt="Professional recommendation"
                  height={'302px'}
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
