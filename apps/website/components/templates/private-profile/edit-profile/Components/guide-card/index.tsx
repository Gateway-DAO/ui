import { useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import '@fontsource/plus-jakarta-sans/700.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useRouter } from 'next/router';

import { ROUTES } from '../../../../../../constants/routes';

const guideDetails = [
  {
    title: 'Write about you',
    link: '#about',
  },
  {
    title: 'Select your skills',
    link: '#skills',
  },
  {
    title: 'Select your languages',
    link: '#languages',
  },
  {
    title: 'Select your time zone',
    link: '#timezones',
  },
  {
    title: 'Start to contribute',
    link: 'contribute',
  },
];

export function GuideCard({ setShowCard }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const handleNextCard = (move: string) => {
    if (move == 'next') {
      if (progress == 4) {
        setProgress(0);
      } else {
        setProgress(progress + 1);
      }
    }

    if (move == 'previous') {
      if (progress == 0) {
        setProgress(4);
      } else {
        setProgress(progress - 1);
      }
    }
  };

  const redirectLink = (link) => {
    if (link == 'contribute') {
      return router.push(ROUTES.EXPLORE);
    }
    router.push(ROUTES.EDIT_PROFILE + guideDetails[progress].link);
  };

  return (
    <Box
      sx={{
        width: '346px',
        height: '206px',
        background: '#9A53FF',
        borderRadius: '8px',
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={100}
          sx={{ m: 2, color: '#10041C', position: 'absolute', opacity: 0.6 }}
          thickness={4.6}
        />
        <CircularProgress
          variant="determinate"
          value={20 * progress}
          sx={{ m: 2, color: '#FFFFFF', position: 'relative' }}
          thickness={4.6}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {progress} / {guideDetails.length}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mx: 2,
          mt: 1,
          mb: 2.5,
        }}
      >
        <Typography variant="subtitle2">Complete your profile</Typography>
        <Typography variant="h6"> {guideDetails[progress].title}</Typography>
      </Box>
      <Box sx={{ display: 'flex', mx: 2, justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => redirectLink(guideDetails[progress].link)}
          >
            LET'S DO IT
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: '#E5E5E5',
            }}
            size="small"
            color="secondary"
            onClick={() => setShowCard(false)}
          >
            CLOSE
          </Button>
        </Stack>
        <Box>
          <IconButton onClick={() => handleNextCard('previous')}>
            <ChevronLeftIcon htmlColor="rgba(255, 255, 255, 0.56)" />
          </IconButton>
          <IconButton onClick={() => handleNextCard('next')}>
            <ChevronRightIcon htmlColor="rgba(255, 255, 255, 0.56)" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default GuideCard;
