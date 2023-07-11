import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useToggle } from 'react-use';

import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

type Props = {
  textKey: string;
  checkText: string;
  buttonText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDelete({
  textKey,
  checkText,
  buttonText,
  onConfirm,
  onCancel,
}: Props) {
  const { t } = useTranslation('common');
  const [inputText, setInputText] = useState('');
  const [checkedDelete, toggleChecked] = useToggle(false);

  return (
    <Stack pt={6} component="form" onSubmit={onConfirm}>
      <Typography fontWeight={600} sx={{ mb: 3 }}>
        {`${t('modal-confirm-delete.text-confirm1')} “${textKey}” ${t(
          'modal-confirm-delete.text-confirm2'
        )}`}
      </Typography>
      <TextField
        type="text"
        value={inputText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputText(event.target.value);
        }}
        id="confirm-delete"
        sx={{ mb: 3 }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={checkText}
        checked={checkedDelete}
        onChange={toggleChecked}
      />
      <Stack py={6} direction="row" gap={1} justifyContent="space-between">
        <Button variant="outlined" fullWidth size="large" onClick={onCancel}>
          {t('actions.cancel')}
        </Button>
        <Button
          disabled={inputText !== textKey || !checkedDelete}
          variant="contained"
          color="error"
          fullWidth
          size="large"
          type="submit"
        >
          {buttonText}
        </Button>
      </Stack>
    </Stack>
  );
}
