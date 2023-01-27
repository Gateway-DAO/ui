import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { useFormContext } from 'react-hook-form';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { alpha, Typography, Stack, TextField } from '@mui/material';

import { DataModel } from '../../../../../../services/gateway-protocol/types';
import ClaimField from './claim-field';

export const mapClaimFields = {
  string: 'text',
  integer: 'number',
};

export type ClaimFieldProps = {
  type: string;
  label: string;
  fieldName: string;
};

type Props = {
  dataModel: PartialDeep<DataModel>;
};

export default function ClaimForm({ dataModel }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation('protocol');

  const schemaFields = useMemo(() => {
    return dataModel?.schema?.properties;
  }, [dataModel]);

  const fieldProps = (
    schemaFields,
    item: string,
    index: number
  ): ClaimFieldProps => {
    return {
      fieldName: Object.keys(schemaFields)[index],
      type: mapClaimFields[schemaFields[item]?.type],
      label: schemaFields[item]?.title,
    };
  };

  return (
    <Stack>
      <Typography fontWeight={600}>
        {t('data-model.issue-credential.group-claim-title')}
      </Typography>
      <Typography
        fontSize={14}
        sx={{ color: alpha(brandColors.white.main, 0.7), mb: 3 }}
      >
        {t('data-model.issue-credential.group-claim-description')}
      </Typography>
      {schemaFields && (
        <Stack gap={2}>
          {Object.keys(schemaFields)?.map((item: any, index) => {
            const { fieldName, type, label } = fieldProps(
              schemaFields,
              item,
              index
            );
            return (
              <ClaimField key={index} type={type} label={label}>
                <TextField
                  type={type}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      '&.Mui-focused': {
                        borderBottom: '2px solid #9A53FF',
                      },
                      width: '100%',
                    },
                  }}
                  sx={{ width: '100%' }}
                  label={label}
                  id={`data-model-field-${fieldName}`}
                  {...register(`claim.${fieldName}`, {
                    valueAsNumber: type === 'number',
                  })}
                  error={!!errors?.claim && !!errors?.claim[fieldName]}
                  helperText={
                    !!errors?.claim &&
                    errors?.claim[fieldName]?.message?.toString()
                  }
                />
              </ClaimField>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
