import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { addRecipientDirectCredentialSchema } from '../../schema';
import CategoriesInput from '@/components/molecules/form/categories-input';
import { AddRecipientDirectCredentialSchema } from './direct-wallets';

export function AddRecipient({
  open,
  toggleDialog,
  title,
  handleAddRecipientMutation,
}: {
  open: boolean;
  toggleDialog: (value: boolean) => void;
  title: string;
  handleAddRecipientMutation: () => void;
}) {
  const router = useRouter();
  const closeDialog = () => {
    toggleDialog(false);
  };

  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useFormContext<AddRecipientDirectCredentialSchema>();

  const TYPE_OF_WALLETS = ['Wallet', 'Email'];

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="confirm-dialog"
      maxWidth="xs"
    >
      <DialogTitle
        id="confirm-dialog"
        sx={{ minWidth: { xs: '200px', md: '400px' } }}
      >
        {!getValues('addNew') ? 'Add' : 'Edit'}recipient
      </DialogTitle>
      <DialogContent>
        <Stack>
          <TextField
            label="Value"
            id="value"
            {...register('wallet')}
            error={!!errors.wallet}
            helperText={errors.wallet?.message}
            sx={{
              '& div fieldset legend span': {
                marginRight: '4px',
              },
            }}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={watch('type')}
            label={'Type'}
            sx={{
              '& fieldset legend span': {
                marginRight: '22px',
              },
            }}
            onChange={(e) => setValue('type', e.target.value)}
          >
            {TYPE_OF_WALLETS.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant="outlined"
          onClick={closeDialog}
          color="primary"
          sx={{
            flexGrow: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            closeDialog();
            handleAddRecipientMutation();
          }}
          color="primary"
          sx={{
            flexGrow: 1,
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
