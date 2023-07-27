import {
  Avatar,
  Box,
  Button,
  Chip,
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
import { useFormContext } from 'react-hook-form';
import { AddRecipientDirectCredentialSchema } from './direct-wallets';

export function AddRecipient({
  open,
  toggleDialog,
  handleAddRecipientMutation,
}: {
  open: boolean;
  toggleDialog: (value: boolean) => void;
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
        {getValues('addNew') ? 'Add ' : 'Edit '}recipient
      </DialogTitle>
      <DialogContent>
        <Stack>
          <Select
            labelId="type-label"
            id="type-label"
            value={watch('type')}
            label={'Type'}
            sx={{
              '& fieldset legend span': {
                marginRight: '22px',
              },
              width: '50%',
              mt: 0.8,
            }}
            onChange={(e) => setValue('type', e.target.value)}
          >
            {TYPE_OF_WALLETS.map((value) => (
              <MenuItem key={value} value={value}>
                <Chip
                  variant="filled"
                  color="default"
                  label={value}
                  avatar={
                    <Avatar
                      src={
                        value === 'Email'
                          ? '/images/mail-filled.svg'
                          : '/images/ethereum.svg'
                      }
                      sx={{
                        height: 5,
                        width: 10,
                      }}
                    />
                  }
                />
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="ID"
            id="id"
            {...register('wallet')}
            error={!!errors.wallet}
            helperText={errors.wallet?.message}
            sx={{
              '& div fieldset legend span': {
                marginRight: '4px',
              },
              mt: 2,
            }}
          />
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
          disabled={
            getValues('wallet') === '' && getValues('type').length === 0
          }
          color="primary"
          sx={{
            flexGrow: 1,
          }}
        >
          {getValues('addNew') ? 'Add ' : 'Save '}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
