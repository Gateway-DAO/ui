import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { AlertCustom } from '@/components/atoms/alert';
import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { TitleSubtitleField } from '@/components/atoms/title-field';
import ModalRight from '@/components/molecules/modal/modal-right';
import { useAuth } from '@/providers/auth';
import { brandColors } from '@/theme';
import { useToggle } from 'react-use';

import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  alpha,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export function DeleteId() {
  const { t } = useTranslation('settings');
  const [openModal, toggleModal] = useToggle(false);
  const { me } = useAuth();
  const stringValidation = 'delete my gateway id';
  const [inputText, setInputText] = useState('');

  return (
    <Stack height={'100%'} gap={4}>
      <ModalRight open={openModal} handleClose={toggleModal}>
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
                onClick={toggleModal}
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
                {t('account-management.delete-section.modal-explain-topic-2', {
                  gatewayID: me.protocolUser?.gatewayId,
                })}{' '}
                {t('account-management.delete-section.modal-explain-topic-3')}
              </Typography>
              <Typography color={brandColors.red.main}>
                {t('account-management.delete-section.modal-explain-topic-4')}
              </Typography>
            </Stack>
          </Stack>
          <Stack py={6} gap={4}>
            <Typography fontWeight={600}>
              {t('account-management.delete-section.modal-explain-topic-5', {
                confirmDelete: stringValidation,
              })}
            </Typography>
            <TextField
              value={inputText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInputText(event.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={t(
                'account-management.delete-section.modal-explain-topic-6'
              )}
            />
            <Stack
              py={6}
              direction="row"
              gap={1}
              justifyContent="space-between"
            >
              <Button variant="outlined" fullWidth size="large">
                {t('account-management.delete-section.modal-cancel')}
              </Button>
              <Button
                disabled={inputText !== stringValidation}
                variant="contained"
                color="error"
                fullWidth
                size="large"
              >
                {t('account-management.delete-section.modal-delete')}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </ModalRight>
      <TitleSubtitleField
        title={t('account-management.delete-section.title')}
        subtitle={t('account-management.delete-section.desc')}
      />
      <span>
        <LoadingButton
          onClick={toggleModal}
          variant="contained"
          color="error"
          size="large"
        >
          {t('account-management.delete-section.btn')}
        </LoadingButton>
      </span>
    </Stack>
  );
}
