import { ReactNode } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, Stack } from '@mui/material';

type AccordionProps = {
  expanded: boolean;
  clickHandler: () => void;
  children: ReactNode;
};

export function Accordion({
  expanded,
  clickHandler,
  children,
}: AccordionProps) {
  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: '100%',
        borderRadius: '8px 8px 0 0',
        pt: 6,
        pb: 5,
        px: 7.5,
        boxShadow:
          '0px -5px 5px -3px rgba(0, 0, 0, 0.2), 0px -8px 10px 1px rgba(0, 0, 0, 0.14), 0px -3px 14px 2px rgba(0, 0, 0, 0.12)',
      }}
    >
      {children}
      <IconButton
        sx={{
          p: 1,
        }}
        onClick={() => clickHandler()}
        key="arrow-down"
      >
        <KeyboardArrowDownIcon
          sx={{
            transition: 'all .4s ease',
            transform: !expanded ? 'rotateX(180deg)' : 'none',
          }}
        />
      </IconButton>
    </Stack>
  );
}
