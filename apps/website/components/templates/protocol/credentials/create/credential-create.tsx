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
import { gatewayProtocolSDK } from '../../../../../services/gateway-protocol/api';
import {
  CreateCredentialMutationVariables,
  CreateCredentialInput,
} from '../../../../../services/gateway-protocol/types';
import { DataModel } from '../../../../../services/gateway-protocol/types';
import { claimFields } from './components/ClaimTypes';
import ClaimForm from './components/claim-form';
import CredentialCreateContainer from './components/credential-create-container';
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
        const picture = await uploadArweave.mutateAsync(fieldData);
        fieldData = picture?.upload_arweave?.url;
      } catch (e) {
        enqueueSnackbar(t('data-model.error-on-upload'));
      }
    }
    return fieldData;
  };

  const handleClaimFields = async (data) => {
    const claimProps = dataModel?.schema?.properties;
    if (!Object.keys(claimProps)) return data;
    for (const item of Object.keys(claimProps)) {
      data.claim[item] = removeEmptyDataFromArrayField(
        claimProps[item]?.type,
        data.claim[item]
      );
      data.claim[item] = await uploadClaimImages(
        claimProps[item]?.contentMediaType,
        data.claim[item]
      );
    }
    return data;
  };

  const handleMutation = async (data: CreateCredentialInput) => {
    if (!(await methods.trigger())) return;

    try {
      const newData = data;
      await handleClaimFields(newData).then(async (res) => {
        await createCredential
          .mutateAsync(res as CreateCredentialMutationVariables)
          .then((suc) => {
            setCredentialCreated(suc?.createCredential?.id);
            methods.reset();
          });
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
            <IssueByForm />
            <GeneralInfoForm />
            <ClaimForm dataModel={dataModel} />
            <RecipientForm />
          </Stack>
        </CredentialCreateContainer>
      )}
    </>
  );
}
