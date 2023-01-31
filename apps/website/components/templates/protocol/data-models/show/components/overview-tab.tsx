import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { theme } from '@gateway/theme';

import { Stack, useMediaQuery } from '@mui/material';

import { DataModel } from '../../../../../../services/gateway-protocol/types';
import ExternalLink from '../../../../../atoms/external-link';
import DashboardCard from '../../../components/dashboard-card';
import OverviewCardInfo from './overview-card-info';
import DataTable from './table-schema';

type Props = {
  dataModel: PartialDeep<DataModel>;
};

export default function OverviewTab({ dataModel }: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Stack sx={{ maxWidth: '726px', pt: 2 }}>
      <OverviewCardInfo dataModel={dataModel} />
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <ExternalLink text={t('data-model.arweave-hash')} url="" />
      </Stack>
      <Stack
        gap={isMobile ? 1 : 2}
        justifyContent="space-between"
        sx={{ flexDirection: { xs: 'column', md: 'row' }, mb: 5 }}
      >
        <DashboardCard
          label={t('data-model.issuers')}
          value={100}
          caption="from 100 (in 1 day)"
        />
        <DashboardCard
          label={t('data-model.issued-credentials')}
          value={1345459}
          caption="from 954,504 (in 1 day)"
          indicator={0.04}
        />
        <DashboardCard
          label={t('data-model.recipients')}
          value={200124}
          caption="from 200,000 (in 1 day)"
          indicator={-0.001}
        />
      </Stack>
      <DataTable
        title="Claim"
        data={dataModel?.schema?.properties}
        subtitle1="Field"
        subtitle2="Input Type"
      />
    </Stack>
  );
}
