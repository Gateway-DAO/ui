import { Avatar, Button, IconButton, Stack, SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { GatesCard } from '../../../../molecules/gates-card';
import Link from 'next/link';
import {
  EmailShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'next-share';
import { SocialIcon } from 'apps/website/components/atoms/social-icon';
import { useEffect, useState } from 'react';

const style: SxProps = {
  bgcolor: 'background.paper',
  px: { xs: 2, md: 6, lg: 12 },
  py: 5,
  height: '100%',
  width: { md: '100%' },
  display: 'flex',
  flexDirection: 'column',
};

export default function GateCompletedModal({ gate, open, handleClose }) {
  const [URL, setURL] = useState<string>();

  useEffect(() => {
    setURL(window.location.href);
  });

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
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
        </Box>

        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 2,
            height: { md: theme.spacing(103.5) },
            width: { md: theme.spacing(103.5) },
            alignSelf: 'center',
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(154, 83, 255, 0.3) 0%, rgba(154, 83, 255, 0) 100%)',
          })}
        >
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h3"
              component="h3"
              fontSize={48}
              textAlign="center"
              sx={{
                mb: 3,
              }}
            >
              Congratulations!
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: 'center' }}
              fontSize={16}
              color={'#FFFFFFB2'}
            >
              You have completed the{' '}
              <span style={{ color: '#D083FF' }}>{gate.title}</span> Gate from{' '}
              <span style={{ color: '#D083FF' }}>{gate.dao.name}</span>.
            </Typography>
          </Box>
          <Box
            sx={(theme) => ({
              height: theme.spacing(59.78),
              width: theme.spacing(37.75),
              marginTop: 6,
            })}
          >
            <GatesCard {...gate} />
          </Box>
          <Box
            sx={(theme) => ({
              display: 'flex',
              justifyContent: 'space-between',
              width: '50%',
              mt: theme.spacing(2.27),
            })}
          >
            <Box>
              <Typography color={'#FFFFFFB2'}>Share on</Typography>
              <Stack direction="row" spacing={1}>
                <EmailShareButton url={URL} subject={'Next Share'} body="body">
                  <Avatar>
                    <SocialIcon icon="email" />
                  </Avatar>
                </EmailShareButton>
                <RedditShareButton
                  url={URL}
                  title={'Congralautions!! you completed this gate'}
                >
                  <Avatar>
                    <SocialIcon icon="reddit" />
                  </Avatar>
                </RedditShareButton>
                <TwitterShareButton
                  url={URL}
                  title={'Congralautions!! you completed this gate'}
                >
                  <Avatar>
                    <SocialIcon icon="twitter" />
                  </Avatar>
                </TwitterShareButton>
              </Stack>
            </Box>
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
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
