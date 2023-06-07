import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useAuth } from '@/providers/auth';
import {
  Protocol_Create_CredentialMutationVariables,
  Protocol_Api_DataModel,
  Protocol_Api_PermissionType,
  Protocol_Api_CreateCredentialInput,
} from '@/services/hasura/types';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { fullFormats } from 'ajv-formats/dist/formats';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Divider, Stack } from '@mui/material';

import { claimFields } from './components/ClaimTypes';
import ClaimForm from './components/claim-form';
import CredentialCreateContainer from './components/credential-create-container';
import GeneralInfoForm from './components/general-info-form';
import IssueByForm from './components/issue-by-form';
import RecipientForm from './components/recipient-form';
import SuccessfullyCreated from './components/successfully-created';
import { createCredentialSchema, createCredentialSchemaP2P } from './schema';

type CreateCredentialProps = {
  dataModel: PartialDeep<Protocol_Api_DataModel>;
  oldData?: Protocol_Api_CreateCredentialInput;
};
export default function CredentialCreateForm({
  dataModel,
  oldData,
}: CreateCredentialProps) {
  const { hasuraUserService, token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('protocol');
  const isP2PDataModel =
    dataModel.permissioning === Protocol_Api_PermissionType.All;
  const [credentialCreated, setCredentialCreated] = useState<string>(null);

  const methods = useForm({
    resolver: async (values, _, options) => {
      const { claim, ...rawData } = values;
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
          recipientUserGatewayIdOrWallet:
            rawData.recipientUserGatewayIdOrWallet,
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
    mode: 'onBlur',
    defaultValues: {
      dataModelId: dataModel.id,
      image: '/images/qr-code.png',
      ...oldData,
      claim: {},
    },
  });

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
    <>
      {credentialCreated ? (
        <SuccessfullyCreated credentialId={credentialCreated} />
      ) : (
        <CredentialCreateContainer
          methods={methods}
          loading={createCredential.isLoading || uploadArweave.isLoading}
          onSubmit={methods.handleSubmit(handleMutation)}
        >
          <Stack
            divider={<Divider sx={{ mb: 2, mt: 2, mx: { xs: -3, md: -6 } }} />}
            gap={3}
          >
            {!isP2PDataModel && <IssueByForm dataModel={dataModel} />}
            <GeneralInfoForm
              title={dataModel?.title}
              isP2PDataModel={isP2PDataModel}
              image={dataModel?.image}
            />
            <ClaimForm dataModel={dataModel} />
            <RecipientForm />
          </Stack>
        </CredentialCreateContainer>
      )}
    </>
  );
}
