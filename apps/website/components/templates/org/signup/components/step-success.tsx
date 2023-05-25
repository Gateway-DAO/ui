import useTranslation from 'next-translate/useTranslation';

import { Typography, Stack, Box, Button } from '@mui/material';

import SuccessfullyIcon from '../../../../atoms/icons/successfully-icon';
import TextWithParagraphs from '../../../../atoms/text-with-paragraphs/text-with-paragraphs';
import Stepper from '../../../../organisms/stepper/stepper';

export default function StepSuccess() {
  const { t } = useTranslation('org-signup');

  return (
    <Stack>
      <SuccessfullyIcon sx={{ mb: 4 }} />
      <Typography variant="h4" mb={7}>
        {t('step-success.title')}
      </Typography>
      <Box mb={5}>
        <Stepper />
      </Box>
      <TextWithParagraphs text={t('step-success.text')} />
      <Box mt={8}>
        <Button variant="contained" size="large">
          {t('step-success.action')}
        </Button>
      </Box>
    </Stack>
  );
}
