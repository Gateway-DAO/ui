import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import LockIcon from '@mui/icons-material/Lock';
import { alpha, Button } from '@mui/material';

import { useAuth } from '../../../../providers/auth';
import { DataModel } from '../../../../services/gateway-protocol/types';

type Props = {
  onClickIssueCredential: () => void;
  dataModel: PartialDeep<DataModel>;
};

export default function IssueCredentialButton({
  onClickIssueCredential,
  dataModel,
}: Props) {
  const { me } = useAuth();
  const { t } = useTranslation('protocol');

  /**
   * If the user is logged in and there are available accounts to issue, return true if the user's
   * account is in the list of available accounts
   * @returns A boolean value.
   */
  const hasAnAccountAvailableToIssue = () => {
    if (!me?.id) return;
    const allowedUsersId = dataModel?.allowedUsers.map((item) => item.id);
    const allowedOrganizationsId = dataModel?.allowedOrganizations.map(
      (item) => item.id
    );
    const availableToIssue = allowedUsersId.concat(allowedOrganizationsId);
    return !![me.id]
      .concat(me?.protocol?.accesses?.map((item) => item.organization.id))
      .find((user) => availableToIssue?.indexOf(user) > -1);
  };

  return (
    <>
      {!hasAnAccountAvailableToIssue() ? (
        <Button
          variant="contained"
          disabled={true}
          sx={{
            width: '120px',
            display: 'flex',
            textTransform: 'uppercase',
            gap: 1,
            px: 1,
          }}
        >
          <LockIcon
            sx={{ fontSize: 16, color: alpha(brandColors.white.main, 0.5) }}
          />{' '}
          {t('data-model.actions.restricted')}
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{ width: '180px' }}
          onClick={() => {
            onClickIssueCredential();
          }}
        >
          {t('data-model.issue-credential-button')}
        </Button>
      )}
    </>
  );
}
