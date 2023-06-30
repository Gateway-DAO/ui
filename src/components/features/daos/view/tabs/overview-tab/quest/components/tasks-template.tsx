import { Box, Button, Stack, Typography } from '@mui/material';
import { Dispatch, useEffect, useRef, useState } from 'react';

export default function TasksTemplate({
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
        <Typography variant="h5">Set tasks</Typography>
        <Typography variant="body2">
          Add tasks to your quest that users need to accomplish to earn this
          credential.
        </Typography>
        <Button onClick={() => handleStep(true)}>
          Click to enable continue button(page is pending to be made)
        </Button>
      </Box>
    </Stack>
  );
}
