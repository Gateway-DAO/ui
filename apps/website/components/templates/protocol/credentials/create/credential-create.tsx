import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { ajvResolver } from '@hookform/resolvers/ajv';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { PartialDeep } from 'type-fest/source/partial-deep';

import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import { LoadingButton } from '../../../../../components/atoms/loading-button';
import { useAuth } from '../../../../../providers/auth';
import { gatewayProtocolSDK } from '../../../../../services/gateway-protocol/api';
import {
  CreateCredentialMutationVariables,
  CreateCredentialInput,
} from '../../../../../services/gateway-protocol/types';
import { DataModel } from '../../../../../services/gateway-protocol/types';
import ClaimForm from './components/claim-form';
import GeneralInfoForm from './components/general-info-form';
import IssueByForm from './components/issue-by-form';
import RecipientForm from './components/recipient-form';
import SuccessfullyCreated from './components/successfully-created';
import { createCredentialSchema } from './schema';

type CreateCredentialProps = {
  dataModel: PartialDeep<DataModel>;
  oldData?: CreateCredentialInput;
};
export default function CredentialCreateForm({
  dataModel,
  oldData,
}: CreateCredentialProps) {
  const { gqlAuthMethods } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('protocol');
  const [credentialCreated, setCredentialCreated] = useState<string>(null);

  const methods = useForm({
    resolver: async (values, _, options) => {
      const { claim, ...rawData } = values;
      const zodResult = await zodResolver(createCredentialSchema)(
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

  const uploadArweave = useMutation(['uploadArweave'], (base64: string) =>
    gqlAuthMethods.upload_arweave({ base64 })
  );

  const uploadClaimImages = async (data) => {
    const claimProps = dataModel?.schema?.properties;
    if (!Object.keys(claimProps)) return data;
    for (const item of Object.keys(claimProps)) {
      if (claimProps[item]?.contentMediaType && data?.claim[item]) {
        const picture = await uploadArweave.mutateAsync(data?.claim[item]);
        data.claim[item] = picture?.upload_arweave?.url;
      }
    }
    return data;
  };

  const handleMutation = async (data: CreateCredentialInput) => {
    if (!(await methods.trigger())) return;

    try {
      await uploadClaimImages(data)
        .then(async (res) => {
          data = res;
          const response = await createCredential.mutateAsync(
            data as CreateCredentialMutationVariables
          );
          setCredentialCreated(response?.createCredential?.id);
          methods.reset();
        })
        .catch((e) => {
          enqueueSnackbar(t('data-model.error-on-upload'));
        });
    } catch (e) {
      enqueueSnackbar(t('data-model.error-on-create-credential'));
    }
  };

  return (
    <>
      {credentialCreated ? (
        <SuccessfullyCreated credentialId={credentialCreated} />
      ) : (
        <FormProvider {...methods}>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              position: 'absolute',
              top: { xs: '28px', md: '48px' },
            }}
          >
            {t('data-model.issue-credential-title')}
          </Typography>
          <Stack
            component="form"
            id="create-credential-form"
            onSubmit={methods.handleSubmit(handleMutation)}
          >
            {createCredential.isLoading || uploadArweave.isLoading ? (
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
                divider={
                  <Divider sx={{ mb: 2, mt: 2, mx: { xs: -3, md: -6 } }} />
                }
                gap={3}
              >
                <IssueByForm />
                <GeneralInfoForm />
                <ClaimForm dataModel={dataModel} />
                <RecipientForm />
              </Stack>
            )}
            <LoadingButton
              variant="contained"
              isLoading={createCredential.isLoading || uploadArweave.isLoading}
              type="submit"
              sx={() => ({
                height: '42px',
                display: 'flex',
                borderRadius: '20px',
                mt: 3,
              })}
            >
              {t('data-model.actions.issue-credential')}
            </LoadingButton>
          </Stack>
        </FormProvider>
      )}
    </>
  );
}
