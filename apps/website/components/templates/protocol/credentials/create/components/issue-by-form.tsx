import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';
import { PartialDeep } from 'type-fest/source/partial-deep';

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
import {
  CreateCredentialInput,
  DataModel,
} from '../../../../../../services/gateway-protocol/types';
import { AvatarFile } from '../../../../../atoms/avatar-file';

type Props = {
  dataModel: PartialDeep<DataModel>;
};

export default function IssueByForm({ dataModel }: Props) {
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
      disabled: dataModel?.allowedUsers?.indexOf(me?.id) === -1,
    },
    ...me.protocol.accesses.map((access) => ({
      picture: null,
      label: access.organization.name,
      value: access.organization.id,
      disabled:
        dataModel?.allowedOrganizations?.indexOf(access.organization.id) === -1,
    })),
  ];

  const setDefaultValue = () => {
    if (users) {
      return users
        .filter((user) => !user.disabled)
        .map((user) => user.value)?.[0];
    }
    return me?.id;
  };

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
            defaultValue={setDefaultValue()}
          >
            {users.map((user) => (
              <MenuItem
                key={user.value}
                value={user.value}
                disabled={user.disabled}
              >
                <Stack direction="row" alignItems="center">
                  <AvatarFile
                    file={user?.picture}
                    fallback="/avatar.png"
                    sx={{ mr: 2, width: 24, height: 24 }}
                  >
                    {user.label}
                  </AvatarFile>
                  <Typography
                    variant="body2"
                    sx={{
                      color: user.disabled
                        ? brandColors.grays.dark
                        : brandColors.white.main,
                    }}
                  >
                    {user.label}
                  </Typography>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}
