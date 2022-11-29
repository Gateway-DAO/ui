import { useEffect, useState } from 'react';
import { useMenu } from '@gateway/ui';

import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Button,
  Dialog,
  IconButton,
  Stack,
  SxProps,
} from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IosShareIcon from '@mui/icons-material/IosShare';
import { TokenFilled } from '../../../../molecules/mint-card/assets/token-filled';
import { GatesCard } from '../../../../molecules/gates-card';
import { ShareButtonFn } from '../../../../atoms/share-btn-fn';

export default function GateCompletedModal({ gate, open, handleClose }) {
  const menu = useMenu();
  const [URL, setURL] = useState<string>();

  useEffect(() => {
    setURL(window.location.href);
  });

  return (
    <Dialog
      open={open}
      fullScreen
      onClose={handleClose}
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
        <Stack justifyContent="space-between" direction="row">
          <Avatar
            src={'/favicon-512.png'}
            alt={'gateway-logo'}
            sizes={'40px'}
          />
          <Avatar>
            <IconButton onClick={handleClose}>
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
            <Stack direction={'row'} alignSelf={'center'} columnGap={2}>
              <Button
                variant="outlined"
                size="large"
                onClick={menu.onOpen}
                startIcon={<IosShareIcon />}
              >
                share
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  paddingX: 6,
                }}
                startIcon={
                  <TokenFilled height={20} width={20} color="action" />
                }
              >
                Mint as NFT
              </Button>
              <ShareButtonFn
                menu={menu}
                title={`congralaution !! you have completed ${gate.title} Credential`}
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
          <Stack
            direction="row"
            justifyContent={'center'}
            sx={{
              marginTop: { xs: 5, md: 0 },
            }}
          ></Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
}
