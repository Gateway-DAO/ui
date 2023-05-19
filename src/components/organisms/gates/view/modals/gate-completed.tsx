import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useMenu } from '@/hooks/use-menu';
import { PartialDeep } from 'type-fest';

import CloseIcon from '@mui/icons-material/Close';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Avatar, Button, Dialog, IconButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { query } from '@/constants/queries';
import { useMintData } from '@/hooks/use-mint-data';
import { useAuth } from '@/providers/auth';
import { Gates } from '@/services/hasura/types';
import { ShareButtonFn } from '@/components/atoms/share-btn-fn';
import GateMintButton from '@/components/molecules/gate-mint-button';
import { GatesCard } from '@/components/molecules/gates-card';
import { MintDialogProtocol } from '@/components/molecules/mint-dialog-protocol';
import ModalShareCredential from '@/components/molecules/modal/modal-share-credential';

type Props = {
  open: boolean;
  gate: PartialDeep<Gates>;
  protocolCredential: PartialDeep<Credential>;
  handleClose: () => void;
};

export default function GateCompletedModal({
  gate,
  open,
  handleClose,
  protocolCredential,
}: Props) {
  const menu = useMenu();
  const queryClient = useQueryClient();
  const { t } = useTranslation('credential');
  const { me } = useAuth();
  const {
    isOpen,
    setIsOpen,
    shareStatus,
    shareIsOpen,
    setShareIsOpen,
    mintCredential,
    showMintButton,
  } = useMintData({
    credential: protocolCredential,
    loyaltyProgramId: gate?.loyalty_id,
    gateId: gate?.id,
  });

  const refetchProtocolCredential = () => {
    if (mintCredential.isSuccess) {
      queryClient.refetchQueries([
        query.protocol_credential_by_gate_id,
        {
          user_id: me?.id,
          gate_id: gate?.id,
        },
      ]);
    }
  };

  return (
    <Dialog
      open={open}
      fullScreen={true}
      onClose={() => {
        refetchProtocolCredential();
        handleClose();
      }}
      sx={{
        '& .MuiPaper-root': {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
        },
        backgroundImage: 'none',
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack
        direction="column"
        sx={{
          bgcolor: 'background.paper',
          px: { xs: 2, md: 6, lg: 12 },
          py: { xs: 1, md: 5 },
          height: '100%',
          width: { md: '100%' },
          display: 'flex',
        }}
      >
        <MintDialogProtocol
          isOpen={mintCredential.isLoading || isOpen}
          status={shareStatus || mintCredential.status}
          onClose={() => setIsOpen(false)}
        />
        <ModalShareCredential
          credential={protocolCredential}
          handleClose={() => setShareIsOpen(false)}
          handleOpen={() => setShareIsOpen(true)}
          open={shareIsOpen}
          title={t('share-credential.title')}
        />
        <Stack justifyContent="space-between" direction="row">
          <Avatar
            src={'/favicon-512.png'}
            alt={'gateway-logo'}
            sizes={'40px'}
          />
          <Avatar>
            <IconButton
              onClick={() => {
                refetchProtocolCredential();
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Avatar>
        </Stack>

        <Stack
          direction="column"
          flex={1}
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
          sx={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(154, 83, 255, 0.3) 0%, rgba(154, 83, 255, 0) 100%)',
            width: '100%',
          }}
        >
          <Stack alignSelf={'center'} rowGap={2}>
            <Typography
              id="modal-modal-title"
              variant="h3"
              component="h3"
              textAlign="center"
              sx={{
                mb: 3,
                fontSize: { xs: 24, md: 48 },
                fontWeight: 700,
              }}
            >
              {t('completed.congratulations')}
            </Typography>
            <Typography
              id="modal-modal-description"
              fontSize={16}
              color={'#FFFFFFB2'}
              sx={{
                mx: { xs: 4 },
                textAlign: 'center',
                alignSelf: 'center',
              }}
            >
              {t('completed.you-have-completed-the')}{' '}
              <span style={{ color: '#D083FF' }}>{gate.title}</span>{' '}
              {t('completed.credential')}
              {t('completed.from')}{' '}
              <span style={{ color: '#D083FF' }}>{gate.dao.name}</span>.
            </Typography>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              alignSelf={'center'}
              columnGap={2}
              rowGap={{ xs: 2, md: 0 }}
            >
              <Button
                variant="outlined"
                size="large"
                onClick={() => setShareIsOpen(true)}
                startIcon={<IosShareIcon />}
                sx={{
                  mb: 2,
                  minWidth: 120,
                }}
              >
                {t('share-credential.share')}
              </Button>
              <GateMintButton
                setMintModal={() => {
                  setIsOpen(true);
                  mintCredential.mutate({
                    credentialId: protocolCredential?.id,
                  });
                }}
                showButton={showMintButton}
              />
              <ShareButtonFn
                menu={menu}
                title={t('completed.congratulations-message', {
                  title: gate.title,
                })}
              />
            </Stack>
          </Stack>
          <Box
            sx={(theme) => ({
              height: { xs: theme.spacing(45.49), md: theme.spacing(59.78) },
              width: { xs: theme.spacing(28.75), md: theme.spacing(37.75) },
              marginY: (theme) => theme.spacing(5),
            })}
          >
            <GatesCard onClick={handleClose} {...gate} />
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
}
