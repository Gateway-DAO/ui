import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Avatar, Button, Stack, Typography } from '@mui/material';

type Props = {
  readFiles: (files: File[] | FileList) => void;
};

export function DirectWalletsDropzone({ readFiles }: Props) {
  return (
    <Button
      component="label"
      sx={{
        display: 'flex',
        flexFlow: 'column',
        gap: 2,
        alignItems: 'center',
        background: '#261738',
        borderRadius: 1,
        border: 1,
        borderStyle: 'dashed',
        borderColor: 'primary.main',
        py: 3,
        mt: 2,
        textTransform: 'none',
      }}
    >
      <Stack direction="column" alignItems="center" gap={1}>
        <Avatar>
          <UploadFileIcon />
        </Avatar>
        <Typography component="span" color="text.primary">
          Drop or{' '}
          <Typography component="span" color="primary.main">
            Upload
          </Typography>{' '}
          your CSV file
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        File supported: .csv
      </Typography>
      <input
        hidden
        type="file"
        accept=".csv"
        onChange={(event) => {
          if (event.target.files?.length) {
            readFiles(event.target.files);
          }
        }}
        value={[]}
      />
    </Button>
  );
}
