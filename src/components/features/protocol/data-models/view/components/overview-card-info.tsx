import useTranslation from 'next-translate/useTranslation';

import { ROUTES } from '@/constants/routes';
import { Protocol_Data_Model } from '@/services/hasura/types';
import { theme } from '@/theme';
import { DateTime } from 'luxon';
import { PartialDeep } from 'type-fest';

import { Stack, Paper, Box, Divider, useMediaQuery } from '@mui/material';

import CardCell from '../../../components/card-cell';
import CardUserCell from '../../../components/card-user-cell';

type Props = {
  dataModel: PartialDeep<Protocol_Data_Model>;
};

export default function OverviewCardInfo({ dataModel }: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const getCreatedBy = () => {
    const { organization, createdBy } = dataModel;

    return {
      gatewayID: organization
        ? organization.gatewayId
        : createdBy?.gatewayId
        ? createdBy.gatewayId
        : 'N/A',
      link: organization
        ? ROUTES.DAO_PROFILE.replace('[slug]', organization.gatewayId)
        : createdBy
        ? ROUTES.PROFILE.replace('[username]', createdBy.gatewayId)
        : undefined,
      image: organization
        ? organization.hasuraOrganization
          ? organization.hasuraOrganization?.logo
          : ({ url: organization?.image } as Partial<File>)
        : createdBy
        ? createdBy?.gatewayUser?.picture
        : ({ url: `/images/avatar.png` } as Partial<File>),
    };
  };

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
        picture={getCreatedBy().image}
        name={getCreatedBy().gatewayID}
        href={getCreatedBy().link}
        hasLink={!!getCreatedBy().link}
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
        <CardCell label={t('data-model.price-for-consumption')}>
          {`US ${(dataModel?.consumptionPrice ?? 0).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
          })}`}
        </CardCell>
      </Stack>
    </Paper>
  );
}
