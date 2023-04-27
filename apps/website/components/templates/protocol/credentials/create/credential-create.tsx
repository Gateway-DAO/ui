import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { ajvResolver } from '@hookform/resolvers/ajv';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { fullFormats } from 'ajv-formats/dist/formats';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Divider, Stack } from '@mui/material';

import { useAuth } from '../../../../../providers/auth';
import { gatewayProtocolAuthSDK } from '../../../../../services/gateway-protocol/api';
import {
  CreateCredentialMutationVariables,
  CreateCredentialInput,
  PermissionType,
} from '../../../../../services/gateway-protocol/types';
import { DataModel } from '../../../../../services/gateway-protocol/types';
import { claimFields } from './components/ClaimTypes';
import ClaimForm from './components/claim-form';
import CredentialCreateContainer from './components/credential-create-container';
import GeneralInfoForm from './components/general-info-form';
import IssueByForm from './components/issue-by-form';
import RecipientForm from './components/recipient-form';
import SuccessfullyCreated from './components/successfully-created';
import { createCredentialSchema, createCredentialSchemaP2P } from './schema';
import DataModels from '../../../explore/tabs/data-models-tab/data-models';

type CreateCredentialProps = {
  dataModel: PartialDeep<DataModel>;
  oldData?: CreateCredentialInput;
};
export default function CredentialCreateForm({
  dataModel,
  oldData,
}: CreateCredentialProps) {
  const { gqlAuthMethods, token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('protocol');
  const isP2PDataModel = dataModel.permissioning === PermissionType.All;
  const [credentialCreated, setCredentialCreated] = useState<string>(null);

  const methods = useForm({
    resolver: async (values, _, options) => {
      const { claim, ...rawData } = values;
      let zodResult;
      console.log(rawData);
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
        console.log(zodResult);
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
    ({ ...data }: CreateCredentialMutationVariables) => {
      return gatewayProtocolAuthSDK(token).createCredential({
        ...data,
      });
    }
  );

  const uploadArweave = useMutation(['uploadArweave'], (base64: string) =>
    gqlAuthMethods.upload_arweave({ base64 })
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
    return data;
  };

  const handleMutation = async (data: CreateCredentialInput | any) => {
    if (!(await methods.trigger())) return;
    console.log(data);
    try {
      data = await handleFields(data);
      await createCredential
        .mutateAsync(data as CreateCredentialMutationVariables)
        .then((suc) => {
          setCredentialCreated(suc?.createCredential?.id);
          methods.reset();
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
            <GeneralInfoForm />
            <ClaimForm dataModel={dataModel} />
            <RecipientForm />
          </Stack>
        </CredentialCreateContainer>
      )}
    </>
  );
}
