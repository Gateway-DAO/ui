import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import CloseIcon from '@mui/icons-material/Close';
import { Stack, Typography, IconButton, alpha } from '@mui/material';

import ConfirmDialog from '../../../../../components/organisms/confirm-dialog/confirm-dialog';
import { useAuth } from '../../../../../providers/auth';
import {
  DataModel,
  GetDataModelStatsQuery,
} from '../../../../../services/gateway-protocol/types';
import ModalRight from '../../../../molecules/modal-right';
import InfoTitle from '../../components/info-title';
import IssueCredentialButton from '../../components/issue-credential-button';
import Tags from '../../components/tags';
import CredentialProtocolCreate from '../../credentials/create/credential-create';
import DataModelTabs from './components/data-model-tabs';

type Props = {
  dataModel: PartialDeep<DataModel>;
  stats: GetDataModelStatsQuery;
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
  const [confirmDiscardChanges, setConfirmDiscardChanges] = useState(false);

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
        <IssueCredentialButton
          dataModel={dataModel}
          onClickIssueCredential={setOpenCreateCredential}
        />
      </Stack>
      <DataModelTabs dataModel={dataModel} stats={stats} />

      {me?.id && (
        <>
          <ModalRight
            open={openCreateCredential}
            handleClose={() => setConfirmDiscardChanges(true)}
          >
            <Stack
              sx={{
                pt: { xs: 3, md: 6 },
                pb: { xs: 2, md: 3 },
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <IconButton
                aria-label="close"
                sx={{ background: alpha(brandColors.white.main, 0.16) }}
                onClick={() => setConfirmDiscardChanges(true)}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
            <CredentialProtocolCreate dataModel={dataModel} />
          </ModalRight>
          <ConfirmDialog
            title={t('data-model.issue-credential.dialog-title')}
            open={confirmDiscardChanges}
            positiveAnswer={t('data-model.issue-credential.dialog-positive')}
            negativeAnswer={t('data-model.issue-credential.dialog-negative')}
            setOpen={setConfirmDiscardChanges}
            onConfirm={setOpenCreateCredential}
          >
            {t('data-model.issue-credential.dialog-text')}
          </ConfirmDialog>
        </>
      )}
    </>
  );
}
