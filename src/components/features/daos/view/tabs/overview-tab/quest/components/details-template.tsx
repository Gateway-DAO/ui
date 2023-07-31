import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material';
import { Dispatch, useEffect, useMemo, useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';

import GeneralForm from './general-form';
import {
  CreateGateSchema,
  createGateSchema,
} from '@/components/features/gates/create/schema';
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
