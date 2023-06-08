import React from 'react';

import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

export const SlideUp = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
