import useTranslation from 'next-translate/useTranslation';

import { AvatarBackgroundFields } from '@/components/molecules/form/avatar-background-fields';
import { SocialLinks } from '@/components/molecules/form/social-links';
import { useFormContext } from 'react-hook-form';

import { Stack, Typography } from '@mui/material';

import { EditUserSchema } from '../schema';
import { Form } from './aboutComponents/form';

export function About() {
  const { control } = useFormContext<EditUserSchema>();
  const { t } = useTranslation('settings');

  return (
    <Stack direction="column" sx={{ width: '100%' }}>
      <Stack sx={{ width: '100%', mb: 4 }}>
        <Typography sx={{ fontSize: '16px', mb: 3 }}>
          {t('profile.avatar-and-cover')}
        </Typography>
        <AvatarBackgroundFields<EditUserSchema>
          control={control}
          avatar_name="picture"
          bg_name="cover"
        />
      </Stack>

      <Form />

      <Stack sx={{ width: '100%', mb: 4 }}>
        <Typography sx={{ fontSize: '16px' }}>
          {t('profile.social-links')}
        </Typography>
        <Stack sx={{ width: '100%' }}>
          <SocialLinks
            control={control}
            name="socials"
            linkFieldType={{ discord: 'text' }}
            linkFieldLabel={{
              discord: t('profile.social-links-labels.discord'),
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
