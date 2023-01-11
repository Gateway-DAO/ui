import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { theme, TOKENS } from '@gateway/theme';

import { Chip, Stack, Typography, Button, useMediaQuery } from '@mui/material';

import { DataModel } from '../../../../../services/gateway-protocol/types';
import InfoTitle from '../../components/info-title';

type Props = {
  dataModel: PartialDeep<DataModel>;
};

export default function DataModelView({ dataModel }: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Stack sx={{ px: TOKENS.CONTAINER_PX }}>
      <InfoTitle
        title={dataModel?.title}
        labelId={t('data-model.data-model-id')}
        id={dataModel?._id}
        copySucessMessage={t('data-model.copy-id')}
        badgeTooltip={t('data-model.verified-description')}
      />
      {dataModel?.tags?.length > 0 && (
        <Stack direction="row" gap={1} sx={{ mb: 3, mt: 2 }}>
          {dataModel.tags.map((tag, index) => (
            <Chip
              label={tag}
              key={index}
              size={isMobile ? 'small' : 'medium'}
            />
          ))}
        </Stack>
      )}
      <Typography sx={{ mb: 3 }}>{dataModel?.description}</Typography>
      <Button variant="contained" disabled={true} sx={{ maxWidth: '230px' }}>
        {t('data-model.issue-credential-button')}
      </Button>
    </Stack>
  );
}
