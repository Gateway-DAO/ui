import useTranslation from 'next-translate/useTranslation';
import { useTransition } from 'react';

import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Typography, Button } from '@mui/material';

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
  const [openCreateCredential, setOpenCreateCredential] =
    useToggle(isCredentialCreate);

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
            setOpenCreateCredential();
          }}
        >
          {t('data-model.issue-credential-button')}
        </Button>
      </Stack>
      <DataModelTabs dataModel={dataModel} />
      {openCreateCredential && (
        <CredentialProtocolCreate
          dataModel={dataModel}
          onClose={() => setOpenCreateCredential()}
        />
      )}
    </>
  );
}
