import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Stack, Typography } from '@mui/material';

import ConfirmDialog from '../../../../../organisms/confirm-dialog/confirm-dialog';
import { CreateCredentialData, createCredentialSchema } from '../schema';

type CreateCredentialProps = {
  oldData?: CreateCredentialData;
};
export default function FormGeneralInformation({
  oldData,
}: CreateCredentialProps) {
  const methods = useForm({
    resolver: zodResolver(createCredentialSchema),
    mode: 'onBlur',
    defaultValues: {
      ...oldData,
    },
  });

  const { enqueueSnackbar } = useSnackbar();
  const [confirmCreate, setConfirmCreate] = useState(false);

  const showErrorMessage = (message: string) => {
    enqueueSnackbar(message, { variant: 'error', autoHideDuration: 8000 });
  };

  const checkFormErrors = async () => {
    const dataIsValid = await methods.trigger();

    if (!dataIsValid) {
      const errors = methods.formState.errors;

      if (Object.values(errors)[0].data?.message) {
        showErrorMessage(Object.values(errors)[0].data?.message);
      }
    }

    return dataIsValid;
  };

  const onCreateGate = async (data: CreateCredentialData) => {
    try {
      await handleMutation(data);
    } catch (e) {
      enqueueSnackbar("An error occured, couldn't create the credential.");
    }
  };

  const handleMutation = async (data: CreateCredentialData) => {
    const dataIsValid = await checkFormErrors();

    if (!dataIsValid) return;

    console.log('Created');
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        id="create-credential-form"
        onSubmit={async (e) => {
          e.preventDefault();

          const dataIsValid = await checkFormErrors();

          if (dataIsValid) {
            setConfirmCreate(true);
          }
        }}
      >
        <Typography sx={{ mb: 3 }}>Form</Typography>
        <Button variant="contained" onClick={() => setConfirmCreate(true)}>
          Create
        </Button>
      </Stack>
      <ConfirmDialog
        title="Confirmation"
        open={confirmCreate}
        positiveAnswer="Create"
        negativeAnswer="Cancel"
        setOpen={setConfirmCreate}
        onConfirm={methods.handleSubmit(onCreateGate, (errors) => {
          enqueueSnackbar(
            Object.values(errors)[0]?.data?.message || 'Invalid data'
          );
        })}
      >
        Are you sure you want to create this credential?
      </ConfirmDialog>
    </FormProvider>
  );
}
