import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { timestampToString } from '@gateway/helpers';
import { theme } from '@gateway/theme';

import { Stack, Paper, Box, Divider, useMediaQuery } from '@mui/material';

import { ROUTES } from '../../../../../../constants/routes';
import { DataModel } from '../../../../../../services/gateway-protocol/types';
import { gqlAnonMethods } from '../../../../../../services/hasura/api';
import CardCell from '../../../components/card-cell';
import CardUserCell from '../../../credential/view/components/card-user-cell';

type Props = {
  dataModel: PartialDeep<DataModel>;
};

export default function OverviewCardInfo({ dataModel }: Props) {
  const { t, lang } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  // MOCK
  const mockDataModel: any = dataModel;
  mockDataModel.createdAt = '2023-01-09T21:03:11.566Z';
  mockDataModel.lastUpdate = '2023-01-09T21:03:11.566Z';
  mockDataModel.createdBy = {
    _id: '63bc7fc62e7bd8b316b77133',
    slug: 'gateway',
  };
  // MOCK - END

  const creator = useQuery(
    ['issuer', mockDataModel._id],
    () =>
      gqlAnonMethods.dao_profile_by_slug({
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
        mb: 3,
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <CardUserCell
        label={t('data-model.created-by')}
        picture={creator?.data?.logo}
        name={mockDataModel?.createdBy?.slug}
        href={ROUTES.DAO_PROFILE.replace(
          '[slug]',
          mockDataModel?.createdBy?.slug
        )}
        hasLink={!!creator.data}
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
          {timestampToString(
            mockDataModel?.createdAt,
            lang,
            t('credential.indeterminate')
          )}
        </CardCell>
        <CardCell label={t('data-model.last-update')}>
          {timestampToString(
            mockDataModel?.lastUpdate,
            lang,
            t('credential.indeterminate')
          )}
        </CardCell>
      </Stack>
    </Paper>
  );
}
