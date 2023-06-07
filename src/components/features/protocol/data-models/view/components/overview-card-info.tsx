import useTranslation from 'next-translate/useTranslation';

import { ROUTES } from '@/constants/routes';
import { hasuraPublicService } from '@/services/hasura/api';
import { Protocol_Api_DataModel } from '@/services/hasura/types';
import { theme } from '@/theme';
import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { PartialDeep } from 'type-fest';

import { Stack, Paper, Box, Divider, useMediaQuery } from '@mui/material';

import CardCell from '../../../components/card-cell';
import CardUserCell from '../../../components/card-user-cell';

type Props = {
  dataModel: PartialDeep<Protocol_Api_DataModel>;
};

export default function OverviewCardInfo({ dataModel }: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  // MOCK
  const mockDataModel = dataModel ?? null;
  const mockedCreatedBy = {
    id: '63bc7fc62e7bd8b316b77133',
    slug: 'gateway',
  };
  // MOCK - END

  const creator = useQuery(
    ['issuer', mockDataModel?.id],
    () =>
      hasuraPublicService.dao_profile_by_slug({
        slug: 'gateway',
      }),
    {
      select: (data) => data.daos?.[0],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

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
        picture={creator?.data?.logo}
        name={mockDataModel ? mockedCreatedBy.slug : null}
        href={ROUTES.DAO_PROFILE.replace(
          '[slug]',
          mockDataModel ? mockedCreatedBy.slug : null
        )}
        hasLink={!!creator.data}
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
