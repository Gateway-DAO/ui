import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Badge,
  Button,
  Chip,
  CircularProgress,
  ListItemAvatar,
  Stack,
} from '@mui/material';
import { TokenFilled } from '@gateway/assets';
import { GatewayGrayIcon } from '@gateway/assets';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ImageIcon from '@mui/icons-material/Image';

import { AnimatePresence } from 'framer-motion';
import { AnimatedMessage } from '../organisms/wallet-modal/animated-message';
import { Check, Close } from '@mui/icons-material';

export enum Subjects {
  default = 'mint:default',
  start = 'mint:start',
  minting = 'mint:processing',
  minted = 'mint:successful',
}

export const DefaultMintScreen = ({
  mintProcessStatus,
  setmintProcessStatus,
}) => {
  return (
    <>
      <CardMedia
        component="img"
        height="275"
        image="https://f8n-production-collection-assets.imgix.net/0x5F4b303d4083E6dF6A516a338b2b2B40D2e65C3e/1/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&h=640"
        alt="nft image"
      />
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Olympus Odyssey"
      />
      <CardContent sx={{ mt: -2.0 }}>
        <Typography variant="body2" color="text.secondary">
          This is the beginning of your journey in OlympusDAO. Learn about
          what...
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={1} px={2} pt={1} pb={2}>
        {mintProcessStatus === Subjects.default ? (
          <Chip
            key={'mint button'}
            label={'MINT AS NFT'}
            size="medium"
            color="primary"
            icon={<TokenFilled height={20} width={20} color="action" />}
            onClick={() => setmintProcessStatus(Subjects.start)}
          />
        ) : (
          <Avatar sx={{ height: 32, width: 32 }}>
            <TokenFilled height={24} width={24} color="action" />
          </Avatar>
        )}
        {/* we can show maximum 2 categories , when mintProcessStauts is minted*/}
        <Chip key={'onboarding'} label={'Onbarding'} size="medium" />
        <Chip key={'more'} label={'+1'} size="medium" />
      </Stack>
    </>
  );
};

const StartMintScreen = ({ setmintProcessStatus }) => {
  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 200,
          backgroundColor: 'primary',
          '&:hover': {
            backgroundColor: 'primary',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <GatewayGrayIcon
          sx={{
            width: 28,
            height: 28,
            m: 2,
          }}
        />
      </Box>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mx: 2, fontSize: 18 }}
      >
        Choose the network
      </Typography>
      <List component="nav" aria-label="mailbox folders">
        <ListItem button onClick={() => setmintProcessStatus(Subjects.minting)}>
          <ListItemAvatar>
            <Badge
              color="success"
              overlap="circular"
              badgeContent=" "
              variant="dot"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <Avatar>
                <ImageIcon />
              </Avatar>
            </Badge>
          </ListItemAvatar>
          <ListItemText primary="Polygon" secondary="Cost free" />
          <ChevronRightIcon style={{ color: 'grey' }} />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Polygon" secondary="Cost free" />
          <ChevronRightIcon style={{ color: 'grey' }} />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Polygon" secondary="Cost free" />
          <ChevronRightIcon style={{ color: 'grey' }} />
        </ListItem>
      </List>
    </>
  );
};

function MintingScreen({ setmintProcessStatus }) {
  const [status, setStatus] = useState('FAILED');
  if (status === 'SUCCESSFUL') {
    setTimeout(() => {
      setmintProcessStatus(Subjects.minted);
    }, 1000);
  }
  return (
    <>
      <GatewayGrayIcon
        sx={{
          width: 28,
          height: 28,
          m: 2,
        }}
      />
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: 'primary',
          '&:hover': {
            backgroundColor: 'primary',
            opacity: [0.9, 0.8, 0.7],
          },
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {status !== 'SUCCESSFUL' && status !== 'FAILED' && (
          <CircularProgress
            color="secondary"
            sx={{
              height: 60,
              width: 60,
              mb: 2,
              p: 1,
              bgcolor: 'primary.light',
              borderRadius: '50%',
            }}
          />
        )}

        {status == 'SUCCESSFUL' && (
          <Check
            sx={{
              height: 40,
              width: 40,
              mb: 2,
              p: 1,
              color: 'primary.dark',
              bgcolor: 'success.main',
              borderRadius: '50%',
            }}
          />
        )}

        {status == 'FAILED' && (
          <Close
            sx={{
              height: 40,
              width: 40,
              mb: 2,
              p: 1,
              color: 'primary',
              bgcolor: 'error.main',
              borderRadius: '50%',
            }}
          />
        )}

        <Box sx={{ width: 200, position: 'relative' }}>
          <AnimatePresence>
            {status === 'SIGN_IN' && (
              <AnimatedMessage key="signin">
                Please sign the transaction
              </AnimatedMessage>
            )}
            {status === 'MINTING' && (
              <AnimatedMessage key="account">
                Minting credential
              </AnimatedMessage>
            )}
            {status === 'SUCCESSFUL' && (
              <AnimatedMessage key="successful">
                Credential successfully minted as NFT
              </AnimatedMessage>
            )}
            {status === 'FAILED' && (
              <AnimatedMessage key="failed">
                Something went wrong on minting
              </AnimatedMessage>
            )}
          </AnimatePresence>
        </Box>
      </Box>
      {status === 'FAILED' && (
        <Box sx={{ m: 2 }}>
          <Button
            size="large"
            variant="contained"
            fullWidth
            onClick={() => setmintProcessStatus(Subjects.start)}
          >
            RETRY MINT AS NFT
          </Button>
        </Box>
      )}
    </>
  );
}

function processScreen(
  mintProcessStatus: Subjects,
  setmintProcessStatus: React.Dispatch<React.SetStateAction<Subjects>>
) {
  switch (mintProcessStatus) {
    case Subjects.start:
      return <StartMintScreen {...{ setmintProcessStatus }} />;
    case Subjects.minting:
      return <MintingScreen {...{ setmintProcessStatus }} />;
    default:
      return (
        <DefaultMintScreen {...{ mintProcessStatus, setmintProcessStatus }} />
      );
  }
}

export function MintCard() {
  const [mintProcessStatus, setmintProcessStatus] = useState<Subjects>(
    Subjects.default
  );

  return (
    <Card sx={{ width: '300px', height: '450px' }}>
      {processScreen(mintProcessStatus, setmintProcessStatus)}
    </Card>
  );
}
