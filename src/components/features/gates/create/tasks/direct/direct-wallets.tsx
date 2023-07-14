import { useAuth } from '@/providers/auth';
import { Files } from '@/services/hasura/types';
import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from 'react-hook-form';
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
import { useEffect, useState } from 'react';
import { AddRecipient } from './add-recipient-dialog';
// check the columns and throw error done on backend level
// add icons for type and popover
// publish credential
// rebuild credential page for direct tasks
// for wallets there is some edge case need to handle
// merge the manish pr and check everything is working and show to designers whole flow

// then start on send more flow
// remove the current credential issuing flow
// clean code
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
  const { hasuraUserService, fetchAuth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { setValue, watch } = useFormContext<CreateGateData>();

  const methods = useForm<AddRecipientDirectCredentialSchema>();

  const [confirmDialgog, setConfirmDialog] = useToggle(false);
  const [addRecipient, setAddRecipient] = useToggle(false);

  const [editRecipient, setEditRecipient] = useToggle(false);
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
        setEditRecipient(true);
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
        setValue('whitelisted_wallets_file', undefined);
      },
    }
  );

  const progress = editRecipient
    ? addRecipientMutation.data?.verify_single
    : // : {
      //     id: '52e8e38f-73b8-43b7-bb08-620b71faca58',
      //     invalid: 0,
      //     invalidList: [
      //       '{"wallet":"0xf084430Fc2CfAd8E81716aEdeBBE4458866D239","type":"Wallet"}',
      //       '{"wallet":"example.com","type":"Email"}',
      //       '{"wallet":"0C8FE70890d445B3099441f5a04dFe9CF1935200e1","type":"Wallet"}',
      //       '{"wallet":"s.","type":"ENS"}',
      //     ],
      //     isDone: true,
      //     total: 8,
      //     uploadedTime: 1689069424482,
      //     validList: [
      //       '{"wallet":"sid.eth","ens":null,"type":"ENS"}',
      //       '{"wallet":"example@gmail.com","type":"Email"}',
      //       '{"wallet":"0xE1c201E8eA40d4fA0df4C142ab1c9D519005FC4E","type":"ENS"}',
      //       '{"wallet":"0xB0D1c17591e7f5C17E15CA505F5fE758D6E40B57","type":"Wallet"}',
      //     ],
      //     valid: 4,
      //   };
      progressReq.data?.pages?.[0]?.verify_csv_progress;

  const addedRecipientData = addRecipientMutation.data?.verify_single;

  const isUploadDisabled = file && progress && !progress.isDone;

  useEffect(() => {
    if (progress?.invalid === 0) handleStep(true);
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
                    {...progress}
                    setAddRecipient={setAddRecipient}
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
          title="Did you use our CSV template to upload your recipients?"
          children={null}
          negativeAnswer="cancel"
          positiveAnswer="Continue"
          onConfirm={() => {
            verifyCSV.mutate(Files);
          }}
        />
        <AddRecipient
          toggleDialog={setAddRecipient}
          open={addRecipient}
          title="Add"
          handleAddRecipientMutation={handleAddRecipientMutation}
        />
      </Paper>
    </FormProvider>
  );
}
