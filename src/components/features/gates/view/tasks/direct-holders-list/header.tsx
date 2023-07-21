import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '@/providers/auth';
import { DateTime } from 'luxon';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { useDropArea, useToggle } from 'react-use';
import { SendMore } from './send-more';
import ModalRight from '@/components/molecules/modal/modal-right';
import { DirectWallets } from '../../../create/tasks/direct/direct-wallets';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { CreateGateData } from '../../../create/schema';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  DirectWalletsEmptyHeader,
  DirectWalletsHeader,
} from '../../../create/tasks/direct/direct-wallets-header';
import { Files } from '@/services/hasura/types';
import { DirectWalletsList } from '../../../create/tasks/direct/direct-wallets-lists';
import { DirectWalletsDropzone } from '../../../create/tasks/direct/fields/direct-wallets-dropzone';
import { DirectWalletsProgress } from '../../../create/tasks/direct/fields/direct-wallets-progress';
import { DirectWalletsUploading } from '../../../create/tasks/direct/fields/direct-wallets-uploading';
import ConfirmDialog from '@/components/molecules/modal/confirm-dialog';

type Props = {
  isLoading?: boolean;
  hasCredential: boolean;
  totalHolders: number;
  completedAt?: string;
  gateId: string;
};

export function DirectHoldersHeader({
  hasCredential,
  totalHolders,
  completedAt,
  gateId,
}: Props) {
  console.log(gateId);

  const { me, onOpenLogin } = useAuth();
  const { t } = useTranslation('credential');
  const [openSendMore, setOpenSendMore] = useToggle(false);
  const [uploadFromCsv, setUploadFromCsv] = useToggle(false);
  const methods = useForm<CreateGateData>();

  const { hasuraUserService, fetchAuth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { setValue, watch } = methods;

  const [confirmDuplicate, setConfirmDuplicate] = useToggle(false);
  const [addRecipient, setAddRecipient] = useToggle(false);

  const [duplicateRecipient, setDuplicateRecipient] = useToggle(false);

  // useEffect(() => {
  //   if (confirmDuplicate) {
  //     sendMoreMutation.mutateAsync({
  //       file_id: file.id,
  //       gate_id: gateId,
  //     });
  //   }
  //   if (confirmDuplicate && !confirmDuplicate) {
  //   }
  // }, [duplicateRecipient, confirmDuplicate]);

  const verifyCSV = useMutation<Files, unknown, File>(
    ['add-new-csv'],
    async (file: File) => {
      const formData = new FormData();
      formData.append('csv', file);
      formData.append('gate_id', gateId);

      return fetchAuth(`verify/direct/add-new`, {
        method: 'POST',
        body: formData,
      });
    },
    {
      onSuccess(data: any) {
        setValue('whitelisted_wallets_file', data);
        setConfirmDuplicate(data?.duplicate);
      },

      onError(error: any) {
        enqueueSnackbar(error?.message ?? JSON.stringify(error), {
          variant: 'error',
        });
      },
    }
  );

  const file = watch('whitelisted_wallets_file');

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

  const sendMoreMutation = useMutation(
    ['send-more-csv'],
    ({ gate_id, file_id }: { gate_id: string; file_id: string }) => {
      return hasuraUserService.csvSendMore({ gate_id, file_id });
    },
    {
      onSuccess(data) {
        enqueueSnackbar('send');
      },

      onError(error: any) {
        enqueueSnackbar(error?.message ?? JSON.stringify(error), {
          variant: 'error',
        });
      },
    }
  );

  const progress =
    // : {
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

  const isUploadDisabled = file && progress && !progress.isDone;

  const readFiles = (files: File[] | FileList) => {
    const file = files[0];
    if (file && !isUploadDisabled && file.type === 'text/csv') {
      verifyCSV.mutate(file);
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

  const verifySendMoreSingleMutation = useMutation(
    ['verify-wallet-single', gateId],
    ({ wallet, type }: { wallet: string; type: string }) =>
      hasuraUserService.verify_send_more_single({
        id: gateId,
        type: type,
        wallet: wallet,
      }),
    {
      onSuccess(data) {
        // if (data.verify_send_more_single.duplicate === true) {
        //   setDuplicateRecipient(true);
        // } else {
        sendMoreSingleSendAgain.mutateAsync({
          type: data.verify_send_more_single.type,
          wallet: data.verify_send_more_single.wallet,
        });
        // }
      },

      onError(error: any) {
        enqueueSnackbar(error?.message ?? JSON.stringify(error), {
          variant: 'error',
        });
      },
    }
  );

  const sendMoreSingleSendAgain = useMutation(
    ['send_more_single_send_again', gateId],
    ({ wallet, type }: { wallet: string; type: string }) =>
      hasuraUserService.send_more_single_send_again({
        id: gateId,
        type: type,
        wallet: wallet,
      }),
    {
      onSuccess(data) {
        enqueueSnackbar('Success');
      },

      onError(error: any) {
        enqueueSnackbar(error?.message ?? JSON.stringify(error), {
          variant: 'error',
        });
      },
    }
  );

  return (
    <>
      <Stack direction="row" justifyContent={'space-between'}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">
            {t('direct-credential.holders.title', { count: totalHolders })}
          </Typography>
          <Typography variant="caption">
            {t('direct-credential.holders.description')}
          </Typography>
        </Box>
        <Button
          variant="contained"
          disabled={false}
          onClick={() => setOpenSendMore(true)}
          sx={{ m: 2.5 }}
        >
          <Send sx={{ mr: 1.2 }} /> Send More
        </Button>
      </Stack>
      {/* {!me && (
        <Stack
          direction="row"
          py={2}
          px={4}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
          borderRadius={1}
          sx={{
            backgroundColor: 'rgba(229, 229, 229, 0.08)',
            mb: 3.75,
          }}
        >
          <Box>
            <Typography variant="subtitle1" color="text.primary">
              {t('direct-credential.eligibility.check.title')}
            </Typography>
            <Typography variant="caption">
              {t('direct-credential.eligibility.check.description')}
            </Typography>
          </Box>
          <Button variant="contained" onClick={onOpenLogin}>
            {t('common:actions.check')}
          </Button>
        </Stack>
      )}
      {!!me && hasCredential && (
        <Alert
          variant="outlined"
          severity="success"
          icon={<></>}
          sx={{ mb: 3.75 }}
        >
          {completedAt
            ? t('direct-credential.eligibility.has-at', {
                published: DateTime.fromISO(completedAt).toFormat(`MM/dd/yyyy`),
              })
            : t('direct-credential.eligibility.has')}
        </Alert>
      )}
      {!!me && !hasCredential && !!totalHolders && (
        <Alert
          variant="outlined"
          severity="warning"
          icon={<></>}
          sx={{ mb: 3.75 }}
        >
          {t('direct-credential.eligibility.not')}
        </Alert>
      )} */}
      <SendMore
        open={openSendMore}
        toggleDialog={setOpenSendMore}
        handleAddRecipientMutation={(type, wallet) => {
          verifySendMoreSingleMutation.mutateAsync({ type, wallet });
        }}
        handleOpenUploadMoreCsv={() => {
          setUploadFromCsv(true);
          setOpenSendMore(false);
        }}
        gateId={gateId}
      />
      <ConfirmDialog
        negativeAnswer="Cancel"
        positiveAnswer="Send Again"
        open={duplicateRecipient}
        setOpen={setDuplicateRecipient}
        onConfirm={() => {}}
        title="This recipient has already received this credential, are you sure you want to send it again?"
      >
        <></>
      </ConfirmDialog>
      <ModalRight
        handleClose={() => setUploadFromCsv(false)}
        open={uploadFromCsv}
      >
        <FormProvider {...methods}>
          <>
            <Box
              sx={[
                {
                  py: { xs: 3, lg: 6 },
                  display: 'flex',
                  flexFlow: 'column',
                  height: '100%',
                  gap: 2,
                  transition: 'opacity 0.25s ease',
                  '& .MuiStack-root': {
                    height: '100%',
                    width: '100%',
                  },
                  '& .MuiBox-root': {
                    height: '100%',
                    width: '100%',
                  },
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
                  <Stack
                    gap={2}
                    alignItems="center"
                    sx={{
                      background: '#261738',
                      borderRadius: 1,
                      border: 1,
                      borderStyle: 'solid',
                      borderColor: 'primary.main',
                      p: 3.75,
                    }}
                  >
                    <CircularProgress size={56} />

                    <Stack gap={0.5} alignItems="center">
                      <Typography variant="body1">Uploading</Typography>
                    </Stack>
                  </Stack>
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
                        <>
                          <DirectWalletsList
                            {...progress}
                            containerProps={{
                              height: '100%',
                            }}
                            setAddRecipient={setAddRecipient}
                          />
                        </>
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
            </Box>
          </>
          {progress?.isDone && (
            <Stack direction={'row'} ml={40}>
              <Button
                variant="contained"
                sx={{ ml: 15 }}
                onClick={() => {
                  // if (confirmDuplicate) {
                  //   setDuplicateRecipient(true);
                  // } else {
                  sendMoreMutation.mutateAsync({
                    file_id: file.id,
                    gate_id: gateId,
                  });
                  // }
                }}
              >
                Send Credential
              </Button>
            </Stack>
          )}
        </FormProvider>
      </ModalRight>
    </>
  );
}
