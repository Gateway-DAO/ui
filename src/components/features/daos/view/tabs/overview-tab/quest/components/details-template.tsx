import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { Dispatch, useEffect, useMemo, useState } from 'react';
import {
  Protocol_Api_CreateCredentialInput,
  Protocol_Api_PermissionType,
  Protocol_Create_CredentialMutationVariables,
  Protocol_Data_ModelsQuery,
  Protocol_Data_ModelQuery,
} from '@/services/hasura/types';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { claimFields } from '@/components/features/protocol/credentials/create/components/ClaimTypes';
import {
  createCredentialSchemaP2P,
  createCredentialSchema,
} from '@/components/features/protocol/credentials/create/schema';
import { useAuth } from '@/providers/auth';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { zodResolver } from '@hookform/resolvers/zod';
import { fullFormats } from 'ajv-formats/dist/formats';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import ClaimForm from '@/components/features/protocol/credentials/create/components/claim-form';

import GeneralForm from './general-form';
import { createGateSchema } from '@/components/features/gates/create/schema';
import { CreateGateSchema } from '../../direct-credential/create-direct-credential';
import ClaimFormQuest from './ClaimFormQuest';

export default function DetailsTemplate({
  updateFormState,
  handleStep,
  input,
  fullFormState,
}: {
  updateFormState: Dispatch<any>;
  handleStep: (value: boolean) => void;
  input: any;
  fullFormState: any;
}) {
  const dataModel = fullFormState?.template;

  const { hasuraUserService, token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('protocol');

  const {
    getValues: getDefaultValues,
    setValue,
    watch: watchDefaultValues,
    formState: testFormState,
  } = useFormContext<CreateGateSchema>();

  const gate = getDefaultValues();
  const watchValues = watchDefaultValues();
  console.log(watchValues);
  const methods = useForm<CreateGateSchema>({
    resolver: async (values, _, options) => {
      const { claim, ...rawData } = values;
      let zodResult;

      zodResult = await zodResolver(createGateSchema)(
        { ...rawData, type: 'direct' },
        _,
        options as any
      );
      const claimResult = await ajvResolver(gate?.schema, {
        formats: fullFormats,
      })(claim, _, options as any);

      return {
        values: {
          ...zodResult.values,
          claim: claimResult.values,
        },
        errors: {
          ...zodResult.errors,
          ...(Object.keys(claimResult.errors).length > 0 && {
            claim: claimResult.errors,
          }),
        },
      };
    },
    mode: 'all',
    defaultValues: {
      image: '/images/qr-code.png',
      title: watchValues?.title,
      categories: watchValues?.categories,
      data_model_id: watchValues?.data_model_id,
      description: watchValues?.description,
      schema: watchValues?.schema,
      type: watchValues?.type,
      creator: { id: '111', username: watchValues?.creator.username },
      claim: watchValues?.claim,
    },
  });

  const { formState, getValues, watch } = methods;
  const { isValid, errors, isDirty, touchedFields, dirtyFields } = formState;
  console.log(errors);
  console.log(getValues('title'), getValues('description'), getValues('claim'));
  useEffect(() => {
    console.log('executing');
    handleStep(isValid);
    if (isValid) {
      console.log('here');
      setValue('title', getValues('title'));
      setValue('description', getValues('description'));
      setValue('image', getValues('image'));
      setValue('categories', getValues('categories'));
      setValue('claim', getValues('claim'));
      setValue('type', 'direct');
    }
  }, [
    isValid,
    getValues('title'),
    getValues('description'),
    getValues('claim'),
    getValues('categories'),
    getValues('image'),
  ]);

  const uploadArweave = useMutation(['uploadArweave'], (base64: string) =>
    hasuraUserService.upload_arweave({ base64 })
  );

  const removeEmptyDataFromArrayField = (type: string, fieldData) => {
    if (
      type === claimFields.array &&
      fieldData.length > 0 &&
      fieldData[0] === ''
    ) {
      fieldData = [];
    }
    return fieldData;
  };

  const uploadClaimImages = async (contentMediaType: string, fieldData) => {
    if (
      contentMediaType &&
      fieldData &&
      fieldData?.indexOf('https://') === -1
    ) {
      try {
        return await uploadArweave
          .mutateAsync(fieldData)
          .then((res) => res.upload_arweave?.url);
      } catch (e) {
        enqueueSnackbar(t('data-model.error-on-upload'));
      }
    }
    return fieldData;
  };

  const handleClaimFields = async (data): Promise<any> => {
    const claimProps = dataModel?.schema?.properties;
    if (!Object.keys(claimProps)) return data;
    for (const item of Object.keys(claimProps)) {
      data.claim[item] = removeEmptyDataFromArrayField(
        claimProps[item]?.type,
        data.claim[item]
      );
      await uploadClaimImages(
        claimProps[item]?.contentMediaType,
        data.claim[item]
      ).then((res) => (data.claim[item] = res));
    }
    return data;
  };

  return (
    <Stack direction={'column'} mx={7} mb={5}>
      <Box>
        <Typography variant="h5">Add details</Typography>
        <Typography variant="body2">
          Add the details of the credential
        </Typography>
      </Box>

      <FormProvider {...methods}>
        <Stack
          component="form"
          id="create-credential-form"
          // onSubmit={methods.handleSubmit(handleMutation)}
        >
          <Stack>
            <Stack
              divider={
                <Divider sx={{ mb: 4, mt: 8, mx: { xs: -3, md: -8 } }} />
              }
              gap={3}
            >
              <GeneralForm />
              <Stack sx={{ mt: -4 }}>
                <Stack direction="row" sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ mr: 1 }}>
                    Claim
                  </Typography>
                  <Tooltip title="A claim refers to a statement or assertion made by the issuer of the credential regarding the recipient's qualifications, achievements, or attributes. It serves as the basis for the credential being issued.">
                    <InfoOutlinedIcon color={'inherit'} />
                  </Tooltip>
                </Stack>
                <ClaimFormQuest fields={methods.watch('schema')?.properties} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
