import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AvatarFile } from '@/components/atoms/avatar-file';
import { errorMessages } from '@/constants/error-messages';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import {
  Protocol_Api_DataModel,
  Protocol_Api_PermissionType,
  Protocol_Api_CreateCredentialInput,
} from '@/services/hasura/types';
import { brandColors } from '@/theme';
import { useSnackbar } from 'notistack';
import { useFormContext } from 'react-hook-form';
import { PartialDeep } from 'type-fest/source/partial-deep';

import {
  alpha,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

type Props = {
  dataModel: PartialDeep<Protocol_Api_DataModel>;
};

export default function IssueByForm({ dataModel }: Props) {
  const { register, setValue, watch } =
    useFormContext<Protocol_Api_CreateCredentialInput>();

  const { t } = useTranslation('protocol');
  const { me } = useAuth();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setValue('issuerOrganizationId', null);
  }, []);

  const disableUserToIssueCredential = () => {
    return (
      dataModel.permissioning === Protocol_Api_PermissionType.Organizations ||
      (dataModel.permissioning === Protocol_Api_PermissionType.SpecificIds &&
        !dataModel?.allowedUsers?.find((user) => user.id === me?.protocol?.id))
    );
  };

  const disableOrganizationToIssueCredential = (access) => {
    return (
      dataModel.permissioning === Protocol_Api_PermissionType.SpecificIds &&
      !dataModel?.allowedOrganizations?.find(
        (org) => org.id === access.organization.id
      )
    );
  };

  const users = [
    {
      picture: me?.picture,
      label: me?.username,
      value: me?.protocol?.id,
      disabled: disableUserToIssueCredential(),
    },
    ...me.protocol.accesses.map((access) => ({
      picture: null,
      label: access.organization.name,
      value: access.organization.id,
      disabled: disableOrganizationToIssueCredential(access),
    })),
  ];

  const setDefaultValue = () => {
    return users
      .filter((user) => !user.disabled)
      .map((user) => user.value)?.[0];
  };

  useEffect(() => {
    if (!setDefaultValue()) {
      enqueueSnackbar(errorMessages.NOT_ALLOWED_TO_CREATE_CREDENTIAL);
      router.push({
        pathname: ROUTES.PROTOCOL_DATAMODEL,
        query: {
          id: dataModel.id,
        },
      });
    } else {
      setValue('issuerOrganizationId', setDefaultValue());
    }
  }, []);

  console.log(watch());

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
