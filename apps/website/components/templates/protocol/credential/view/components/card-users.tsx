import useTranslation from 'next-translate/useTranslation';

import { Stack, Box } from '@mui/material';

import { MockEntity } from '../credential-view';
import CardUserCell from './card-user-cell';

type Props = {
  issuer: MockEntity;
  recipient: MockEntity;
};

export default function CardUsers({ issuer, recipient }: Props) {
  const { t } = useTranslation('protocol');

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <CardUserCell user={issuer} label={t('credential.issuer-id')} />
      <Box sx={{ p: 2 }}>&#62;</Box>
      <CardUserCell
        user={recipient}
        label={t('credential.recipient-id')}
        alignRight={true}
      />
    </Stack>
  );
}
