import { ReactNode } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, Stack } from '@mui/material';

type AccordionProps = {
  expanded: boolean;
  children: ReactNode;
  isEnabled: boolean;
  clickHandler: () => void;
};

export function Accordion({
  expanded,
  children,
  isEnabled,
  clickHandler,
}: AccordionProps) {
  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="space-between"
      sx={{
        width: '100%',
        borderRadius: '8px 8px 0 0',
        pt: { xs: 2, lg: 6 },
        pb: { xs: 2, lg: 5 },
        px: { xs: 2, lg: 7.5 },
        alignItems: 'center',
        borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
        zIndex: 1,
        boxShadow:
          '0px -5px 5px -3px rgba(0, 0, 0, 0.35), 0px -8px 10px 1px rgba(0, 0, 0, 0.3), 0px -3px 14px 2px rgba(0, 0, 0, 0.3)',
      }}
    >
      {children}
      {isEnabled && (
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
      )}
    </Stack>
  );
}
