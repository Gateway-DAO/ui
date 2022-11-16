import { useMemo } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Chip, CircularProgress, Stack, Typography } from '@mui/material';

import { Files } from '../../../../../services/graphql/types.generated';

type Props = {
  file: Files;
  status: 'loading' | 'success' | 'error';
};

export function DirectWalletsFile({ file, status }: Props) {
  const name =
    !file.metadata.originalname.includes('.csv') && file.type === 'text/csv'
      ? file.metadata.originalname + '.csv'
      : file.metadata.originalname;

  const icon = useMemo(() => {
    if (status === 'success') {
      return <DoneIcon />;
    }
    if (status === 'error') {
      return;
    }
  }, [status]);

  return (
    <Chip
      label={name}
      sx={{ alignSelf: 'flex-start', opacity: '1!important' }}
      avatar={<InsertDriveFileIcon sx={{ fontSize: '.5rem' }} />}
      color={status !== 'loading' ? status : undefined}
      deleteIcon={icon}
      onDelete={icon ? () => {} : undefined}
      disabled
    />
  );
}
