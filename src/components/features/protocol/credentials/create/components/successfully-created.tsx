import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { SuccessfullyIcon } from '@/components/atoms/icons';
import { ROUTES } from '@/constants/routes';
import { hasuraPublicService } from '@/services/hasura/api';
import { brandColors } from '@/theme';
import { useQuery } from '@tanstack/react-query';

import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

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
      hasuraPublicService.protocol_credential({
        id: credentialId,
      }),
    {
      select: (data) => data?.protocol?.credential,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

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
            <SuccessfullyIcon />
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
