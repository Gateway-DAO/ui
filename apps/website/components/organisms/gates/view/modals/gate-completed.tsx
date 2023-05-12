import useTranslation from 'next-translate/useTranslation';

import { useQueryClient } from '@tanstack/react-query';
import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest';

import CloseIcon from '@mui/icons-material/Close';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Avatar, Button, Dialog, IconButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { query } from '../../../../../constants/queries';
import { useMintData } from '../../../../../hooks/use-mint-data';
import { useAuth } from '../../../../../providers/auth';
import { Credential } from '../../../../../services/gateway-protocol/types';
import { Credentials, Gates } from '../../../../../services/hasura/types';
import GateMintButton from '../../../../molecules/gate-mint-button';
import { GatesCard } from '../../../../molecules/gates-card';
import { MintDialogProtocol } from '../../../../molecules/mint-dialog-protocol';
import ModalShareCredential from '../../../../molecules/modal/modal-share-credential';

type Props = {
  open: boolean;
  gate: PartialDeep<Gates>;
  credential: PartialDeep<Credentials>;
  handleClose: () => void;
  protocolCredential?: PartialDeep<Credential>;
};

export default function GateCompletedModal({
  gate,
  open,
  handleClose,
  credential,
  protocolCredential,
}: Props) {
  const { t } = useTranslation();

  const { me } = useAuth();
  const queryClient = useQueryClient();

  const [shareCredentialIsOpen, setShareCredentialIsOpen] = useToggle(false);

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

  const {
    isOpen: mintDialogIsOpen,
    setIsOpen: setMintDialogIsOpen,
    shareStatus,
    mintData,
    mintCredential,
  } = useMintData({
    credential: protocolCredential,
    gateId: gate?.id,
  });

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
          isOpen={mintCredential.isLoading || mintDialogIsOpen}
          status={shareStatus || mintCredential.status}
          onClose={() => setMintDialogIsOpen(false)}
        />
        <ModalShareCredential
          credential={protocolCredential}
          handleClose={() => {
            setShareCredentialIsOpen();
          }}
          handleOpen={() => setShareCredentialIsOpen()}
          open={shareCredentialIsOpen}
          title={t('credential:share-dialog-title')}
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
              Congratulations!
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
              You have completed the{' '}
              <span style={{ color: '#D083FF' }}>{gate.title}</span> Credential
              from <span style={{ color: '#D083FF' }}>{gate.dao.name}</span>.
            </Typography>
            <Stack
              gap={2}
              mt={2}
              direction={{ xs: 'column', md: 'row' }}
              mx={{ xs: 4 }}
            >
              <Button
                variant="outlined"
                fullWidth
                size="large"
                sx={{
                  mb: 2,
                }}
                onClick={setShareCredentialIsOpen}
                disabled={!protocolCredential}
                startIcon={<IosShareIcon />}
              >
                share
              </Button>
              <GateMintButton
                setMintModal={() => {
                  setMintDialogIsOpen(true);
                  mintCredential.mutate({
                    credentialId: protocolCredential?.id,
                  });
                }}
                showButton={!!protocolCredential}
                mintData={mintData}
              />
            </Stack>
          </Stack>
          <Box
            sx={(theme) => ({
              height: { xs: theme.spacing(45.49), md: theme.spacing(59.78) },
              width: { xs: theme.spacing(28.75), md: theme.spacing(37.75) },
              marginY: (theme) => theme.spacing(5),
              mb: 3,
            })}
          >
            <GatesCard onClick={handleClose} {...gate} />
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
}
