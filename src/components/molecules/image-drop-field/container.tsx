import { PropsWithChildren } from 'react';

import { useFormContext } from 'react-hook-form';
import { DropAreaBond } from 'react-use/lib/useDrop';

import { Box } from '@mui/material';

import { CreateGateData } from '@/components/templates/create-gate/schema';
type Props = {
  hasImage?: boolean;
  isOver?: boolean;
  label: string;
  dropBond: DropAreaBond;
};

export function Container({
  dropBond,
  children,
  hasImage,
  isOver,
  label,
}: PropsWithChildren<Props>) {
  const {
    formState: { errors },
  } = useFormContext<CreateGateData>();
  return (
    <Box
      component="label"
      aria-label={label}
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          transition: 'background-color 0.2s ease-in-out',
        },
        !hasImage && {
          border: errors.image ? '1px solid' : '1px dashed',
          borderColor: (theme) =>
            errors.image ? 'red' : theme.palette.primary.main,
        },
        isOver && {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      ]}
      {...dropBond}
      tabIndex={0}
    >
      {children}
    </Box>
  );
}
