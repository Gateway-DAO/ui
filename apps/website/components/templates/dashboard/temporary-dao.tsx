import { useEffect } from 'react';

import { usePresence } from 'framer-motion';

import { MotionAvatar } from '@gateway/ui';

import { ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';

import { Dao } from '../../../types/dao';

export function TemporaryDao({ dao }: { dao: Dao }) {
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    !isPresent && setTimeout(safeToRemove, 200);
  }, [isPresent, safeToRemove]);

  return (
    <ListItemButton className={isPresent && 'active'}>
      <ListItemIcon>
        <MotionAvatar
          src={dao.image}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          {dao.name?.[0]}
        </MotionAvatar>
      </ListItemIcon>
    </ListItemButton>
  );
}
