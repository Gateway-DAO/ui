import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '@/providers/auth';

import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material';

import { Delete, Send, Check, Close } from '@mui/icons-material';
import { useDropArea, useToggle } from 'react-use';
import { SendMore } from './send-more';
import ModalRight from '@/components/molecules/modal/modal-right';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateGateData } from '../../../create/schema';
import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  DirectWalletsEmptyHeader,
  DirectWalletsHeader,
} from '../../../create/tasks/direct/direct-wallets-header';
import {
  Direct_Credential_HoldersQuery,
  Direct_Credential_InfoQuery,
  Files,
} from '@/services/hasura/types';
import { DirectWalletsList } from '../../../create/tasks/direct/direct-wallets-lists';
import { DirectWalletsDropzone } from '../../../create/tasks/direct/fields/direct-wallets-dropzone';
import { DirectWalletsProgress } from '../../../create/tasks/direct/fields/direct-wallets-progress';
import { DirectWalletsUploading } from '../../../create/tasks/direct/fields/direct-wallets-uploading';
import ConfirmDialog from '@/components/molecules/modal/confirm-dialog';
import { useLocalStorage } from '@solana/wallet-adapter-react';

type Props = {
  totalHolders: number;
  gateId: string;
  directCredentialInfo: UseQueryResult<Direct_Credential_InfoQuery, unknown>;
  isAdmin: boolean;
  refetchWhitelistedWallets: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<
    QueryObserverResult<InfiniteData<Direct_Credential_HoldersQuery>, unknown>
  >;
};

export function DirectHoldersHeader({
  totalHolders,
  gateId,
  directCredentialInfo,
  isAdmin,
  refetchWhitelistedWallets,
}: Props) {
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

  const [verifySingleData, setVerifySingleData] = useState({
    type: '',
    wallet: '',
  });

  const [allRecipientsReceviedIt, setAllRecipientsReceviedIt] = useLocalStorage(
    gateId,
    null
  );
  console.log(allRecipientsReceviedIt);
  const verifyCSV = useMutation<Files, unknown, File>(
    ['send-more-multiple-csv'],
    async (file: File) => {
      const formData = new FormData();
      formData.append('csv', file);
      formData.append('gate_id', gateId);

      return fetchAuth(`verify/direct/send-more-multiple`, {
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

  const progress = progressReq.data?.pages?.[0]?.verify_csv_progress;

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
        if (data.verify_send_more_single.duplicate === true) {
          setDuplicateRecipient(true);
          setVerifySingleData({
            type: data.verify_send_more_single.type,
            wallet: data.verify_send_more_single.wallet,
          });
        } else {
          sendMoreSingleSendAgain.mutateAsync({
            type: data.verify_send_more_single.type,
            wallet: data.verify_send_more_single.wallet,
          });
        }
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

  const csvProcessingProgress = useQuery(
    ['csv-processing-progress', gateId],
    () => hasuraUserService.csvProcessingProgress({ jobId: gateId }),
    {
      enabled: isAdmin,
    }
  );

  const handleCloseModalRight = () => {
    refetchWhitelistedWallets();
    directCredentialInfo.refetch();
    setValue('whitelisted_wallets_file', null);
    setUploadFromCsv(false);
    csvProcessingProgress.refetch();
  };

  const processingCount =
    csvProcessingProgress?.data?.csv_processing_progress?.progress;
  const totalProcessingCount =
    csvProcessingProgress?.data?.csv_processing_progress?.total;

  console.log(processingCount, totalProcessingCount);

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
          onClick={() => setOpenSendMore(true)}
          sx={{ m: 2.5 }}
          disabled={!(isAdmin && processingCount)}
        >
          <Send sx={{ mr: 1.2 }} /> Send More
        </Button>
      </Stack>
      {isAdmin && processingCount !== totalProcessingCount && (
        <>
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
            }}
          >
            <Box>
              <Typography variant="subtitle1" color="text.primary">
                {'Issuing Credentials'}
              </Typography>
              <Typography variant="caption">
                {'You will be notified when all recipients have received it'}
              </Typography>
            </Box>
            <Typography variant="body2">
              {csvProcessingProgress?.data?.csv_processing_progress?.progress}
              {` / `}
              {csvProcessingProgress?.data?.csv_processing_progress?.total}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={10}
            sx={{ mb: 3.75, borderRadius: 1 }}
          />
        </>
      )}
      {isAdmin &&
        processingCount !== totalProcessingCount &&
        allRecipientsReceviedIt?.gateId === undefined && (
          <>
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
              }}
            >
              <Stack direction="row" sx={{ ml: -3 }}>
                <Button>
                  <Check color="success" />
                </Button>
                <Typography
                  sx={{ mt: 0.7, ml: -1 }}
                  variant="body1"
                  color="text.primary"
                >
                  {'All recipients recevied it'}
                </Typography>
              </Stack>
              <Button
                onClick={() =>
                  setAllRecipientsReceviedIt({
                    ...allRecipientsReceviedIt,
                    [gateId]: true,
                  })
                }
              >
                <Close color="success" />
              </Button>
            </Stack>
            <LinearProgress
              variant="determinate"
              color="success"
              value={100}
              sx={{ mb: 3.75, borderRadius: 1 }}
            />
          </>
        )}

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
        onConfirm={() => {
          confirmDuplicate
            ? sendMoreMutation.mutateAsync({
                file_id: file.id,
                gate_id: gateId,
              })
            : sendMoreSingleSendAgain.mutateAsync({
                type: verifySingleData.type,
                wallet: verifySingleData.wallet,
              });

          handleCloseModalRight();
        }}
        title="This recipient has already received this credential, are you sure you want to send it again?"
      >
        <></>
      </ConfirmDialog>
      <ModalRight
        handleClose={() => handleCloseModalRight()}
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
                          skipAddRecipient={true}
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
                            skipShowingProgress={true}
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
                            skipAddRecipient={true}
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
                  if (confirmDuplicate) {
                    setDuplicateRecipient(true);
                  } else {
                    sendMoreMutation.mutateAsync({
                      file_id: file.id,
                      gate_id: gateId,
                    });
                    handleCloseModalRight();
                  }
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

// test frontend by using local storage
// delete end point and revoke
// add modal by manish

// cleaning frontend code
