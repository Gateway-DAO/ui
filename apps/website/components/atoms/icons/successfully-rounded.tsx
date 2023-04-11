import { Box, SxProps } from '@mui/material';

type Props = {
  sx?: SxProps;
};

export default function SuccessfullyRoundedIcon({ sx }: Props) {
  return (
    <Box sx={{ width: '28px', height: '28px', ...sx }}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.9998 0.666016C6.63984 0.666016 0.666504 6.63935 0.666504 13.9993C0.666504 21.3594 6.63984 27.3327 13.9998 27.3327C21.3598 27.3327 27.3332 21.3594 27.3332 13.9993C27.3332 6.63935 21.3598 0.666016 13.9998 0.666016ZM13.9998 24.666C8.1065 24.666 3.33317 19.8927 3.33317 13.9993C3.33317 8.10602 8.1065 3.33268 13.9998 3.33268C19.8932 3.33268 24.6665 8.10602 24.6665 13.9993C24.6665 19.8927 19.8932 24.666 13.9998 24.666Z"
          fill="white"
          fillOpacity="0.56"
        />
      </svg>
    </Box>
  );
}
