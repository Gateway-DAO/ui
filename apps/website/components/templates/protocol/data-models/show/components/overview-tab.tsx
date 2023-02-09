import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { theme } from '@gateway/theme';

import { Stack, useMediaQuery } from '@mui/material';

import {
  DataModel,
  GetDataModelStatsQuery,
} from '../../../../../../services/gateway-protocol/types';
import ExternalLink from '../../../../../atoms/external-link';
import DashboardCard from '../../../components/dashboard-card';
import OverviewCardInfo from './overview-card-info';
import TableSchema from './table-schema';

type Props = {
  dataModel: PartialDeep<DataModel>;
  stats: GetDataModelStatsQuery;
};

export default function OverviewTab({ dataModel, stats }: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Stack sx={{ maxWidth: '726px', pt: 2 }}>
      <OverviewCardInfo dataModel={dataModel} />
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <ExternalLink
          text={t('data-model.arweave-hash')}
          handleClick={() => {
            window.open(dataModel?.arweaveInfo?.url);
          }}
        />
      </Stack>
      <Stack
        gap={isMobile ? 1 : 2}
        justifyContent="space-between"
        sx={{ flexDirection: { xs: 'column', md: 'row' }, mb: 5 }}
      >
        <DashboardCard
          label={t('data-model.issuers')}
          value={stats?.getTotalofIssuersByDataModel}
        />
        <DashboardCard
          label={t('data-model.issued-credentials')}
          value={stats?.getTotalCredentialsByDataModel}
        />
        <DashboardCard
          label={t('data-model.recipients')}
          value={stats?.getTotalCredentialsByDataModelGroupByRecipient}
        />
      </Stack>
      <TableSchema
        title="Claim"
        data={dataModel?.schema?.properties}
        subtitle1="Field"
        subtitle2="Input Type"
      />
    </Stack>
  );
}
