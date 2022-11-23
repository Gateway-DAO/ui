import { limitChars } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import DescriptionIcon from '@mui/icons-material/Description';
import { Divider, Paper, Stack, Typography } from '@mui/material';

type documentCardProps = {
  docTitle?: string;
  docUrl?: string;
  docText?: string;
};

const DocumentCard = ({
  docTitle = 'Title',
  docUrl,
  docText = 'document',
}: documentCardProps) => {
  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        direction: 'row',
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 1,
        mt: 2,
        width: '100%',
      }}
    >
      <Stack justifyContent="center" sx={{ p: 4 }}>
        <DescriptionIcon
          sx={(theme) => ({
            color: theme.palette.grey[500],
            fontSize: '24px',
          })}
        />
      </Stack>
      <Divider orientation="vertical" flexItem />
      <Stack sx={{ flexGrow: 1, p: 2 }}>
        {docUrl && (
          <Typography
            fontSize={14}
            sx={(theme) => ({
              color: theme.palette.grey[500],
              mb: 2,
            })}
          >
            {limitChars(docUrl, 30)}
          </Typography>
        )}
        <Typography
          sx={{
            color: brandColors.purple.main,
          }}
        >
          {limitChars(docTitle, 30)}
        </Typography>
        <Typography
          title={docText}
          sx={(theme) => ({
            color: theme.palette.grey[300],
          })}
        >
          {limitChars(docText, 100)}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default DocumentCard;
