import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { theme } from '@gateway/theme';

import {
  Stack,
  Typography,
  useMediaQuery,
  IconButton,
  alpha,
} from '@mui/material';
import ModalRight from '../../../../../molecules/modal-right';
import ConfirmDialog from '../../../../../../components/organisms/confirm-dialog/confirm-dialog';

import { brandColors } from '@gateway/theme';
import CredentialProtocolCreate from '../../../credentials/create/credential-create';
import {
  DataModel,
  GetDataModelStatsQuery,
  PermissionType,
} from '../../../../../../services/gateway-protocol/types';
import ExternalLink from '../../../../../atoms/external-link';
import DashboardCard from '../../../components/dashboard-card';
import OverviewCardInfo from './overview-card-info';
import TableSchema from './table-schema';
import IssueCredentialButton from '../components/issue-credential-button';
import { useAuth } from '../../../../../../providers/auth';
import { useToggle } from 'react-use';
import { useEffect, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { GetDmStatsUntilDayBeforeQuery } from 'apps/website/services/hasura/types';
import { useRouter } from 'next/router';

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
  const s =
    stats?.getTotalCredentialsByDataModel -
    statsUntilYesterday?.credential_count?.aggregate?.count;
  console.log(statsUntilYesterday?.credential_count?.aggregate?.count);
  console.log(
    stats?.getTotalCredentialsByDataModel -
      statsUntilYesterday?.credential_count?.aggregate?.count
  );
  console.log(((stats?.getTotalCredentialsByDataModel - s) / s) * 100);

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
              variant="h6"
              sx={{ fontSize: { xs: '20px', md: '32px' }, my: 2 }}
            >
              Celebrate the addition of a new team member to an organization
            </Typography>
            <Typography sx={{ mb: 3 }}>
              This credential recognizes the recipient's contribution to the
              team and their potential to make a positive impact on the
              organization. It highlights their skills, experience, and
              enthusiasm for the role, and demonstrates the organization's
              commitment to fostering a culture of recognition and appreciation.
              Achieving this credential is a meaningful accomplishment for any
              new team member and can serve as a source of motivation and
              validation as they embark on their journey with the organization.
            </Typography>
            <IssueCredentialButton
              hasAnAccountAvailableToIssue={hasAnAccountAvailableToIssue}
              onClickIssueCredential={toggleModal}
            />
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
              statsUntilYesterday?.credential_count?.aggregate?.count
            } (in 1 day)`}
          />
          <DashboardCard
            label={t('data-model.issued-credentials')}
            value={stats?.getTotalCredentialsByDataModel}
            caption={`from ${
              stats?.getTotalCredentialsByDataModel -
              statsUntilYesterday?.credential_count?.aggregate?.count
            } (in 1 day)`}
          />
          <DashboardCard
            label={t('data-model.recipients')}
            value={stats?.getTotalCredentialsByDataModelGroupByRecipient}
            caption={`from ${
              stats?.getTotalCredentialsByDataModelGroupByRecipient -
              statsUntilYesterday?.credential_count?.aggregate?.count
            } (in 1 day)`}
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
