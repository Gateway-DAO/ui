import useTranslation from 'next-translate/useTranslation';

import { useFormContext, Controller } from 'react-hook-form';

import { Stack, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { categoriesDropdown } from '@/constants/dao';
import { SocialLinks } from '@/components/molecules/form/social-links';
import { NewDAOSchema } from '../schema';
import { AvatarBackgroundFields } from './avatar-background-fields';

type Props = {
  isEdit: boolean;
};

export function AboutForm({ isEdit }: Props) {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<NewDAOSchema>();

  const { t } = useTranslation(isEdit ? 'dao-edit' : 'dao-new');

  const descriptionRemaining = watch('description')?.length ?? 0;

  return (
    <Stack direction="column" sx={{ gap: { xs: 8, md: 12 } }}>
      <Stack direction="column" gap={2}>
        <Typography variant="subtitle1" color="secondary.main">
          {t('about.avatar-cover')}
        </Typography>
        <AvatarBackgroundFields />
      </Stack>
      <Stack direction="column" gap={2}>
        <Typography variant="subtitle1" color="secondary.main">
          {t('about.details')}
        </Typography>
        <TextField
          required
          label={t('common:fields.display-name')}
          id="name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Stack direction="column" gap={1}>
          <TextField
            required
            label={t('common:fields.description')}
            id="description"
            multiline
            minRows={4}
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
            inputProps={{ maxLength: 400 }}
            sx={{
              '& div fieldset legend span': {
                marginRight: '5px',
              },
            }}
          />
          <Typography sx={{ pl: 2, pb: 1 }} variant="caption">
            {descriptionRemaining}/400
          </Typography>
        </Stack>
        <Controller
          control={control}
          name="categories"
          render={({ field }) => (
            <Autocomplete
              {...field}
              autoComplete
              multiple
              filterSelectedOptions
              options={categoriesDropdown}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('common:fields.category')}
                  error={!!errors.categories}
                  helperText={errors.categories?.message}
                  sx={{
                    '& div fieldset legend span': {
                      marginRight: '10px',
                    },
                  }}
                />
              )}
              onChange={(_, data: typeof categoriesDropdown) => {
                field.onChange(data.map((option) => option.value));
              }}
              value={categoriesDropdown.filter((category) =>
                field.value?.includes(category.value)
              )}
            />
          )}
        />
      </Stack>
      <Stack direction="column" gap={2}>
        <Typography variant="subtitle1" color="secondary.main">
          {t('about.social-links')}
        </Typography>
        <SocialLinks control={control} name="socials" />
      </Stack>
    </Stack>
  );
}
