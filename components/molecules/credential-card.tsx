import Link from 'next/link';

import { brandColors } from 'apps/website/theme';
import { limitCharsCentered } from 'apps/website/utils/string';
import { PartialDeep } from 'type-fest';

import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from '@mui/material';
import MUICard from '@mui/material/Card';

import { ROUTES } from '../../constants/routes';
import {
  Credential,
  CredentialStatus,
} from '../../services/gateway-protocol/types';
import { Protocol_Credential } from '../../services/hasura/types';
import { AvatarFile } from '../atoms/avatar-file';

type Props = PartialDeep<Protocol_Credential> & {
  isRecipient?: boolean;
};

//[ ] Check with @kbooz how to transform into a helper

const setColorStatus = (status: CredentialStatus): string => {
  switch (status) {
    case CredentialStatus.Valid:
      return brandColors.green.main;

    case CredentialStatus.Revoked || CredentialStatus.Expired:
      return brandColors.orange.main;

    case CredentialStatus.Invalid:
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
  isRecipient,
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
