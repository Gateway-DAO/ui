import { PropsWithChildren } from 'react';

import { MotionBox } from 'apps/website/components/atoms/motion-components';

export const AnimatedMessage = ({ children }: PropsWithChildren<unknown>) => (
  <MotionBox
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ ease: 'easeInOut' }}
    sx={{
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
    }}
  >
    {' '}
    {children}
  </MotionBox>
);
