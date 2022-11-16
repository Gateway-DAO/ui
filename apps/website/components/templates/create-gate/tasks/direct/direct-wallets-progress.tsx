import useTranslation from 'next-translate/useTranslation';
import { useRef } from 'react';

import { Virtuoso } from 'react-virtuoso';

import {
  Box,
  CircularProgress,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { ProgressVerifyCSV } from './types';

export function DirectWalletsProgress({
  valid,
  total,
  invalid,
  isDone,
}: ProgressVerifyCSV) {
  const { t } = useTranslation('gate-new');
  const verified = valid + invalid.length;
  const progress = verified / total;

  return (
    <Stack gap={3}>
      <Box>
        <Stack direction="row" gap={2} alignItems="center">
          <Typography variant="body1">{t('direct.progress.title')}</Typography>
          {!isDone && <CircularProgress size="1rem" />}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {t('direct.progress.description')}
        </Typography>
      </Box>
      <Stack gap={1}>
        <Stack justifyContent="space-between" direction="row">
          <Typography>{t('direct.progress.verified')}</Typography>
          <Typography>{t('direct.progress.total')}</Typography>
        </Stack>
        <LinearProgress variant="determinate" value={progress * 100} />
        <Stack justifyContent="space-between" direction="row">
          <Typography>{verified}</Typography>
          <Typography textAlign="center">
            {(progress * 100).toFixed(2)}%
          </Typography>
          <Typography>{total}</Typography>
        </Stack>
      </Stack>
      {invalid.length > 0 && <FailedWallets wallets={invalid} />}
    </Stack>
  );
}

function FailedWallets({ wallets }: { wallets: string[] }) {
  return (
    <Virtuoso
      style={{ height: 400 }}
      data={wallets}
      itemContent={(index, wallet) => <p>{wallet}</p>}
    />
  );
  /*
  return (
    <Stack
      component="ul"
      ref={parentRef}
      sx={{ height: 400, overflow: 'auto' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <li
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {wallets[virtualItem.index]}
          </li>
        ))}
      </div>
    </Stack>
  ); */
}
