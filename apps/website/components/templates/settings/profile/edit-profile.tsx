import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import {
  Stack,
  Typography,
  Divider,
  SxProps,
  Theme,
} from '@mui/material';

import { useAuth } from '../../../../providers/auth';
import { LoadingButton } from '../../../atoms/loading-button';
import { About } from './components/about';
import { Languages } from './components/languages';
import { Skills } from './components/skills';
import { TimeZone } from './components/timeZone';
import { schema, defaultValues, EditUserSchema } from './schema';
import useTranslation from 'next-translate/useTranslation';
import { Accordion } from '../../../molecules/accordion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Props = {
  onSubmit: (data: EditUserSchema) => Promise<unknown>;
  isLoading: boolean;
};

export function EditProfileSettings({ onSubmit, isLoading }: Props) {
  const { me } = useAuth();
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues(me),
    mode: 'onBlur',
  });
  const { t } = useTranslation('settings');
  const dividerStyle: SxProps<Theme> = {
    width: {
      xs: 'calc(100% + 20px)',
      md: 'calc(100% + 120px)',
    },
    my: 2,
    mx: {
      xs: '-10px',
      md: '-60px',
    }
  }

  const [anchorName, setAnchorName] = useState(null);

  useEffect(() => {
    if (router?.asPath) {
      const asPathAnchorSplit = router.asPath.split('#');
      setAnchorName(asPathAnchorSplit?.length > 1 ? asPathAnchorSplit[1] : null);
    }
  }, []);

  return (
    <Stack
      component="form"
      sx={{ width: '100%' }}
      onSubmit={methods.handleSubmit(onSubmit, (error) => {
        console.log('Error', error);
      })}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%', mb: 7 }}
      >
        <Stack sx={{ width: '100%', flexGrow: 1, mr: 1 }}>
          <Typography variant="h6" sx={{ mb: '4px' }}>{t('nav.public-profile-title')}</Typography>
          <Typography variant="body2" fontSize="12px">{t('profile.description')}</Typography>
        </Stack>
        <LoadingButton
          sx={{ minWidth: '100px' }}
          variant="contained"
          type="submit"
          isLoading={isLoading}
        >
          {t('profile.submit')}
        </LoadingButton>
      </Stack>

      <FormProvider {...methods}>
        <Accordion
          id="about"
          title={t('profile.about')}
          expanded={!anchorName || anchorName == 'about'}
          children={<About />}
        />
        <Divider light sx={dividerStyle} />
        <Accordion
          id="skills"
          title={t('profile.skills')}
          expanded={anchorName == 'skills'}
          children={<Skills />}
        />
        <Divider light sx={dividerStyle} />
        <Accordion
          id="languages"
          title={t('profile.languages')}
          expanded={anchorName == 'languages'}
          children={<Languages />}
        />
        <Divider light sx={dividerStyle} />
        <Accordion
          id="timezones"
          title={t('profile.time-zone')}
          expanded={anchorName == 'timezones'}
          children={<TimeZone />}
        />
      </FormProvider>
    </Stack>
  );
}
