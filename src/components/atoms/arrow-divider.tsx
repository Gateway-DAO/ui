import { Box } from '@mui/material';

export function ArrowDivider() {
  return (
    <Box
      sx={{
        alignSelf: { xs: 'baseline', md: 'center' },
        py: { xs: 0, md: 2 },
        px: { xs: 3, md: 2 },
        transform: { xs: 'rotate(90deg)', md: 'none' },
      }}
    >
      <svg width="18" height="36" fill="none" viewBox="0 0 18 36">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".7"
          d="m.5 1 17 17-17 17"
        />
      </svg>
    </Box>
  );
}
