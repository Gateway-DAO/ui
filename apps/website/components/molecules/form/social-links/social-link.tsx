import useTranslation from 'next-translate/useTranslation';
import { useMemo, HTMLInputTypeAttribute } from 'react';

import { Control, FieldValues, useController } from 'react-hook-form';

import { Delete } from '@mui/icons-material';
import {
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { networks, networksLabels, Network } from '../../../../constants/dao';

export type SocialLinkField<TFieldValues extends FieldValues = FieldValues> = {
  name: string;
  onDelete: () => void;
  control: Control<TFieldValues>;
  linkFieldType?: Partial<Record<Network, HTMLInputTypeAttribute>>;
  linkFieldLabel?: Partial<Record<Network, string>>;
};

const networksOptions = networks.map((value, index) => ({
  label: networksLabels[index],
  value,
}));

export function SocialLink<TFormSchema extends FieldValues = FieldValues>({
  name,
  control,
  onDelete,
  linkFieldType: linkFieldTypeProp,
  linkFieldLabel: linkFieldLabelProp,
}: SocialLinkField<TFormSchema>) {
  const networkField = useController({
    name: `${name}.network` as any,
    control,
  });

  const linkField = useController({
    name: `${name}.url` as any,
    control,
  });

  const { t } = useTranslation();

  const linkFieldType: HTMLInputTypeAttribute = useMemo(() => {
    const types: Partial<Record<Network, HTMLInputTypeAttribute>> = {
      email: 'email',
      ...linkFieldTypeProp,
    };
    return types[networkField.field.value] ?? 'text';
  }, [networkField.field.value, linkFieldTypeProp]);

  const linkFieldLabel: HTMLInputTypeAttribute = useMemo(() => {
    const labels: Partial<Record<Network, string>> = {
      email: t('common:fields.email'),
      ...linkFieldLabelProp,
    };
    return labels[networkField.field.value] ?? t('common:fields.link');
  }, [t, linkFieldLabelProp, networkField.field.value]);

  return (
    <Card sx={{ display: 'flex', flexFlow: 'column', gap: 2, p: 2 }}>
      <Stack
        sx={{
          flexFlow: 'row',
          gap: 2,
          flexWrap: {
            xs: 'wrap',
            md: 'nowrap',
          },
        }}
      >
        <FormControl
          sx={{
            flex: {
              xs: 1,
              md: 0.5,
            },
          }}
        >
          <InputLabel id={`${name}.network`}>
            {t('common:fields.platform')}
          </InputLabel>
          <Select
            labelId={`${name}.network`}
            label={t('common:fields.platform')}
            defaultValue=""
            {...networkField.field}
            value={networkField.field.value ?? ''}
            error={!!networkField.fieldState.error}
            sx={{
              '& fieldset legend span': {
                marginRight: '12px',
              },
            }}
          >
            {networksOptions.map((network) => (
              <MenuItem key={network.value} value={network.value}>
                {network.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label={linkFieldLabel}
          {...linkField.field}
          type={linkFieldType}
          sx={{
            flex: 1,
            flexBasis: {
              xs: '100%',
              md: 'unset',
            },
            order: {
              xs: 2,
              md: 1,
            },
          }}
          error={!!linkField.fieldState.error}
        />
        <IconButton
          aria-label="Delete this line"
          onClick={onDelete}
          sx={{
            alignSelf: 'center',
            order: {
              xs: 1,
              md: 2,
            },
          }}
        >
          <Delete />
        </IconButton>
      </Stack>
      {!!networkField.fieldState.error && (
        <Typography color="error">
          {/* {networkField.fieldState.error.message} */}
          Please select the Platform
        </Typography>
      )}
      {!!linkField.fieldState.error && (
        <Typography color="error">
          {/* {linkField.fieldState.error.message} */}
          Please select the correct URL
        </Typography>
      )}
    </Card>
  );
}
