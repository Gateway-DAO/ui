import { useState } from 'react';
import {
  Stack,
  Typography,
  TextField
} from '@mui/material';

import { useFormContext } from 'react-hook-form';
export function Form() {
  const [bioChar, setBioChar] = useState(0);

  return (
    <Stack gap={4}>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ color: '#fff', fontSize: '16px' }}
      >
        Details
      </Typography>
      <Stack
        component="form"
        direction="column"
        gap={2}
        width={{ sx: '100%', md: '65%' }}
      >
        <TextField
          required
          sx={{
            '& div fieldset legend span': {
              marginRight: '2px',
              paddingRight: '0px',
            },
            '& label.Mui-focused': {
              textTransform: 'uppercase',
            },
            '& label.MuiFormLabel-filled': {
              textTransform: 'uppercase',
            },
          }}
          label="Display Name"
          id="name"
        />
        <TextField
          sx={{
            '& div fieldset legend span': {
              marginRight: '2px',
              paddingRight: '0px',
            },
            '& label.Mui-focused': {
              textTransform: 'uppercase',
            },
            '& label.MuiFormLabel-filled': {
              textTransform: 'uppercase',
            },
          }}
          required
          label="Username"
          id="username"
        />
        <TextField
          sx={{
            '& div fieldset legend span': {
              marginRight: '4px',
              paddingRight: '4px',
            },
            '& label.Mui-focused': {
              textTransform: 'uppercase',
            },
            '& label.MuiFormLabel-filled': {
              textTransform: 'uppercase',
            },
          }}
          multiline
          minRows={4}
          required
          label="Your Bio"
          id="your_bio"
          inputProps={{ maxLength: 200 }}
          onChange={(e) => setBioChar(e.target.value.length)}
        />
        <Typography
          sx={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: '-10px 10px',
          }}
        >
          {bioChar} / 200
        </Typography>
      </Stack>
    </Stack>
  );
}
