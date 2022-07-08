import useTranslation from 'next-translate/useTranslation';

import { SocialLinks } from 'apps/website/components/molecules/form/social-links';
import { useFormContext } from 'react-hook-form';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { NewDAOSchema } from '../schema';
import { AvatarBackgroundFields } from './avatar-background-fields';

const categories = [{ label: 'Teste A' }, { label: 'Lorem B' }];

/* FIXME: Select label background on focus */
export function AboutForm() {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<NewDAOSchema>();

  const { t } = useTranslation("dao-new");

  const descriptionRemaining = 200 - (watch('description')?.length ?? 0);

  return (
    <Stack direction="column" gap={12}>
      <Stack direction="column" gap={2}>
        <Typography variant="subtitle1" color="secondary.main">{t("about.avatar-cover")}</Typography>
        <AvatarBackgroundFields />
      </Stack>
      <Stack direction="column" gap={2}>
        <Typography variant="subtitle1" color="secondary.main">{t("about.details")}</Typography>
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
            inputProps={{ maxLength: 200 }}
          />
          <Typography sx={{ pl: 2, pb: 1 }} variant="caption">
            {descriptionRemaining}/200
          </Typography>
        </Stack>
        <Autocomplete
          multiple
          filterSelectedOptions
          options={categories}
          {...register('categories')}
          renderInput={(params) => (
            <TextField {...params} label={t('common:fields.category')} />
          )}
        />
      </Stack>
      <Stack direction="column" gap={2}>
        <Typography variant="subtitle1" color="secondary.main">{t("about.social-links")}</Typography>
        <SocialLinks control={control} name="socials" />
      </Stack>
    </Stack>
  );
}
