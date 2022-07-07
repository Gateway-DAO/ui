import Card from '@mui/material/Card';
import { useState } from 'react';
import { processScreen } from './process';

export enum Subjects {
  default = 'mint:default',
  start = 'mint:start',
  minting = 'mint:processing',
  minted = 'mint:successful',
}

export function MintCard() {
  const [mintProcessStatus, setmintProcessStatus] = useState<Subjects>(
    Subjects.default
  );

  return (
    <Card sx={{ width: '300px', height: '450px' }}>
      {processScreen(mintProcessStatus, setmintProcessStatus)}
    </Card>
  );
}
