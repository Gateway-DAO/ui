import { useAuth } from '@/providers/auth';
import { Files } from '@/services/hasura/types';
import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useController } from 'react-hook-form';
import { useDropArea, useToggle } from 'react-use';

import { Paper } from '@mui/material';

import { CreateGateData } from '../../schema';
import {
  DirectWalletsEmptyHeader,
  DirectWalletsHeader,
  DirectWalletsVerifyingHeader,
} from './direct-wallets-header';
import { DirectWalletsList } from './direct-wallets-lists';
import { DirectWalletsDropzone } from './fields/direct-wallets-dropzone';
import { DirectWalletsProgress } from './fields/direct-wallets-progress';
import { DirectWalletsUploading } from './fields/direct-wallets-uploading';
import ConfirmDialog from '@/components/molecules/modal/confirm-dialog';
import { useState } from 'react';

export function DirectWallets() {
  const { hasuraUserService, fetchAuth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { field } = useController<CreateGateData>({
    name: 'whitelisted_wallets_file',
  });

  const [confirmDialgog, setConfirmDialog] = useToggle(false);
  const [templateConfimration, setTemplateConfirmation] = useToggle(false);
  const [Files, setFiles] = useState<File>();

  const verifyCSV = useMutation<Files, unknown, File>(
    ['verify-csv'],
    async (file: File) => {
      const formData = new FormData();
      formData.append('csv', file);
      if (verifyCSV.data?.id) {
        formData.append('file_id', verifyCSV.data?.id);
      }
      return fetchAuth(`verify/direct/verify-csv`, {
        method: 'POST',
        body: formData,
      });
    },
    {
      onSuccess(data) {
        field.onChange(data);
      },

      onError(error: any) {
        enqueueSnackbar(error?.message ?? JSON.stringify(error), {
          variant: 'error',
        });
      },
    }
  );

  const file = field.value;

  const progressReq = useInfiniteQuery(
    ['progress', file?.id],
    () => hasuraUserService.verify_csv_progress({ file_id: file?.id }),
    {
      enabled: !!file?.id,
      keepPreviousData: false,
      refetchInterval: (data) =>
        !data?.pages[0].verify_csv_progress.isDone && 1000,
      // retry: 5,
      onError(error: any) {
        enqueueSnackbar(error?.response?.errors?.[0]?.message, {
          variant: 'error',
        });
        field.onChange(undefined);
      },
    }
  );

  const progress = progressReq.data?.pages?.[0]?.verify_csv_progress;
  const isUploadDisabled = file && progress && !progress.isDone;

  const readFiles = (files: File[] | FileList) => {
    const file = files[0];
    if (file && !isUploadDisabled && file.type === 'text/csv') {
      setConfirmDialog(true);
      setFiles(file);
    }
    if (file.type !== 'text/csv')
      enqueueSnackbar('Only CSV files allowed', {
        variant: 'info',
      });
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
        sx={[
          {
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
          <>
            <DirectWalletsEmptyHeader />
            <DirectWalletsUploading />
          </>
        ) : (
          <>
            {file ? (
              <>
                {progress?.isDone && (
                  <DirectWalletsHeader
                    validWallets={progress.valid}
                    invalidWallets={progress.invalid}
                    readFiles={readFiles}
                    total={file?.metadata?.total}
                  />
                )}
                {(!progress || (progress && !progress.isDone)) && (
                  <>
                    <DirectWalletsEmptyHeader />
                    <DirectWalletsProgress
                      total={file?.metadata?.total}
                      isLoading={!progress}
                      valid={progress?.valid ?? 0}
                      invalid={progress?.invalid ?? 0}
                      {...progress}
                    />
                  </>
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
        <ConfirmDialog
          open={confirmDialgog}
          setOpen={setConfirmDialog}
          title="Did you use our CSV template to upload your recipients?"
          children={null}
          negativeAnswer="cancel"
          positiveAnswer="Continue"
          onConfirm={() => {
            setTemplateConfirmation(true);
            verifyCSV.mutate(Files);
          }}
        />
      </Paper>
    </>
  );
}
