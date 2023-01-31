import useTranslation from 'next-translate/useTranslation';

import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Typography, Button } from '@mui/material';

import { useAuth } from '../../../../../providers/auth';
import {
  DataModel,
  GetDataModelStatsQuery,
} from '../../../../../services/gateway-protocol/types';
import ModalRight from '../../../../molecules/modal-right';
import InfoTitle from '../../components/info-title';
import Tags from '../../components/tags';
import CredentialProtocolCreate from '../../credentials/create/credential-create';
import DataModelTabs from './components/data-model-tabs';

type Props = {
  dataModel: PartialDeep<DataModel>;
  stats?: GetDataModelStatsQuery;
  isCredentialCreate?: boolean;
};

export default function DataModelShow({
  dataModel,
  stats,
  isCredentialCreate = false,
}: Props) {
  const { t } = useTranslation('protocol');
  const { me } = useAuth();
  const [openCreateCredential, setOpenCreateCredential] =
    useToggle(isCredentialCreate);

  return (
    <>
      <Stack sx={{ px: { xs: 0, md: 4, lg: 6 } }}>
        <InfoTitle
          title={dataModel?.title}
          labelId={t('data-model.data-model-id')}
          id={dataModel?.id}
          copySucessMessage={t('data-model.copy-id')}
          badgeTooltip={t('data-model.verified-description')}
        />
        <Tags tags={dataModel?.tags} />
        <Typography sx={{ mb: 3 }}>{dataModel?.description}</Typography>
        {me?.id && (
          <Button
            variant="contained"
            sx={{ width: '180px' }}
            onClick={() => {
              setOpenCreateCredential();
            }}
          >
            {t('data-model.issue-credential-button')}
          </Button>
        )}
      </Stack>
      <DataModelTabs dataModel={dataModel} stats={stats} />

      {me?.id && (
        <ModalRight
          open={openCreateCredential}
          handleClose={setOpenCreateCredential}
        >
          <CredentialProtocolCreate dataModel={dataModel} />
        </ModalRight>
      )}
    </>
  );
}
