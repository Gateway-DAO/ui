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
import { schemaStringToJson } from '../../../../../utils/map-object';
import DataModelForm from './components/data-model-form';
import GeneralInfoForm from './components/general-info-form';

type CreateCredentialProps = {
  dataModel: PartialDeep<DataModel>;
  oldData?: CreateCredentialInput;
};
export default function CredentialCreateForm({
  dataModel,
  oldData,
}: CreateCredentialProps) {
  const methods = useForm({
    resolver: async (values, _, options) => {
      const { claim, ...rawData } = values;
      const zodResult = await zodResolver(CreateCredentialInputSchema())(
        rawData,
        _,
        options as any
      );
      const claimResult = await ajvResolver(
        schemaStringToJson(dataModel?.schema)
      )(claim, _, options as any);

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
      dataModel: dataModel.id,
      issuer: '63c5b71b697d875a7600064e', //TODO: Issuer
      recipient: '63c5c6a0697d875a76000654', //TODO: Recipient
      ...oldData,
      claim: {},
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
          <>
            <GeneralInfoForm />
            <Divider sx={{ mb: 4, mt: 2, mx: { xs: -3, md: -6 } }} />
            <DataModelForm dataModel={dataModel} />
          </>
        )}
        <LoadingButton
          variant="contained"
          isLoading={createCredential.isLoading}
          type="submit"
          sx={() => ({
            height: '42px',
            display: 'flex',
            borderRadius: '20px',
            mt: 4,
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
