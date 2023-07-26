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
  const { t } = useTranslation('quest');

  const methods = useFormContext<CreateGateSchema>();

  return (
    <Stack direction={'column'} mx={7} mb={5}>
      <Box>
        <Typography variant="h5">{t('template.detail')}</Typography>
        <Typography variant="body2">{t('template.detail-desc')}</Typography>
      </Box>

      <>
        <Stack component="form" id="create-credential-form">
          <Stack>
            <Stack gap={1}>
              <GeneralForm />
              <Divider
                variant="fullWidth"
                sx={{ mx: { md: '-14%', xs: '-30%' }, mt: 8 }}
              />
              <Stack>
                <Stack direction="row" sx={{ my: 4 }} alignItems={'center'}>
                  <Typography variant="subtitle1" sx={{ mr: 1 }}>
                    {t('template.claim')}
                  </Typography>
                  <Tooltip title={t('template.tooltip-title')}>
                    <InfoOutlinedIcon color={'inherit'} />
                  </Tooltip>
                </Stack>
                <ClaimFormQuest
                  fields={methods?.getValues('schema')?.properties}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </>
    </Stack>
  );
}
