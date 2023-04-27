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
import { PermissionType } from 'apps/website/services/gateway-protocol/types';

export function DataModelCard({
  id,
  title,
  description,
  tags,
  version,
  createdBy,
  permissioning,
}: PartialDeep<Protocol_Data_Model>): JSX.Element {
  const url = ROUTES.PROTOCOL_DATAMODEL.replace('[id]', id);
  console.log(permissioning);
  return permissioning === PermissionType.All ? (
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
  ) : (
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
                  {title}
                </Typography>
              </Link>
            }
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
              {description},
            </Typography>
          </CardContent>
          <Box mt={2}>
            {tags && tags.length > 0 && (
              <CategoriesList categories={tags as unknown as string[]} />
            )}
          </Box>
        </>
      </MUICard>
    </Link>
  );
}
