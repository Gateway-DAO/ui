import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';

import { FormProvider, UseFormReturn } from 'react-hook-form';

import { Box, CircularProgress, Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../atoms/loading-button';

type CreateCredentialProps = {
  methods: UseFormReturn<any>;
  loading: boolean;
  children: ReactNode;
  onSubmit: () => void;
};
export default function CredentialCreateContainer({
  methods,
  loading,
  children,
  onSubmit,
}: CreateCredentialProps) {
  const { t } = useTranslation('protocol');

  return (
    <FormProvider {...methods}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          position: 'absolute',
          top: { xs: '28px', md: '48px' },
        }}
      >
        {t('data-model.issue-credential-title')}
      </Typography>
      <Stack component="form" id="create-credential-form" onSubmit={onSubmit}>
        {loading && (
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
        )}
        <Stack sx={{ display: loading ? 'none' : 'flex' }}>{children}</Stack>
        <LoadingButton
          variant="contained"
          isLoading={loading}
          type="submit"
          sx={() => ({
            height: '42px',
            display: 'flex',
            borderRadius: '20px',
            mt: 3,
          })}
          id="issuanceflow-button-issue"
        >
          {t('data-model.actions.issue-credential')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
