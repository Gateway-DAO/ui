import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import { brandColors } from '@gateway/theme';

import {
  alpha,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { useAuth } from '../../../../../../providers/auth';
import { gatewayProtocolSDK } from '../../../../../../services/gateway-protocol/api';
import { CreateCredentialInput } from '../../../../../../services/gateway-protocol/types';
import { AvatarFile } from '../../../../../atoms/avatar-file';

export default function IssueByForm() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateCredentialInput>();

  const { t } = useTranslation('protocol');
  const { me } = useAuth();

  const issuer = useQuery(
    ['issuer', me?.wallet],
    () =>
      gatewayProtocolSDK.userByWallet({
        wallet: me?.wallet,
      }),
    {
      select: (data) => data?.userByWallet,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (issuer?.data) {
      setValue('issuerUserId', issuer?.data?.id);
    }
  }, [issuer, setValue]);

  // MOCK USERS
  const users = [
    {
      picture: me?.picture,
      label: me?.username,
      value: issuer?.data?.id,
    },
  ];

  return (
    <Stack>
      <Typography fontWeight={600}>
        {t('data-model.issue-credential.group-issue-by-title')}
      </Typography>
      <Typography
        fontSize={14}
        sx={{ color: alpha(brandColors.white.main, 0.7), mb: 3 }}
      >
        {t('data-model.issue-credential.group-issue-by-description')}
      </Typography>
      <Stack gap={3}>
        {issuer.isLoading ? (
          <Box
            key="loading"
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CircularProgress sx={{ mb: 2 }} />
          </Box>
        ) : (
          <FormControl>
            <InputLabel>{t('data-model.issue-credential.issue-by')}</InputLabel>
            <Select
              id="chains"
              sx={{ maxWidth: { md: '50%', xs: '100%' } }}
              {...register('issuerUserId')}
              label={t('data-model.issue-credential.issue-by')}
              defaultValue={
                issuer?.data?.id || {
                  label: t('data-model.issue-credential.issue-by'),
                  value: 0,
                }
              }
            >
              {users.map((user) => (
                <MenuItem key={user.value} value={user.value}>
                  <Stack direction="row" alignItems="center">
                    <AvatarFile
                      file={user.picture}
                      fallback="/avatar.png"
                      sx={{ mr: 2, width: 24, height: 24 }}
                    >
                      {user.label}
                    </AvatarFile>
                    <Typography variant="body2">{user.label}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>
    </Stack>
  );
}
