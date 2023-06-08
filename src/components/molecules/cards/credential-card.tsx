import Link from 'next/link';

import { AvatarFile } from '@/components/atoms/avatar-file';
import { ROUTES } from '@/constants/routes';
import {
  Protocol_Credential,
  Protocol_Api_CredentialStatus,
} from '@/services/hasura/types';
import { brandColors } from '@/theme';
import { limitCharsCentered } from '@/utils/string';
import { PartialDeep } from 'type-fest';

import { Box, CardContent, CardHeader, Chip, Typography } from '@mui/material';
import MUICard from '@mui/material/Card';

type Props = PartialDeep<Protocol_Credential> & {
  isRecipient?: boolean;
};

//[ ] Check with @kbooz how to transform into a helper

const setColorStatus = (status: Protocol_Api_CredentialStatus): string => {
  switch (status) {
    case Protocol_Api_CredentialStatus.Valid:
      return brandColors.green.main;

    case Protocol_Api_CredentialStatus.Revoked ||
      Protocol_Api_CredentialStatus.Expired:
      return brandColors.orange.main;

    case Protocol_Api_CredentialStatus.Invalid:
      return brandColors.red.main;

    default:
      return brandColors.orange.main;
  }
};

export default function CredentialCard({
  id,
  title,
  status,
  description,
  issuerUser,
  recipientUser,
  issuerOrganization,
}: Props): JSX.Element {
  const url = ROUTES.PROTOCOL_CREDENTIAL.replace('[id]', id);

  return (
    <Link passHref href={url}>
      <MUICard sx={{ position: 'relative', cursor: 'pointer' }}>
        <CardHeader
          title={
            issuerOrganization?.hasuraOrganization?.name ||
            issuerOrganization?.gatewayId ||
            issuerUser?.gatewayUser?.name ||
            issuerUser?.gatewayId ||
            limitCharsCentered(recipientUser?.gatewayUser?.wallet, 6)
          }
          titleTypographyProps={{ fontSize: '14px', fontWeight: 400 }}
          avatar={
            <AvatarFile
              file={
                issuerOrganization
                  ? issuerOrganization.hasuraOrganization?.logo
                  : issuerUser?.gatewayUser?.picture
              }
              fallback={
                issuerOrganization?.hasuraOrganization?.logo_url ||
                '/images/avatar.png'
              }
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
          <Box sx={{ mt: 5 }}>
            <Chip
              variant="outlined"
              label={status[0].toUpperCase() + status.toLowerCase().slice(1)}
              sx={{
                color: setColorStatus(
                  status[0].toUpperCase() + status.toLowerCase().slice(1)
                ),
                borderColor: setColorStatus(
                  status[0].toUpperCase() + status.toLowerCase().slice(1)
                ),
              }}
            />
          </Box>
        </CardContent>
      </MUICard>
    </Link>
  );
}
