import {
  EmailShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'next-share';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

import { SocialIcon } from '../../../../atoms/social-icon';
import { GatesCard } from '../../../../molecules/gates-card';

export default function GateCompletedModal({ gate, open, handleClose }) {
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
          <Box>
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
              <span style={{ color: '#D083FF' }}>{gate.title}</span> Gate from{' '}
              <span style={{ color: '#D083FF' }}>{gate.dao.name}</span>.
            </Typography>
          </Box>
          <Box
            sx={(theme) => ({
              height: { xs: theme.spacing(45.49), md: theme.spacing(59.78) },
              width: { xs: theme.spacing(28.75), md: theme.spacing(37.75) },
              marginY: (theme) => theme.spacing(8),
            })}
          >
            <GatesCard {...gate} />
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              marginTop: {
                xs: (theme) => theme.spacing(10),
                md: (theme) => theme.spacing(3),
              },
            }}
          >
            <Stack>
              <Typography
                color={'#FFFFFFB2'}
                marginBottom={(theme) => theme.spacing(2)}
              >
                Share on
              </Typography>
              <Stack direction="row" spacing={1}>
                <EmailShareButton
                  url={URL}
                  subject={'Congratulations'}
                  body={gate.dao.name + ' via @Gateway_xyz'}
                >
                  <Avatar>
                    <SocialIcon icon="email" />
                  </Avatar>
                </EmailShareButton>
                <RedditShareButton
                  url={URL}
                  title={gate.dao.name + ' via @Gateway_xyz'}
                >
                  <Avatar>
                    <SocialIcon icon="reddit" />
                  </Avatar>
                </RedditShareButton>
                <TwitterShareButton
                  url={URL}
                  title={gate.dao.name}
                  via={'Gateway_xyz'}
                >
                  <Avatar>
                    <SocialIcon icon="twitter" />
                  </Avatar>
                </TwitterShareButton>
              </Stack>
            </Stack>
            <Link href={'/profile'} passHref>
              <Button
                variant="outlined"
                component="a"
                size="medium"
                sx={{ margin: '20px 0 0 20px' }}
              >
                View on Profile
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
}
