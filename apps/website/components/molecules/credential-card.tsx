import { PartialDeep } from 'type-fest';

import { limitCharsCentered } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import MUICard from '@mui/material/Card';

import {
  Credential,
  CredentialStatus,
} from '../../services/gateway-protocol/types';

type Props = PartialDeep<Credential> & {
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
  title,
  status,
  description,
  issuerUser,
  recipientUser,
  isRecipient,
}: Props): JSX.Element {
  return (
    <MUICard sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        src="/images/qr-code-blur.png"
        sx={{ aspectRatio: '1/1' }}
      />
      <CardHeader
        title={
          isRecipient
            ? issuerUser.gatewayId
            : limitCharsCentered(recipientUser?.primaryWallet?.address, 6)
        }
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
        <Box sx={{ mt: 5 }}>
          <Chip
            variant="outlined"
            label={status}
            sx={{
              color: setColorStatus(status),
              borderColor: setColorStatus(status),
            }}
          />
        </Box>
      </CardContent>
    </MUICard>
  );
}
