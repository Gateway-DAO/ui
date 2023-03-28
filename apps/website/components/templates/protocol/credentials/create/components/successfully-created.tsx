import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { brandColors } from '@gateway/theme';

import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import { ROUTES } from '../../../../../../constants/routes';
import { gatewayProtocolSDK } from '../../../../../../services/gateway-protocol/api';
import CredentialCardInfo from '../../../components/credential-card-info';

type Props = {
  credentialId: string;
};

export default function SuccessfullyCreated({ credentialId }: Props) {
  const { t } = useTranslation('protocol');
  const router = useRouter();
  const credential = useQuery(
    ['credential', credentialId],
    () =>
      gatewayProtocolSDK.credential({
        id: credentialId,
      }),
    {
      select: (data) => data?.credential,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const credentialRoute = `${
    window?.location?.origin
  }${ROUTES.PROTOCOL_CREDENTIAL.replace('[id]', credentialId)}`;

  return (
    <Stack>
      {credential.isLoading ? (
        <Box
          key="loading"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress sx={{ mt: 2 }} />
        </Box>
      ) : (
        <>
          <Box sx={{ position: 'absolute', top: { xs: '24px', md: '48px' } }}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="20" fill="#6DFFB9" />
              <path
                d="M16.7951 23.8769L12.6251 19.7069L11.2051 21.1169L16.7951 26.7069L28.7951 14.7069L27.3851 13.2969L16.7951 23.8769Z"
                fill="#2D2237"
              />
            </svg>
          </Box>
          <Typography variant="h5" sx={{ mb: 3, maxWidth: 270 }}>
            {t('data-model.successfully-title')}
          </Typography>
          <Stack
            sx={{
              border: '1px solid rgba(229, 229, 229, 0.12)',
              borderRadius: 2,
              pt: 2,
              px: 2,
            }}
          >
            <Stack direction="row" alignItems="center" gap={2} sx={{ mb: 2 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 1.5,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={
                    credential?.data?.image ??
                    `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${credential?.data?.qrCode}`
                  }
                  alt={credential?.data?.title}
                  width="100%"
                />
              </Box>
              <Stack justifyContent="center">
                <Typography
                  fontSize={14}
                  sx={{ color: alpha(brandColors.white.main, 0.7) }}
                >
                  ID {credential?.data?.id}
                </Typography>
                <Typography variant="h6">{credential?.data?.title}</Typography>
              </Stack>
            </Stack>
            <CredentialCardInfo credential={credential?.data} elevation={20} />
            <Button
              variant="contained"
              onClick={() =>
                router.push({
                  pathname: ROUTES.PROTOCOL_CREDENTIAL,
                  query: {
                    id: credential?.data?.id,
                  },
                })
              }
              sx={{ mb: 3 }}
            >
              {t('data-model.actions.check-credential')}
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
}
