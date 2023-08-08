import { useAuth } from '@/providers/auth';
import { Files } from '@/services/hasura/types';
import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useDropArea, useToggle } from 'react-use';

import { Paper } from '@mui/material';

import { CreateGateData } from '../../schema';
import {
  DirectWalletsEmptyHeader,
  DirectWalletsHeader,
} from './direct-wallets-header';
import { DirectWalletsList } from './direct-wallets-lists';
import { DirectWalletsDropzone } from './fields/direct-wallets-dropzone';
import { DirectWalletsProgress } from './fields/direct-wallets-progress';
import { DirectWalletsUploading } from './fields/direct-wallets-uploading';
import ConfirmDialog from '@/components/molecules/modal/confirm-dialog';
import { useEffect, useState } from 'react';
import { AddRecipient } from './add-recipient-dialog';
import { useTransaction } from 'wagmi';
import useTranslation from 'next-translate/useTranslation';

export type AddRecipientDirectCredentialSchema = {
  addNew: boolean;
  type: string;
  wallet: string;
  oldType: string;
  oldWallet: string;
};

export function DirectWallets({
  handleStep,
}: {
  handleStep: (value: boolean) => void;
}) {
  const { t } = useTranslation('gate-new');
  const { hasuraUserService, fetchAuth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { setValue, watch } = useFormContext<CreateGateData>();

  const methods = useForm<AddRecipientDirectCredentialSchema>();

  const [confirmDialgog, setConfirmDialog] = useToggle(false);
  const [addRecipient, setAddRecipient] = useToggle(false);

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
        setValue('whitelisted_wallets_file', data);
      },

      onError(error: any) {
        enqueueSnackbar(error?.message ?? JSON.stringify(error), {
          variant: 'error',
        });
      },
    }
  );

  const file = watch('whitelisted_wallets_file');
  const addRecipientMutation = useMutation(
    ['verify-wallet-single', file?.id],
    () =>
      hasuraUserService.verify_single({
        file_id: file?.id,
        addNew: methods.getValues('addNew'),
        type: methods.getValues('type'),
        wallet: methods.getValues('wallet'),
        oldType: methods.getValues('oldType'),
        oldWallet: methods.getValues('oldWallet'),
      }),
    {
      onSuccess(data) {
        progressReq.refetch();
      },

      onError(error: any) {
        enqueueSnackbar(error?.message ?? JSON.stringify(error), {
          variant: 'error',
        });
      },
    }
  );

  const handleAddRecipientMutation = () => {
    addRecipientMutation.mutate();
  };

  const removeRecipientMutation = useMutation(
    ['csv-delete-single'],
    ({
      fileId,
      type,
      wallet,
    }: {
      fileId: string;
      type: string;
      wallet: string;
    }) =>
      hasuraUserService.csv_delete_single({
        id: fileId,
        type,
        wallet,
      }),
    {
      onSuccess(data) {
        progressReq.refetch();
      },

      onError(error: any) {
        enqueueSnackbar(error?.message ?? JSON.stringify(error), {
          variant: 'error',
        });
      },
    }
  );

  const progressReq = useInfiniteQuery(
    ['progress', file?.id],
    () => hasuraUserService.verify_csv_progress({ file_id: file?.id }),
    {
      enabled: !!file?.id,
      keepPreviousData: false,
      refetchInterval: (data) =>
        !data?.pages[0].verify_csv_progress.isDone && 1000,
      onError(error: any) {
        enqueueSnackbar(error?.response?.errors?.[0]?.message, {
          variant: 'error',
        });
        setValue('whitelisted_wallets_file', undefined);
      },
    }
  );

  const progress = progressReq.data?.pages?.[0]?.verify_csv_progress;

  const isUploadDisabled = file && progress && !progress.isDone;

  const handleRemoveRecipientMutation = () => {
    removeRecipientMutation.mutate({
      fileId: file?.id,
      type: methods.getValues('type'),
      wallet: methods.getValues('wallet'),
    });
  };

  useEffect(() => {
    if (progress?.valid + progress?.invalid === 0) {
      setValue('whitelisted_wallets_file', undefined);
      handleStep(false);
    } else if (
      progress?.valid > 0 &&
      progress?.invalid === 0 &&
      progress?.isDone
    )
      handleStep(true);
  });

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
    <FormProvider {...methods}>
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
        {verifyCSV.isLoading || addRecipientMutation.isLoading ? (
          <>
            <DirectWalletsEmptyHeader />
            <DirectWalletsUploading />
          </>
        ) : (
          <>
            {file && progress !== undefined ? (
              <>
                {progress?.isDone && (
                  <DirectWalletsHeader
                    validWallets={progress.valid}
                    invalidWallets={progress.invalid}
                    readFiles={readFiles}
                    total={progress.valid + progress.invalid}
                    setAddRecipient={setAddRecipient}
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
                {progress?.isDone && (
                  <DirectWalletsList
                    fileId={progress.id}
                    invalidList={progress.invalidList}
                    validList={progress.validList}
                    setAddRecipient={setAddRecipient}
                    handleRemoveRecipientMutation={
                      handleRemoveRecipientMutation
                    }
                  />
                )}
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
          title={t('direct.publish-message')}
          negativeAnswer="cancel"
          positiveAnswer="Continue"
          onConfirm={() => {
            verifyCSV.mutate(Files);
          }}
        >
          {' '}
        </ConfirmDialog>
        <AddRecipient
          toggleDialog={setAddRecipient}
          open={addRecipient}
          handleAddRecipientMutation={handleAddRecipientMutation}
        />
      </Paper>
    </FormProvider>
  );
}
