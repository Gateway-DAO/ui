import useTranslation from 'next-translate/useTranslation';

import {
  Control,
  FieldValues,
  useController,
} from 'react-hook-form';

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


type SocialLinkField<TFormSchema> = {
  name: string;
  onDelete: () => void;
  control: Control<TFormSchema>;
};

const networks = ['Twitter', 'Twitch', 'Website'].map((label) => ({
  label,
  value: label.toLowerCase(),
}));


export function SocialLink<TFormSchema extends FieldValues = FieldValues>({
  name,
  control,
  onDelete,
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

  return (
    <Card sx={{ display: 'flex', flexFlow: 'column', gap: 2, p: 2 }}>
      <Stack sx={{flexFlow: "row", gap: 2, flexWrap: {
        xs: "wrap",
        md: "nowrap"
      } }}>
      <FormControl sx={{ flex: {
        xs: 1,
        md: 0.5
      }}}>
        <InputLabel id={`${name}.network`}>
          {t('common:fields.platform')}
        </InputLabel>
        <Select
          labelId={`${name}.network`}
          label="Age"
          defaultValue=""
          {...networkField.field}
          value={networkField.field.value ?? ''}
          error={!!networkField.fieldState.error}
        >
          {networks.map((network) => (
            <MenuItem key={network.value} value={network.value}>
              {network.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label={t('common:fields.link')}
        {...linkField.field}
        sx={{ flex: 1, flexBasis: {
          xs: "100%",
          md: "unset"
        }, order: {
          xs: 2,
          md: 1
        } }}
        error={!!linkField.fieldState.error}
      />
      <IconButton
        aria-label="Delete this line"
        onClick={onDelete}
        sx={{ alignSelf: 'center', order: {
          xs: 1,
          md: 2,
        } }}
      >
        <Delete />
      </IconButton>
      </Stack>
      {(!!networkField.fieldState.error) && <Typography color="error">
        {networkField.fieldState.error.message}
        </Typography>}
        {(!!linkField.fieldState.error) && <Typography color="error">
      {linkField.fieldState.error.message}
        </Typography>}

    </Card>
  );
}
