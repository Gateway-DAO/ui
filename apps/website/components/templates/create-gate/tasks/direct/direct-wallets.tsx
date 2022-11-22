import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useController } from 'react-hook-form';
import { useDropArea } from 'react-use';
import { useInfiniteQuery } from 'wagmi';

import { Paper } from '@mui/material';

import { useAuth } from '../../../../../providers/auth';
import { gqlUserHeader } from '../../../../../services/api';
import { Files } from '../../../../../services/graphql/types.generated';
import { CreateGateData } from '../../schema';
import {
  DirectWalletsEmptyHeader,
  DirectWalletsHeader,
} from './direct-wallets-header';
import { DirectWalletsList } from './direct-wallets-lists';
import { DirectWalletsDropzone } from './fields/direct-wallets-dropzone';
import { DirectWalletsProgress } from './fields/direct-wallets-progress';
import { DirectWalletsUploading } from './fields/direct-wallets-uploading';
import { ProgressVerifyCSV } from './types';

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
            gap: 2,
            transition: 'opacity 0.25s ease',
          },
          isOver && {
            opacity: 0.5,
          },
        ]}
        {...dropBond}
      >
        {verifyCSV.isLoading ? (
          <DirectWalletsUploading />
        ) : (
          <>
            {file ? (
              <>
                <DirectWalletsHeader totalWallets={file?.metadata?.total} />
                {progress && !progress.isDone && (
                  <DirectWalletsProgress
                    total={file?.metadata?.total}
                    valid={0}
                    invalid={0}
                    {...progress}
                  />
                )}
                {progress?.isDone && <DirectWalletsList {...progress} />}
              </>
            ) : (
              <>
                <DirectWalletsEmptyHeader />
                <DirectWalletsDropzone
                  readFiles={readFiles}
                ></DirectWalletsDropzone>
              </>
            )}
          </>
        )}
      </Paper>
    </>
  );
}
