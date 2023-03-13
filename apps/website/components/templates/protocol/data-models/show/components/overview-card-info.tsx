import useTranslation from 'next-translate/useTranslation';

import { DateTime } from 'luxon';
import { PartialDeep } from 'type-fest';

import { theme } from '@gateway/theme';

import { Stack, Paper, Box, Divider, useMediaQuery } from '@mui/material';

import { ROUTES } from '../../../../../../constants/routes';
import { Protocol_Data_Model } from '../../../../../../services/hasura/types';
import CardCell from '../../../components/card-cell';
import CardUserCell from '../../../components/card-user-cell';

type Props = {
  dataModel: PartialDeep<Protocol_Data_Model>;
};

export default function OverviewCardInfo({ dataModel }: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Paper
      elevation={2}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        mb: 1,
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <CardUserCell
        label={t('data-model.created-by')}
        picture={dataModel?.createdBy?.gatewayUser?.picture}
        name={dataModel?.createdBy?.gatewayId}
        href={ROUTES.PROFILE.replace(
          '[username]',
          dataModel?.createdBy?.gatewayId
        )}
        hasLink={!!dataModel?.createdBy?.gatewayId}
        unique={true}
      />
      <Stack
        alignItems="stretch"
        justifyContent="space-around"
        sx={{
          flexDirection: isMobile ? 'column' : 'row',
        }}
        divider={
          <Box>
            <Divider orientation={isMobile ? 'horizontal' : 'vertical'} />
          </Box>
        }
      >
        <CardCell label={t('data-model.creation-date')}>
          {DateTime.fromISO(dataModel?.createdAt).toLocaleString(
            DateTime.DATE_FULL
          )}
        </CardCell>
        <CardCell label={t('data-model.last-update')}>
          {DateTime.fromISO(dataModel?.createdAt).toLocaleString(
            DateTime.DATE_FULL
          )}
        </CardCell>
      </Stack>
    </Paper>
  );
}
