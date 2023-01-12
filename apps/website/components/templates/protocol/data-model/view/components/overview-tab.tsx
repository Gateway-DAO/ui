import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack } from '@mui/material';

import { DataModel } from '../../../../../../services/gateway-protocol/types';
import OverviewCardInfo from './overview-card-info';

type Props = {
  dataModel: PartialDeep<DataModel>;
};

export default function OverviewTab({ dataModel }: Props) {
  const { t } = useTranslation('protocol');

  return (
    <Stack sx={{ maxWidth: '726px', pt: 2 }}>
      <OverviewCardInfo dataModel={dataModel} />
    </Stack>
  );
}
