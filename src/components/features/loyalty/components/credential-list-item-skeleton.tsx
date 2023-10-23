import { Skeleton, Stack } from '@mui/material';

export function CredentialListItemSkeleton() {
  return (
    <Stack
      component="a"
      alignItems="center"
      direction="row"
      gap={0.5}
      sx={{
        padding: { xs: 2, md: '36px 60px' },
        borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
        cursor: 'pointer',
        color: 'text.secondary',
        textDecoration: 'none',
      }}
    >
      <Stack
        sx={{
          borderRadius: 1.5,
          aspectRatio: 1,
          overflow: 'hidden',
          alignItems: 'center',
          direction: 'row',
          mr: { xs: 1, md: 4 },
        }}
      >
        <Skeleton variant="rectangular" width={56} height={56} />
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="70%" height={20} />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Skeleton
          variant="rectangular"
          width={60}
          height={32}
          sx={{
            borderRadius: 8,
          }}
        />
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="circular" width={24} height={24} />
      </Stack>
    </Stack>
  );
}
