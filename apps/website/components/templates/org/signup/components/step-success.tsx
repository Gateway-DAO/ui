import useTranslation from 'next-translate/useTranslation';

import { Typography, Stack, Box, Button } from '@mui/material';

import { ROUTES } from '../../../../../constants/routes';
import SuccessfullyIcon from '../../../../atoms/icons/successfully-icon';
import TextWithParagraphs from '../../../../atoms/text-with-paragraphs/text-with-paragraphs';
import Stepper from '../../../../organisms/stepper/stepper';

export default function StepSuccess({ formState }: { formState: any }) {
  const { t } = useTranslation('org-signup');

  const steps = [
    {
      title: t('step-success.stepper-1'),
    },
    {
      title: t('step-success.stepper-2'),
    },
    {
      title: t('step-success.stepper-3'),
    },
  ];

  return (
    <Stack>
      <SuccessfullyIcon sx={{ mb: 4 }} />
      <Typography variant="h4" mb={7}>
        {t('step-success.title')}
      </Typography>
      <Box mb={5}>
        <Stepper steps={steps} activeStep={1} />
      </Box>
      <TextWithParagraphs text={t('step-success.text')} />
      <Box mt={8}>
        <Button
          variant="contained"
          size="large"
          href={ROUTES.DAO_PROFILE.replace('[slug]', formState?.slug)}
        >
          {t('step-success.action')}
        </Button>
      </Box>
    </Stack>
  );
}
