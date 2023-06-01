import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import ExternalLink from '@/components/atoms/external-link';
import ModalRight from '@/components/molecules/modal-right';
import ConfirmDialog from '@/components/organisms/confirm-dialog/confirm-dialog';
import { useAuth } from '@/providers/auth';
import {
  DataModel,
  GetDataModelStatsQuery,
  PermissionType,
} from '@/services/gateway-protocol/types';
import { GetDmStatsUntilDayBeforeQuery } from '@/services/hasura/types';
import { theme } from '@/theme';
import { brandColors } from '@/theme';
import { stat } from 'fs';
import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest/source/partial-deep';

import CloseIcon from '@mui/icons-material/Close';
import {
  Stack,
  Typography,
  useMediaQuery,
  IconButton,
  alpha,
  Box,
} from '@mui/material';

import DashboardCard from '../../../components/dashboard-card';
import CredentialProtocolCreate from '../../../credentials/create/credential-create';
import IssueCredentialButton from './issue-credential-button';
import OverviewCardInfo from './overview-card-info';
import TableSchema from './table-schema';

type Props = {
  dataModel: PartialDeep<DataModel>;
  stats: GetDataModelStatsQuery;
  isCredentialCreate?: boolean;
  statsUntilYesterday?: GetDmStatsUntilDayBeforeQuery;
};

export default function OverviewTab({
  dataModel,
  stats,
  isCredentialCreate = false,
  statsUntilYesterday,
}: Props) {
  const { t } = useTranslation('protocol');
  const router = useRouter();
  const isP2PDataModel = dataModel.permissioning === PermissionType.All;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const calculateGrowth = (finalValue: number, startingNumber: number) => {
    if (startingNumber > 0)
      return parseFloat(
        ((finalValue - startingNumber) / startingNumber).toFixed(2)
      );
  };

  const { me } = useAuth();
  const [openCreateCredential, setOpenCreateCredential] = useToggle(false);
  const [confirmDiscardChanges, setConfirmDiscardChanges] = useState(false);

  const toggleModal = () => {
    if (openCreateCredential) {
      router.back();
    } else {
      router.push('#issue-credential');
    }
    setOpenCreateCredential();
  };

  const hasAnAccountAvailableToIssue = useMemo(() => {
    if (!me?.id) return;
    const organizationsId = me?.protocol?.accesses?.map(
      (item) => item.organization.id
    );
    const usersIdAndOrganizationsId = [me?.protocol?.id].concat(
      organizationsId
    );
    const availableToIssue = dataModel?.allowedUsers
      .concat(dataModel?.allowedOrganizations as any)
      .map((availableItem) => availableItem.id);

    switch (dataModel?.permissioning) {
      case PermissionType.SpecificIds:
        return !!usersIdAndOrganizationsId.find((userOrOrgId) => {
          return (
            availableToIssue.length &&
            availableToIssue?.indexOf(userOrOrgId) > -1
          );
        });
      case PermissionType.Organizations:
        return !!organizationsId.length;
      case PermissionType.All:
      default:
        return true;
    }
  }, [me]);

  useEffect(() => {
    if (hasAnAccountAvailableToIssue && isCredentialCreate) {
      setOpenCreateCredential(true);
    }
  }, [me]);

  return (
    <>
      <Stack
        sx={{
          maxWidth: '726px',
          pt: 2,
          py: 3,
          px: { xs: 0, md: 4, lg: 6 },
        }}
      >
        {isP2PDataModel && (
          <>
            <Typography
              sx={{
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '32px',
                letterSpacing: '0.15px',
                my: 2,
              }}
            >
              {dataModel?.info}
            </Typography>
            <Typography sx={{ mb: 3 }}>{dataModel?.info}</Typography>
            <IssueCredentialButton
              hasAnAccountAvailableToIssue={hasAnAccountAvailableToIssue}
              onClickIssueCredential={toggleModal}
            />
            <Box sx={{ mb: '32px' }}></Box>
          </>
        )}

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
            caption={`from ${
              stats?.getTotalofIssuersByDataModel -
              statsUntilYesterday?.issuer_count?.aggregate?.count
            } (in 1 day)`}
            indicator={calculateGrowth(
              stats?.getTotalofIssuersByDataModel,
              statsUntilYesterday?.issuer_count?.aggregate?.count
            )}
          />
          <DashboardCard
            label={t('data-model.issued-credentials')}
            value={stats?.getTotalCredentialsByDataModel}
            caption={`from ${
              stats?.getTotalCredentialsByDataModel -
              statsUntilYesterday?.credential_count?.aggregate?.count
            } (in 1 day)`}
            indicator={calculateGrowth(
              stats?.getTotalCredentialsByDataModel,
              statsUntilYesterday?.credential_count?.aggregate?.count
            )}
          />
          <DashboardCard
            label={t('data-model.recipients')}
            value={stats?.getTotalCredentialsByDataModelGroupByRecipient}
            caption={`from ${
              stats?.getTotalCredentialsByDataModelGroupByRecipient -
              statsUntilYesterday?.recipient_count?.aggregate?.count
            } (in 1 day)`}
            indicator={calculateGrowth(
              stats?.getTotalCredentialsByDataModelGroupByRecipient,
              statsUntilYesterday?.recipient_count?.aggregate?.count
            )}
          />
        </Stack>
        <TableSchema
          title="Claim"
          data={dataModel?.schema?.properties}
          subtitle1="Field"
          subtitle2="Input Type"
        />
      </Stack>
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
            onConfirm={toggleModal}
          >
            {t('data-model.issue-credential.dialog-text')}
          </ConfirmDialog>
        </>
      )}
    </>
  );
}
