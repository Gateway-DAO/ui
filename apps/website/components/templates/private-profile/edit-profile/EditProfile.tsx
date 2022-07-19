import { TOKENS } from '@gateway/theme';
import { About } from './Components/About';
import { TimeZone } from './Components/TimeZone';
import { Skills } from './Components/Skills';
import { Languages } from './Components/Languages';
import { Experiences } from './Components/Experiences';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  Divider,
  Button,
  IconButton,
} from '@mui/material';

import { useRouter } from 'next/router';
import { ROUTES } from '../../../../constants/routes';

export function EditProfile() {
  const router = useRouter();
  return (
    <Stack>
      <Box
        sx={{
          paddingLeft: { xs: '14px', md: '85px' },
          paddingTop: { xs: '24px', md: '40px' },
          background:
            ' linear-gradient(180deg, #10041C 0%, rgba(16, 4, 28,0) 100%)',
          position:"fixed",
          width:"100%",
          height:"105px",
          zIndex:"10000"
        }}
      >
        <IconButton
          sx={{
            p: 0,
          }}
          onClick={() => router.push(ROUTES.PRIVATE_PROFILE)}
        >
          <Avatar>
            <ArrowBackIcon></ArrowBackIcon>
          </Avatar>
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            top: { xs: '24px', md: '40px' },
            right: { xs: '18px', md: '96px' },
            cursor: 'pointer',
          }}
        >
          <Button
            sx={{ width: '80px', height: '40px', fontSize: '13px' }}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Box>
      <Box sx={{height:"80px"}}></Box>
      <Box p={TOKENS.CONTAINER_PX}>
        <Typography
          variant="h4"
          sx={{ marginBottom: '4px', color: '#fff' }}
          ml={{ xs: '0px', md: '40px' }}
        >
          Edit profile
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: 'block', color: 'rgba(255, 255, 255, 0.7)' }}
          ml={{ xs: '0px', md: '40px' }}
        >
          Information provided will be displayed on your Gateway profile.
        </Typography>
      </Box>

      {/*Components*/}

      <div id="about">
        <About />
      </div>
      <Divider light sx={{ width: '100%' }} />
      <div id="experiences">
        <Experiences />
      </div>
      <Divider light sx={{ width: '100%' }} />
      <div id="skills">
        <Skills />
      </div>
      <Divider light sx={{ width: '100%' }} />
      <div id="languages">
        <Languages />
      </div>
      <Divider light sx={{ width: '100%' }} />
      <div id="timezones">
        <TimeZone />
      </div>
    </Stack>
  );
}
