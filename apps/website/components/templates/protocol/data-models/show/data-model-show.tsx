import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { TOKENS } from '@gateway/theme';

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

  useEffect(() => {
    if (isCredentialCreate) {
      document.body.style.overflow = 'hidden';
    }
  }, [isCredentialCreate]);

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
      {isCredentialCreate && <CredentialProtocolCreate />}
    </>
  );
}
