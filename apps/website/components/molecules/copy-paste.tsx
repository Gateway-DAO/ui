import { useSnackbar } from 'notistack';

import { limitChars } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { alpha, Button, Stack, Typography } from '@mui/material';

type Props = {
  text: string;
  sucessMessage: string;
  limit?: number;
};

export default function CopyPaste({ text, sucessMessage, limit = 20 }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar(sucessMessage);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
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
