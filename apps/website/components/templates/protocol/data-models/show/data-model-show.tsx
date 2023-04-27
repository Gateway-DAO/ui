import useTranslation from 'next-translate/useTranslation';
import { useEffect, useMemo, useState } from 'react';

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
  PermissionType,
} from '../../../../../services/gateway-protocol/types';
import ModalRight from '../../../../molecules/modal-right';
import InfoTitle from '../../components/info-title';
import Tags from '../../components/tags';
import CredentialProtocolCreate from '../../credentials/create/credential-create';
import DataModelTabs from './components/data-model-tabs';

import { gqlAnonMethods } from 'apps/website/services/hasura/api';
import { useQuery } from '@tanstack/react-query';
import { AvatarFile } from 'apps/website/components/atoms/avatar-file';
import { GetDmStatsUntilDayBeforeQuery } from 'apps/website/services/hasura/types';
import IssueCredentialButton from './components/issue-credential-button';

type Props = {
  dataModel: PartialDeep<DataModel>;
  stats: GetDataModelStatsQuery;
  isCredentialCreate?: boolean;
  statsUntilYesterday?: GetDmStatsUntilDayBeforeQuery;
};

export default function DataModelShow({
  dataModel,
  stats,
  isCredentialCreate = false,
  statsUntilYesterday,
}: Props) {
  const { t } = useTranslation('protocol');
  const { me } = useAuth();
  const isP2PDataModel = dataModel.permissioning === PermissionType.All;
  console.log(isP2PDataModel);
  const [openCreateCredential, setOpenCreateCredential] = useToggle(false);
  const [confirmDiscardChanges, setConfirmDiscardChanges] = useState(false);

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

  let mockDataModel: any = dataModel;
  mockDataModel
    ? (mockDataModel.createdBy = {
        id: '63bc7fc62e7bd8b316b77133',
        slug: 'gateway',
      })
    : (mockDataModel = null);
  // MOCK - END

  const creator = useQuery(
    ['issuer', mockDataModel?.id],
    () =>
      gqlAnonMethods.dao_profile_by_slug({
        slug: 'gateway',
      }),
    {
      select: (data) => data.daos?.[0],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  
  return (
    <>
      <Stack sx={{ px: { xs: 0, md: 4, lg: 6 } }}>
        {isP2PDataModel && (
          <>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                flexBasis: '100%',
                cursor: false ? 'pointer' : 'default',
                borderRadius: true
                  ? '16px 16px 0 0'
                  : false
                  ? '0 16px 0 0'
                  : '16px 0 0 0',
                transition: 'background .3s ease',
                '&:hover': {
                  background: false
                    ? alpha(brandColors.white.main, 0.05)
                    : 'inherit',
                },
              }}
            >
              <AvatarFile
                file={creator?.data?.logo}
                fallback="/avatar.png"
                sx={{ mr: 2 }}
              >
                {dataModel.title}
              </AvatarFile>
              <div>
                <InfoTitle
                  title={dataModel?.title}
                  labelId={t('data-model.data-model-id')}
                  id={dataModel?.id}
                  copySucessMessage={t('data-model.copy-id')}
                  badgeTooltip={t('data-model.verified-description')}
                />
                <Tags tags={dataModel?.tags} />
              </div>
            </Stack>
            <Typography sx={{ mb: 3 }}>{dataModel?.description}</Typography>
          </>
        )}
        {!isP2PDataModel && (
          <>
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
              hasAnAccountAvailableToIssue={hasAnAccountAvailableToIssue}
              onClickIssueCredential={setOpenCreateCredential}
            />
          </>
        )}
      </Stack>
      <DataModelTabs
        dataModel={dataModel}
        stats={stats}
        statsUntilYesterday={statsUntilYesterday}
      />
    </>
  );
}
