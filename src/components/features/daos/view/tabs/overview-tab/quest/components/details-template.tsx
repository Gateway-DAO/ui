import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { Dispatch, useEffect, useState } from 'react';
import {
  Protocol_Api_CreateCredentialInput,
  Protocol_Api_PermissionType,
  Protocol_Create_CredentialMutationVariables,
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
  const { dataModel } = fullFormState.template;
  console.log(dataModel);
  const { hasuraUserService, token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('protocol');
  const isP2PDataModel =
    dataModel.permissioning === Protocol_Api_PermissionType.All;
  const [credentialCreated, setCredentialCreated] = useState<string>(null);

  const methods = useForm({
    resolver: async (values, _, options) => {
      const { claim, ...rawData } = values;
      console.log(claim, rawData);
      let zodResult;
      if (isP2PDataModel) {
        zodResult = await zodResolver(createCredentialSchemaP2P)(
          rawData,
          _,
          options as any
        );
        zodResult.values = {
          ...zodResult.values,
          description: dataModel.description,
          tags: [],
          dataModelId: dataModel.id,
          //   recipientUserIdentity: rawData.recipientUserIdentity,
        };
      } else {
        zodResult = await zodResolver(createCredentialSchema)(
          rawData,
          _,
          options as any
        );
      }
      const claimResult = await ajvResolver(dataModel?.schema, {
        formats: fullFormats,
      })(claim, _, options as any);
      console.log({
        ...zodResult.values,
        claim: claimResult.values,
      });
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
      dataModelId: dataModel.id,
      image: '/images/qr-code.png',
      claim: {},
    },
  });

  const { formState } = methods;
  const { isValid, errors } = formState;

  useEffect(() => {
    console.log(isValid, errors);
    handleStep(isValid);
  }, [isValid]);

  const createCredential = useMutation(
    ['createCredential'],
    (data: Protocol_Create_CredentialMutationVariables) =>
      hasuraUserService.protocol_create_credential(data)
  );

  const uploadArweave = useMutation(['uploadArweave'], (base64: string) =>
    hasuraUserService.upload_arweave({ base64 })
  );

  const uploadCredentialImage = async (fieldData): Promise<string> => {
    if (
      fieldData &&
      fieldData.indexOf('https://') === -1 &&
      fieldData.indexOf('images') === -1
    ) {
      try {
        return await uploadArweave
          .mutateAsync(fieldData)
          .then((res) => res.upload_arweave?.url);
      } catch (e) {
        enqueueSnackbar(t('data-model.error-on-upload'));
      }
    }
    return;
  };

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

  const handleFields = async (data): Promise<any> => {
    await handleClaimFields(data).then((res) => (data = res));

    await uploadCredentialImage(data?.image).then((res) => (data.image = res));
    if (data?.image === undefined) {
      data = { ...data, image: dataModel?.image };
    }

    return data;
  };

  const handleMutation = async (
    data: Protocol_Api_CreateCredentialInput | any
  ) => {
    if (!(await methods.trigger())) return;
    try {
      data = await handleFields(data);
      const res = await createCredential.mutateAsync(
        data as Protocol_Create_CredentialMutationVariables
      );

      setCredentialCreated(res?.protocol?.createCredential?.id);
      methods.reset();
    } catch (e) {
      enqueueSnackbar(t('data-model.error-on-create-credential'));
    }
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
          <Stack sx={{ display: createCredential.isLoading ? 'none' : 'flex' }}>
            <Stack
              divider={
                <Divider sx={{ mb: 4, mt: 8, mx: { xs: -3, md: -8 } }} />
              }
              gap={3}
            >
              <GeneralForm dataModel={dataModel} />
              <Stack sx={{ mt: -4 }}>
                <Stack direction="row" sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ mr: 1 }}>
                    Claim
                  </Typography>
                  <Tooltip title="A claim refers to a statement or assertion made by the issuer of the credential regarding the recipient's qualifications, achievements, or attributes. It serves as the basis for the credential being issued.">
                    <InfoOutlinedIcon color={'inherit'} />
                  </Tooltip>
                </Stack>
                <ClaimForm dataModel={dataModel} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
