import { brandColors, theme } from '@gateway/theme';

import { Box, Paper } from '@mui/material';

import { InterationType } from './task-interation';

const Bullet = ({ type }) => {
  const bulletColor = () => {
    switch (type) {
      case InterationType.WAITING:
        return brandColors.purple.main;
      case InterationType.DENIED:
        return brandColors.red.main;
      case InterationType.APPROVED:
        return brandColors.green.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '6px',
          height: '6px',
          background: bulletColor(),
          boxShadow:
            type === InterationType.WAITING
              ? '0px 0px 0px 8px rgba(154, 83, 255, 0.15)'
              : 'none',
          borderRadius: '50%',
          position: 'absolute',
          left: '-3px',
          top: '3px',
          zIndex: 2,
        }}
      ></Box>
      <Paper
        elevation={10}
        sx={{
          width: '6px',
          height: '12px',
          position: 'absolute',
          left: '-3px',
          top: 0,
          zIndex: 1,
        }}
      ></Paper>
    </>
  );
};

export default Bullet;
