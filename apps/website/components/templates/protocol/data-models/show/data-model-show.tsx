import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Typography, Button } from '@mui/material';

import { ROUTES } from '../../../../../constants/routes';
import { DataModel } from '../../../../../services/gateway-protocol/types';
import InfoTitle from '../../components/info-title';
import Tags from '../../components/tags';
import CredentialProtocolCreate from '../../credentials/create/credential-create';
import DataModelTabs from './components/data-model-tabs';

type Props = {
  dataModel: PartialDeep<DataModel>;
  isCredentialCreate?: boolean;
};

export default function DataModelShow({
  dataModel,
  isCredentialCreate = false,
}: Props) {
  const { t } = useTranslation('protocol');
  const router = useRouter();

  return (
    <>
      <Stack sx={{ px: { xs: 0, md: 4, lg: 6 } }}>
        <InfoTitle
          title={dataModel?.title}
          labelId={t('data-model.data-model-id')}
          id={dataModel?._id}
          copySucessMessage={t('data-model.copy-id')}
          badgeTooltip={t('data-model.verified-description')}
        />
        <Tags tags={dataModel?.tags} />
        <Typography sx={{ mb: 3 }}>{dataModel?.description}</Typography>
        <Button
          variant="contained"
          sx={{ width: '180px' }}
          onClick={() => {
            router.push({
              pathname: ROUTES.PROTOCOL_DATAMODEL_CREDENTIAL_CREATE,
              query: { id: router?.query?.id },
            });
          }}
        >
          {t('data-model.issue-credential-button')}
        </Button>
      </Stack>
      <DataModelTabs dataModel={dataModel} />
      {isCredentialCreate && <CredentialProtocolCreate dataModel={dataModel} />}
    </>
  );
}
