import { GateImageCard } from '@/components/features/gates/create/gate-image-card/gate-image-card';
import CategoriesInput from '@/components/molecules/form/categories-input';
import { CATEGORIES } from '@/constants/gate';
import { Protocol_Api_CreateCredentialInput } from '@/services/hasura/types';
import { Stack, TextField, Typography } from '@mui/material';
import { errors } from 'ethers';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function GeneralForm({ dataModel }: { dataModel: any }) {
  const {
    register,
    setValue,
    control,
    formState: { errors },
    getValues,
  } = useFormContext<Protocol_Api_CreateCredentialInput>();

  const { t } = useTranslation('protocol');
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
      gap={2}
      sx={{
        width: '100%',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Stack
        mt={2}
        sx={{
          maxWidth: { xs: '100%', md: '50%', lg: '70%' },
          width: '100%',
        }}
      >
        <Stack direction="column">
          <Stack direction="column" gap={2}>
            <TextField
              label="Title"
              id="title"
              defaultValue={dataModel?.title}
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{
                '& div fieldset legend span': {
                  marginRight: '4px',
                },
              }}
            />
            <CategoriesInput
              variant="outlined"
              label={t('data-model.issue-credential.title-label')}
              id="categories"
              name="categories"
              error={!!errors.tags}
              {...register('tags')}
              categories={CATEGORIES}
              helperText={(errors.tags as any)?.message?.toString()}
              sx={{
                width: '100%',
                '& div fieldset legend span': {
                  marginRight: '10px',
                },
                maxWidth: '400px',
              }}
              set={(tags: string[]) => {
                setValue('tags', tags);
              }}
            />
            <TextField
              multiline
              minRows={4}
              label="Description"
              id="description"
              {...register('description')}
              defaultValue={dataModel?.description}
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{
                '& div fieldset legend span': {
                  marginRight: '12px',
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      <GateImageCard
        draftImage={dataModel?.image}
        label={
          <>
            <Typography textAlign={'center'} paddingX={4}>
              Drop or{' '}
              <Typography color={'primary'} display={'inline'}>
                upload
              </Typography>{' '}
              your credential image
            </Typography>
          </>
        }
        sx={{
          width: 300,
          marginTop: '15px',
        }}
      />
    </Stack>
  );
}
