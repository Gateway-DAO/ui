import useTranslation from 'next-translate/useTranslation';

import { brandColors } from '@gateway/theme';

import LockIcon from '@mui/icons-material/Lock';
import { alpha, Button } from '@mui/material';

type Props = {
  onClickIssueCredential: () => void;
  hasAnAccountAvailableToIssue: boolean;
};

export default function IssueCredentialButton({
  onClickIssueCredential,
  hasAnAccountAvailableToIssue,
}: Props) {
  const { t } = useTranslation('protocol');

  return (
    <>
      {!hasAnAccountAvailableToIssue ? (
        <Button
          variant="contained"
          disabled={true}
          sx={{
            // width: '120px',
            display: 'flex',
            textTransform: 'uppercase',
            gap: 1,
            px: 1,
            my: 2,
            py: 1,
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
          sx={{ my: 2, py: 1 }}
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
