import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';

export function AddRecipient({
  open,
  toggleDialog,
  title,
  handleAddRecipientMutation,
  setValues,
  values,
}: {
  open: boolean;
  toggleDialog: (value: boolean) => void;
  title: string;
  handleAddRecipientMutation: () => void;
  setValues: Dispatch<
    SetStateAction<{
      addNew: boolean;
      type: string;
      wallet: string;
      oldType: string;
      oldWallet: string;
    }>
  >;
  values: {
    addNew: boolean;
    type: string;
    wallet: string;
    oldType: string;
    oldWallet: string;
  };
}) {
  const router = useRouter();
  const closeDialog = () => {
    toggleDialog(false);
  };

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
        {title} recipient
      </DialogTitle>
      <DialogContent>
        <Stack>
          <TextField
            variant="standard"
            id="submit-link-title"
            value={values.type}
            onChange={(e) =>
              setValues({
                addNew: values.addNew,
                oldType: values.oldType,
                oldWallet: values.oldWallet,
                type: e.target.value,
                wallet: values.wallet,
              })
            }
          />
          <TextField
            variant="standard"
            id="submit-link-title"
            value={values.wallet}
            onChange={(e) =>
              setValues({
                addNew: values.addNew,
                oldType: values.oldType,
                oldWallet: values.oldWallet,
                type: values.type,
                wallet: e.target.value,
              })
            }
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
