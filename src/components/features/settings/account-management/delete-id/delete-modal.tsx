import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Loading from '@/components/atoms/loadings/loading';
import ModalRight from '@/components/molecules/modal/modal-right';
import { ConfirmDelete } from '@/components/organisms/confirm-delete/confirm-delete';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { brandColors } from '@/theme';
import { ErrorResponse } from '@/types/graphql';
import { useSnackbar } from 'notistack';
import { useToggle } from 'react-use';
import { useMutation } from 'wagmi';

import CloseIcon from '@mui/icons-material/Close';
import {
  Stack,
  Divider,
  Typography,
  IconButton,
  Alert,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { Box, alpha } from '@mui/system';

export function DeleteModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) {
  const { t } = useTranslation('settings');
  const { me, hasuraUserService, onSignOut } = useAuth();
  const stringValidation = 'delete my gateway id';
  const [inputText, setInputText] = useState('');
  const [checkedDelete, setCheckedDelete] = useToggle(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const mutation = useMutation(
    () => {
      return hasuraUserService.delete_account({
        protocolId: me.protocolUser?.id,
        userId: me.id,
      });
    },
    {
      onSuccess: () => {
        onSignOut();
        router.push(ROUTES.EXPLORE);
      },
      onError(error: ErrorResponse) {
        console.error(error);
        enqueueSnackbar('Error to delete account', {
          variant: 'error',
        });
      },
    }
  );

  return (
    <>
      {mutation.isLoading && <Loading />}
      <ModalRight open={open} handleClose={handleClose}>
        <Stack
          direction="column"
          divider={<Divider sx={{ margin: ' 0 -3rem' }} />}
          sx={{
            section: {
              py: 4,
            },
          }}
        >
          <Stack py={6} gap={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">
                {t('account-management.delete-section.modal-title')}
              </Typography>
              <IconButton
                aria-label="close"
                sx={{ background: alpha(brandColors.white.main, 0.16) }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Alert
              severity="error"
              color="error"
              variant="filled"
              sx={{
                background: 'transparent',
                border: `1px solid ${brandColors.red.main}`,
                color: brandColors.red.main,
                fontSize: 14,
                borderRadius: '16px',
                mt: 5,
              }}
            >
              <Typography variant="body2" color="#ff99ab">
                {t('account-management.delete-section.modal-alert')}
              </Typography>
            </Alert>
            <Typography sx={{ mr: { xs: 0, sm: 25 } }}>
              {t('account-management.delete-section.modal-alert-description')}
            </Typography>
          </Stack>
          <Stack py={6} gap={2}>
            <Typography fontWeight={600}>
              {t('account-management.delete-section.modal-explain-title')}
            </Typography>
            <Stack direction="column" divider={<Divider />} gap={2}>
              <Typography mt={1}>
                {t('account-management.delete-section.modal-explain-topic-1')}
              </Typography>
              <Typography color={brandColors.red.main}>
                {t('account-management.delete-section.modal-explain-topic-2')}
                <strong>{` ${me.protocolUser?.gatewayId} `}</strong>
                {t('account-management.delete-section.modal-explain-topic-3')}
              </Typography>
              <Typography color={brandColors.red.main}>
                {t('account-management.delete-section.modal-explain-topic-4')}
              </Typography>
            </Stack>
          </Stack>
          <ConfirmDelete
            textKey={stringValidation}
            buttonText={t('account-management.delete-section.modal-delete')}
            checkText={t(
              'account-management.delete-section.modal-explain-topic-6'
            )}
            onCancel={handleClose}
            onConfirm={() => mutation.mutateAsync()}
          />
        </Stack>
      </ModalRight>
    </>
  );
}
