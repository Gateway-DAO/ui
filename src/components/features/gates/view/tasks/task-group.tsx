import React from 'react';

import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export function TaskGroup({ children }: Props) {
  return (
    <Box>
      {React.Children.map(children, (child: React.ReactElement, idx) => {
        return React.cloneElement(child, { idx: idx + 1, ...child.props });
      })}
    </Box>
  );
}
