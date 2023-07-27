import { Divider, Skeleton, Stack } from '@mui/material';

export function ModalContentSkeleton() {
  return (
    <>
      <Skeleton variant="text" />
      <Skeleton variant="text" sx={{ py: 2 }} />
      <Stack direction="column" divider={<Divider />}>
        <Skeleton variant="text" sx={{ py: 2 }} />
        <Skeleton variant="text" sx={{ py: 2 }} />
        <Skeleton variant="text" sx={{ py: 2 }} />
      </Stack>
      <Divider sx={{ my: 4 }} />
      <Skeleton variant="text" />
      <Skeleton variant="text" sx={{ mb: 3 }} />
      <Skeleton variant="text" sx={{ mb: 3 }} />
      <Stack py={6} direction="row" gap={1} justifyContent="space-between">
        <Skeleton
          width="100%"
          height={32}
          sx={{ transform: 'none', borderRadius: 32 }}
        />
        <Skeleton
          width="100%"
          height={32}
          sx={{ transform: 'none', borderRadius: 32 }}
        />
      </Stack>
    </>
  );
}

export const LoadingUser = () => (
  <Stack direction="row" alignItems="center" gap={1.5}>
    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="text" width={80} height={24} />
  </Stack>
);

export const LoadingAuth = () => (
  <Skeleton sx={{ height: '32px', transform: 'none', borderRadius: 4 }} />
);
