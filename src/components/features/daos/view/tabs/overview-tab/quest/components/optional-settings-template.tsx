import { Box, Button, Divider, Stack, Switch, Typography } from '@mui/material';
import { Dispatch, useEffect, useRef, useState } from 'react';

export default function OptionalSettingsTemplate({
  updateFormState,
  handleStep,
  input,
}: {
  updateFormState: Dispatch<any>;
  handleStep: (value: boolean) => void;
  input: any;
}) {
  return (
    <Stack direction={'column'} mx={7} mb={5}>
      <Box>
        <Typography variant="h5">Optional Settings</Typography>
        <Typography variant="body2">
          These fields are not required, but you can set expiration date, time,
          and limit the number of credentials issued.
        </Typography>
        <Button onClick={() => handleStep(true)}>
          Click to enable continue button(page is pending to be made)
        </Button>
        <Stack mt={6} direction={'column'}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            divider={<Divider />}
            py={5}
          >
            <Switch />
            <Stack direction={'column'} mx={2}>
              <Typography variant="subtitle1" color={'text.primary'}>
                Expire date and time
              </Typography>
              <Typography variant="body2" color={'text.secondary'}>
                Set a expiration date to claim the credential
              </Typography>
            </Stack>
            <Divider />
          </Stack>
          <Stack
            direction={'row'}
            alignItems={'center'}
            divider={<Divider />}
            py={5}
          >
            <Switch />
            <Stack direction={'column'} mx={2}>
              <Typography variant="subtitle1" color={'text.primary'}>
                Amount limit
              </Typography>
              <Typography variant="body2" color={'text.secondary'}>
                Limit amount of people who can claim the credential
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
