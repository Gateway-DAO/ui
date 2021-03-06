import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Box, Typography, Stack } from '@mui/material';

import { Users } from '../../../../../services/graphql/types.generated';
import { TableView } from './table-view';

interface PeopleTabProps {
  data: PartialDeep<Users>[];
}

export const PeopleTab = ({ data: people }: PeopleTabProps) => {
  const { t } = useTranslation('search');

  return (
    <Box sx={{ py: 4, width: '100%' }}>
      {people?.length ? (
        <TableView people={people ?? []} />
      ) : (
        <Stack
          sx={{
            px: TOKENS.CONTAINER_PX,
          }}
        >
          <Typography variant="body1" color="#FFFFFFB2">
            {t('not-found.text1')}
          </Typography>
          <Typography variant="body1" color="#FFFFFFB2">
            {t('not-found.text2.people')}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};
