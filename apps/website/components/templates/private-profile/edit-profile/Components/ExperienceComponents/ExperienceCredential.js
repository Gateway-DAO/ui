import { useState } from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Stack,
  Typography,
  Box,
  IconButton,
  Avatar,
  Chip,
} from '@mui/material';

//date picker components
export default function ExperienceCredential(props) {
  const [visible, setVisible] = useState(true);

  const visiblityHandler = (e) => {
    e.stopPropagation();
    setVisible(!visible);
  };

  return (
    <Box
      sx={{
        padding: { md: '0 48px', xs: '0 6px' },
        opacity: visible ? '1' : '0.4',
      }}
    >
      <Stack
        gap={2}
        display="flex"
        direction="row"
        margin="15px 0px 15px 0px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: { xs: '12px', md: '19px' },
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: '12px',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                width: '56px',
                height: '56px',
                borderRadius: '8px',
              }}
            ></Avatar>
            <Box>
              <Typography
                sx={{
                  fontWeight: '400',
                  fontSize: '16px',
                  color: '#fff',
                }}
              >
                {props.title}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '400',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                This is the beginning of your journey in
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flexDirection: 'row',
            columnGap: '12px',
            alignItems: 'center',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Chip label="Onboarding" />
          <Chip label="Beginner" />
        </Box>
        <IconButton
          sx={{
            color: 'rgba(255, 255, 255, 0.56)',
            marginRight: { xs: '0px', md: '23px' },
            zIndex: '1000',
          }}
          onClick={visiblityHandler}
        >
          {visible ? (
            <Visibility sx={{ width: '30px', height: '20px' }}></Visibility>
          ) : (
            <VisibilityOff
              sx={{ width: '30px', height: '20px' }}
            ></VisibilityOff>
          )}
        </IconButton>
      </Stack>
    </Box>
  );
}
