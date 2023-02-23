import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { brandColors } from '@gateway/theme';

import {
  alpha,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { useAuth } from '../../../../../../providers/auth';
import { CreateCredentialInput } from '../../../../../../services/gateway-protocol/types';
import { AvatarFile } from '../../../../../atoms/avatar-file';

export default function IssueByForm() {
  const { register, setValue } = useFormContext<CreateCredentialInput>();

  const { t } = useTranslation('protocol');
  const { me } = useAuth();

  useEffect(() => {
    setValue('issuerOrganizationId', null);
  }, []);

  const users = [
    {
      picture: me?.picture,
      label: me?.username,
      value: me?.id,
    },
    ...me.protocol.accesses.map((access) => ({
      picture: null,
      label: access.organization.name,
      value: access.organization.id,
    })),
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
        <FormControl>
          <InputLabel>{t('data-model.issue-credential.issue-by')}</InputLabel>
          <Select
            id="chains"
            sx={{ maxWidth: { md: '50%', xs: '100%' } }}
            {...register('issuerOrganizationId', {
              value: null,
              onChange: (e) =>
                setValue(
                  'issuerOrganizationId',
                  e.target.value !== me?.id ? e.target.value : null
                ),
            })}
            label={t('data-model.issue-credential.issue-by')}
            defaultValue={me?.id}
          >
            {users.map((user) => (
              <MenuItem key={user.value} value={user.value}>
                <Stack direction="row" alignItems="center">
                  <AvatarFile
                    file={user?.picture}
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
      </Stack>
    </Stack>
  );
}
