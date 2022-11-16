import { useMemo, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useController } from 'react-hook-form';
import { useDropArea } from 'react-use';
import { useInfiniteQuery } from 'wagmi';

import { CircularProgress, Paper } from '@mui/material';

import { useAuth } from '../../../../../providers/auth';
import { gqlUserHeader } from '../../../../../services/api';
import { Files } from '../../../../../services/graphql/types.generated';
import { CreateGateData } from '../../schema';
import { DirectWalletsFile } from './direct-wallets-file';
import { DirectWalletsHeader } from './direct-wallets-header';
import { DirectWalletsProgress } from './direct-wallets-progress';
import { ProgressVerifyCSV, UploadVerifyCSV } from './types';

export function DirectWallets() {
  const { me, token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { field } = useController<CreateGateData>({
    name: 'whitelisted_wallets_file',
  });

  const verifyCSV = useMutation<Files, unknown, File>(
    ['verify-csv'],
    async (file: File) => {
      const formData = new FormData();
      formData.append('csv', file);
      if (verifyCSV.data?.id) {
        formData.append('file_id', verifyCSV.data?.id);
      }
      const res = await fetch('http://localhost:8080/test/verify-csv', {
        method: 'POST',
        headers: gqlUserHeader(token, me?.id),
        body: formData,
      });

      return res.json();
    },
    {
      onSuccess(data) {
        field.onChange(data);
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  const file = field.value;

  const progressReq = useInfiniteQuery(
    ['progress', file?.id],
    async (): Promise<ProgressVerifyCSV> => {
      const res = await fetch(
        `http://localhost:8080/test/progress?id=${file?.id}`,
        {
          method: 'GET',
          headers: gqlUserHeader(token, me?.id),
        }
      );
      return res.json();
    },
    {
      enabled: !!file?.id,
      keepPreviousData: false,
      refetchInterval: (data) => !data?.pages[0].isDone && 1000,
      onSuccess(data) {
        if (data.pages[0].isDone) {
          // onFinish();
        }
      },
    }
  );

  const progress = progressReq.data?.pages?.[0];
  const isUploadDisabled = file && progress && !progress.isDone;

  const readFiles = (files: File[] | FileList) => {
    const file = files[0];
    if (file && !isUploadDisabled) {
      verifyCSV.mutate(file);
    }
    if (isUploadDisabled) {
      enqueueSnackbar('Please wait for the current file to finish processing', {
        variant: 'info',
      });
    }
  };

  const [dropBond, { over: isOver }] = useDropArea({
    onFiles: readFiles,
  });

  const progressStatus = useMemo(() => {
    if (!progress) return;
    if (!progress.isDone) return 'loading';
    if (progress.invalid.length > 0) return 'error';
    return 'success';
  }, [progress]);

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
        <DirectWalletsHeader
          disabled={isUploadDisabled}
          readFiles={readFiles}
          totalWallets={file?.metadata?.total}
        />
        {file && (
          <>
            <DirectWalletsFile
              key={file.id}
              file={file}
              status={progressStatus}
            />
            <DirectWalletsProgress
              total={file?.metadata?.total}
              valid={0}
              invalid={[]}
              {...progress}
            />
          </>
        )}
      </Paper>
    </>
  );
}
