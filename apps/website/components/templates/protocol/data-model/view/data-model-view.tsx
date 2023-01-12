import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { TOKENS } from '@gateway/theme';

import { Stack, Typography, Button } from '@mui/material';

import { DataModel } from '../../../../../services/gateway-protocol/types';
import InfoTitle from '../../components/info-title';
import Tags from '../../components/tags';
import DataModelTabs from './components/data-model-tabs';

type Props = {
  dataModel: PartialDeep<DataModel>;
};

export default function DataModelView({ dataModel }: Props) {
  const { t } = useTranslation('protocol');

  return (
    <>
      <Stack sx={{ px: TOKENS.CONTAINER_PX }}>
        <InfoTitle
          title={dataModel?.title}
          labelId={t('data-model.data-model-id')}
          id={dataModel?._id}
          copySucessMessage={t('data-model.copy-id')}
          badgeTooltip={t('data-model.verified-description')}
        />
        <Tags tags={dataModel?.tags} />
        <Typography sx={{ mb: 3 }}>{dataModel?.description}</Typography>
        <Button variant="contained" disabled={true} sx={{ width: '180px' }}>
          {t('data-model.issue-credential-button')}
        </Button>
      </Stack>
      <DataModelTabs />
    </>
  );
}
