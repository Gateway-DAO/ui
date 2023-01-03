import { useSnackbar } from 'notistack';

import { limitChars } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { alpha, Button, Stack, Typography } from '@mui/material';

import { taskErrorMessages } from '../../../../../organisms/tasks/task-error-messages';

type Props = {
  text: string;
  sucessMessage: string;
  limit?: number;
};

export default function CopyPaste({ text, sucessMessage, limit = 20 }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar(sucessMessage);
    } catch (err) {
      enqueueSnackbar(taskErrorMessages['UNEXPECTED_ERROR']);
    }
  };

  return (
    <Stack
      component={Button}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
      onClick={() => copy(text)}
    >
      <Typography
        fontSize={12}
        sx={{ color: alpha(brandColors.white.main, 0.7) }}
      >
        {limitChars(text, limit)}
      </Typography>
      <ContentCopyIcon
        sx={{ fontSize: '16px', color: alpha(brandColors.white.main, 0.7) }}
      />
    </Stack>
  );
}
