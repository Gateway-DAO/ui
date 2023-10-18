import { DirectWallets } from '@/components/features/gates/create/tasks/direct/direct-wallets';
import { Box, Stack, Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch } from 'react';

export default function RecipientTemplate({
  handleStep,
  input,
}: {
  handleStep: (value: boolean) => void;
  input: any;
}) {
  const { t } = useTranslation('quest');
  return (
    <Stack direction={'column'} mx={7} mb={5}>
      <Box>
        <Typography variant="h5">{t('recipient-template.title')}</Typography>
        <Typography variant="body2">
          {t('recipient-template.description')}
        </Typography>
      </Box>
      <>
        <Stack>
          <DirectWallets handleStep={handleStep} />
        </Stack>
      </>
    </Stack>
  );
}
