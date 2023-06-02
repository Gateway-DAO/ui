import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import { Button, Divider, IconButton, Stack, TextField } from '@mui/material';

import { ClaimFieldProps } from './ClaimTypes';

export default function ClaimFormArray({
  label,
  fieldName,
  subType,
}: ClaimFieldProps) {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
    control,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `claim.${fieldName}`,
    control,
  });
  const { t } = useTranslation('protocol');

  const [addFieldIsVisible, setAddFieldIsVisible] = useState<boolean>(false);

  const checkIfIsEmpty = () => {
    if (
      getValues()?.claim &&
      getValues()?.claim[fieldName] &&
      getValues()?.claim[fieldName][fields.length - 1] !== ''
    ) {
      setAddFieldIsVisible(true);
    } else {
      setAddFieldIsVisible(false);
    }
  };

  useEffect(() => {
    append('');
  }, []);

  return (
    <>
      {fields.map((field, index: number) => (
        <Stack
          direction="row"
          alignItems="center"
          key={field.id}
          sx={{ mb: 2 }}
        >
          <TextField
            autoFocus={addFieldIsVisible}
            type={subType}
            inputProps={
              subType == 'number'
                ? {
                    step: '0.01',
                  }
                : {}
            }
            InputProps={{
              disableUnderline: true,
              sx: {
                '&.Mui-focused': {
                  borderBottom: '2px solid #9A53FF',
                },
                width: '100%',
              },
            }}
            label={label}
            sx={{ width: '100%' }}
            id={`data-model-field-${fieldName}-${index}`}
            onKeyUp={(e) => checkIfIsEmpty()}
            {...register(`claim.${fieldName}.${index}`, {
              valueAsNumber: subType === 'number',
              required: true,
              minLength: 2,
            })}
            error={
              !!errors?.claim &&
              !!errors?.claim[fieldName] &&
              !!errors?.claim[fieldName][index]
            }
            helperText={
              !!errors?.claim &&
              !!errors?.claim[fieldName] &&
              errors?.claim[fieldName][index]?.message?.toString()
            }
          />
          {fields.length > 1 && (
            <IconButton
              sx={{
                ml: { xs: 0.5, md: 1 },
                cursor: 'pointer',
              }}
              onClick={() => {
                remove(index);
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
      ))}

      {addFieldIsVisible && (
        <>
          <Divider sx={{ mx: -3, mt: 1, mb: 3 }} />
          <Button
            variant="text"
            onClick={async () => {
              const isValid = await trigger(
                `claim.${fieldName}.${fields.length - 1}`
              );
              if (isValid) {
                return append(' ');
              }
            }}
          >
            {t('data-model.issue-credential.add-field')}
          </Button>
        </>
      )}
    </>
  );
}
