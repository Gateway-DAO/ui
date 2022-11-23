import { brandColors, theme } from '@gateway/theme';

import { Box } from '@mui/material';

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
      <Box
        sx={(theme) => ({
          width: '6px',
          height: '12px',
          background: theme.palette.background.elevated,
          position: 'absolute',
          left: '-3px',
          top: 0,
          zIndex: 1,
        })}
      ></Box>
    </>
  );
};

export default Bullet;
