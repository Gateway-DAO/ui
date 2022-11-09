import { useEffect, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useAuth } from 'apps/website/providers/auth';
import { useDropArea } from 'react-use';
import { io } from 'socket.io-client';

import { UploadFile } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';

export function DirectWallets() {
  const { token } = useAuth();

  const verifyCSV = useMutation(
    ['verify-csv'],
    (file: File) => {
      const formData = new FormData();
      formData.append('csv', file);

      return fetch('http://localhost:8080/test/verify-csv', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    },
    {
      onSuccess(data, variables, context) {
        console.log('SUCCESS', data);
      },
      onError(error, variables, context) {
        console.log('ERROR', error);
      },
    }
  );

  const socket = useMemo(
    () =>
      io('http://localhost:8080', {
        autoConnect: false,
        auth: { token },
      }),
    []
  );

  useEffect(() => {
    if (token) {
      socket.connect();
    }
    return () => {
      socket.disconnect();
    };
  }, [token]);

  console.log(verifyCSV);

  const readFiles = (files: File[] | FileList) => {
    const file = files[0];
    if (file) {
      verifyCSV.mutate(file);
    }
    // socket.emit('verify-csv', file);
  };

  const [dropBond, { over: isOver }] = useDropArea({
    onFiles: readFiles,
  });

  return (
    <>
      <Paper
        elevation={1}
        sx={[
          {
            px: { xs: 2, lg: 6 },
            py: { xs: 3, lg: 6 },
            display: 'flex',
            flexFlow: 'column',
            gap: 4,
            transition: 'opacity 0.25s ease',
          },
          isOver && {
            opacity: 0.5,
          },
        ]}
        {...dropBond}
      >
        <Button component="label" variant="outlined" startIcon={<UploadFile />}>
          Import CSV
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
      </Paper>
    </>
  );
}
