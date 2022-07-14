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

export function EditProfile() {
  return (
    <Stack gap={7}>
      <Box sx={{ paddingLeft: { xs: '16px', md: '40px' }, paddingTop:{ xs: '24px', md: '40px' } }}>
        <IconButton
          sx={{
            p: 0,
          }}
          //onClick={onShare}
        >
          <Avatar>
            <ArrowBackIcon></ArrowBackIcon>
          </Avatar>
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          top: { xs: '24px', md: '40px' },
          right: { xs: '16px', md: '92px' },
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

      <About />
      <Divider light sx={{ width: '100%' }} />
      <Experiences />
      <Divider light sx={{ width: '100%' }} />
      <Skills />
      <Languages />
      <TimeZone />
    </Stack>
  );
}
