import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, CircularProgress, Stack } from '@mui/material';

import { gatewayProtocolSDK } from '../../../../../../services/gateway-protocol/api';
import {
  CreateCredentialMutationVariables,
  CredentialStatus,
  CreateCredentialInput,
} from '../../../../../../services/gateway-protocol/types';
import { CreateCredentialInputSchema } from '../../../../../../services/gateway-protocol/validation';
import { LoadingButton } from '../../../../../atoms/loading-button';
import ConfirmDialog from '../../../../../organisms/confirm-dialog/confirm-dialog';
import GeneralInfoForm from './general-info-form';

type CreateCredentialProps = {
  oldData?: CreateCredentialInput;
};
export default function CredentialCreateForm({
  oldData,
}: CreateCredentialProps) {
  const methods = useForm({
    resolver: zodResolver(CreateCredentialInputSchema()),
    mode: 'onBlur',
    defaultValues: {
      ...oldData,
    },
  });

  const { enqueueSnackbar } = useSnackbar();
  const [confirmCreate, setConfirmCreate] = useState(false);

  const createCredential = useMutation(
    ['createCredential'],
    ({ ...data }: CreateCredentialMutationVariables) => {
      return gatewayProtocolSDK.createCredential({
        ...data,
      });
    }
  );

  const showErrorMessage = (message: string) => {
    enqueueSnackbar(message, { variant: 'error', autoHideDuration: 8000 });
  };

  const recursiveErrorMessage = (obj) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty.call(obj, prop)) {
        if (obj[prop]?.message) {
          showErrorMessage(obj[prop]?.message);
        } else if (obj[prop]?.length) {
          recursiveErrorMessage(obj[prop][0]);
        }
      }
    }
  };

  const checkFormErrors = async () => {
    const dataIsValid = await methods.trigger();
    if (!dataIsValid) {
      const errors = methods.formState.errors;
      console.log(errors);
      if (Object.values(errors)[0]) {
        recursiveErrorMessage(errors);
      }
    }
    return dataIsValid;
  };

  const onCreateCredential = async (data: CreateCredentialInput) => {
    try {
      await handleMutation(data);
    } catch (e) {
      enqueueSnackbar("An error occured, couldn't create the credential.");
    }
  };

  const handleMutation = async (data: CreateCredentialInput) => {
    const dataIsValid = await checkFormErrors();

    if (!dataIsValid) return;

    if (data.title) {
      try {
        const response = await createCredential.mutateAsync({
          dataModel: '63c5b109697d875a76000608',
          title: data.title,
          description: data.description,
          issuer: '63c5b71b697d875a7600064e',
          recipient: '63c5c6a0697d875a76000654',
          claim: {
            firstName: 'Lorem',
            lastName: 'Ipsum',
            age: 22,
          },
          evidences: [
            {
              name: 'Evidence String',
              value: 'This is an evidence',
            },
            {
              name: 'Evidence Link',
              value: 'https://twitter.com/home',
            },
            {
              name: 'Evidence Array',
              value: ['ma', 'oeeee'],
            },
            {
              name: 'Evidence boolean',
              value: true,
            },
            {
              name: 'Evidence boolean',
              value: false,
            },
          ],
          tags: ['Education'],
          image: '',
          expirationDate: undefined,
          issuanceDate: undefined,
          status: CredentialStatus.Valid,
        });
        methods.reset();
        console.log('Created', response);
      } catch (e) {
        console.log('Error', e);
      }
    }
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
        {createCredential.isLoading ? (
          <Box
            key="loading"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <GeneralInfoForm />
        )}
        <LoadingButton
          variant="contained"
          isLoading={createCredential.isLoading}
          type="submit"
          sx={() => ({
            height: '42px',
            display: 'flex',
            width: '122px',
            borderRadius: '20px',
          })}
        >
          Create
        </LoadingButton>
      </Stack>
      <ConfirmDialog
        title="Confirmation"
        open={confirmCreate}
        positiveAnswer="Create"
        negativeAnswer="Cancel"
        setOpen={setConfirmCreate}
        onConfirm={methods.handleSubmit(onCreateCredential, (errors) => {
          enqueueSnackbar(
            (Object.values(errors)[0]?.message as string) || 'Invalid data'
          );
        })}
      >
        Are you sure you want to create this credential?
      </ConfirmDialog>
    </FormProvider>
  );
}