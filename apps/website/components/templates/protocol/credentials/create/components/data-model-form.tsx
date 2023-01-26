import { useMemo } from 'react';

import { useFormContext } from 'react-hook-form';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { alpha, Typography, Stack, TextField } from '@mui/material';

import { DataModel } from '../../../../../../services/gateway-protocol/types';
import DataModelField from './data-model-field';

export const mapDataModelFields = {
  string: 'text',
  integer: 'number',
};

export type DataModelFieldProps = {
  type: string;
  label: string;
  fieldName: string;
};

type Props = {
  dataModel: PartialDeep<DataModel>;
};

// TODO: Change to useForm
export default function DataModelForm({ dataModel }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const schemaFields = useMemo(() => {
    return dataModel?.schema?.properties;
  }, [dataModel]);

  const fieldProps = (
    schemaFields,
    item: string,
    index: number
  ): DataModelFieldProps => {
    return {
      fieldName: Object.keys(schemaFields)[index],
      type: mapDataModelFields[schemaFields[item]?.type],
      label: schemaFields[item]?.title,
    };
  };

  return (
    <Stack>
      <Typography fontWeight={600}>Set claims</Typography>
      <Typography
        fontSize={14}
        sx={{ color: alpha(brandColors.white.main, 0.7), mb: 3 }}
      >
        Set the claims that will define your credential
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
              <DataModelField key={index} type={type} label={label}>
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
              </DataModelField>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
