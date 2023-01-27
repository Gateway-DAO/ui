import dynamic from 'next/dynamic';
import { useState } from 'react';

import { ajvResolver } from '@hookform/resolvers/ajv';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Box, CircularProgress, Divider, Stack } from '@mui/material';

import { LoadingButton } from '../../../../../components/atoms/loading-button';
import ConfirmDialog from '../../../../../components/organisms/confirm-dialog/confirm-dialog';
import { gatewayProtocolSDK } from '../../../../../services/gateway-protocol/api';
import {
  CreateCredentialMutationVariables,
  CreateCredentialInput,
} from '../../../../../services/gateway-protocol/types';
import { DataModel } from '../../../../../services/gateway-protocol/types';
import { CreateCredentialInputSchema } from '../../../../../services/gateway-protocol/validation';
import DataModelForm from './components/data-model-form';
import RecipientForm from './components/recipient-form';

const GeneralInfoForm = dynamic(
  () => {
    return import('./components/general-info-form');
  },
  { ssr: false }
);

type CreateCredentialProps = {
  dataModel: PartialDeep<DataModel>;
  oldData?: CreateCredentialInput;
};
export default function CredentialCreateForm({
  dataModel,
  oldData,
}: CreateCredentialProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [confirmCreate, setConfirmCreate] = useState(false);

  const methods = useForm({
    resolver: async (values, _, options) => {
      const { claim, ...rawData } = values;
      const zodResult = await zodResolver(CreateCredentialInputSchema())(
        rawData,
        _,
        options as any
      );
      const claimResult = await ajvResolver(dataModel?.schema)(
        claim,
        _,
        options as any
      );

      return {
        values: {
          ...zodResult.values,
          claim: claimResult.values,
        },
        errors: {
          ...zodResult.errors,
          // only add claim errors if claimResult.errors is not empty
          ...(Object.keys(claimResult.errors).length > 0 && {
            claim: claimResult.errors,
          }),
        },
      };
    },
    mode: 'onBlur',
    defaultValues: {
      dataModelId: dataModel.id,
      ...oldData,
      claim: {},
    },
  });

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

    try {
      const response = await createCredential.mutateAsync(
        data as CreateCredentialMutationVariables
      );
      methods.reset();
      console.log('Created', response);
    } catch (e) {
      console.log('Error', e);
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
            <CircularProgress sx={{ mt: 2 }} />
          </Box>
        ) : (
          <Stack
            divider={<Divider sx={{ mb: 2, mt: 2, mx: { xs: -3, md: -6 } }} />}
            gap={3}
          >
            <GeneralInfoForm />
            <DataModelForm dataModel={dataModel} />
            <RecipientForm />
          </Stack>
        )}
        <LoadingButton
          variant="contained"
          isLoading={createCredential.isLoading}
          type="submit"
          sx={() => ({
            height: '42px',
            display: 'flex',
            borderRadius: '20px',
            mt: 3,
          })}
        >
          Issue Credential
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
