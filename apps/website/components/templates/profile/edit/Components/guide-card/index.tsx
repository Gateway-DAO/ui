import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import '@fontsource/plus-jakarta-sans/700.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ROUTES } from '../../../../../../constants/routes';
import Link from 'next/link';

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
  const [progress, setProgress] = useState(0);

  const handleCardProgress = (move: string) => {
    if (move === 'next') {
      return progress === 4 ? setProgress(0) : setProgress(progress + 1);
    }

    if (move === 'previous') {
      return progress === 0 ? setProgress(4) : setProgress(progress - 1);
    }
  };

  const redirectLink = (link: string): string => {
    if (link == 'contribute') {
      return `${ROUTES.EXPLORE}`;
    }
    return `${ROUTES.PROFILE_EDIT + guideDetails[progress].link}`;
  };

  return (
    <Box
      sx={(theme) => ({
        width: theme.spacing(43),
        height: theme.spacing(26),
        background: theme.palette.primary.main,
        borderRadius: theme.spacing(1),
      })}
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
          <Link href={redirectLink(guideDetails[progress].link)} passHref>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              component="a"
            >
              LET'S DO IT
            </Button>
          </Link>
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
          <IconButton onClick={() => handleCardProgress('previous')}>
            <ChevronLeftIcon htmlColor="rgba(255, 255, 255, 0.56)" />
          </IconButton>
          <IconButton onClick={() => handleCardProgress('next')}>
            <ChevronRightIcon htmlColor="rgba(255, 255, 255, 0.56)" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default GuideCard;
