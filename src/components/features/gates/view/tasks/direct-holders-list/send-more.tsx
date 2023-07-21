import { zodResolver } from '@hookform/resolvers/zod';
import {
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
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import CategoriesInput from '@/components/molecules/form/categories-input';
import { Email, UploadFile } from '@mui/icons-material';
import { AddRecipientDirectCredentialSchema } from '../../../create/tasks/direct/direct-wallets';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/providers/auth';

export function SendMore({
  open,
  toggleDialog,
  handleAddRecipientMutation,
  handleOpenUploadMoreCsv,
  gateId,
}: {
  open: boolean;
  toggleDialog: (value: boolean) => void;
  handleAddRecipientMutation: (type: string, wallet: string) => void;
  handleOpenUploadMoreCsv: () => void;
  gateId: string;
}) {
  const router = useRouter();
  const closeDialog = () => {
    toggleDialog(false);
  };
  const { enqueueSnackbar } = useSnackbar();
  const { hasuraUserService, fetchAuth } = useAuth();

  const methods = useForm<AddRecipientDirectCredentialSchema>();
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = methods;

  const TYPE_OF_WALLETS = ['Wallet', 'Email'];

  console.log(getValues('wallet')?.length);

  return (
    <FormProvider {...methods}>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="confirm-dialog"
        maxWidth="xs"
      >
        <Stack direction={'row'} justifyContent={'space-between'}>
          <DialogTitle id="confirm-dialog">Send more</DialogTitle>
          <Button
            variant="outlined"
            sx={{ m: 1, mt: 2 }}
            onClick={handleOpenUploadMoreCsv}
            startIcon={<UploadFile />}
          >
            Upload from CSV
          </Button>
        </Stack>
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
                    icon={<Email />}
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
              handleAddRecipientMutation(
                getValues('type'),
                getValues('wallet')
              );
            }}
            disabled={
              getValues('wallet') === undefined &&
              getValues('type') === undefined
            }
            color="primary"
            sx={{
              flexGrow: 1,
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
