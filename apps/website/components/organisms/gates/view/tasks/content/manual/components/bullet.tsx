import { brandColors, theme } from '@gateway/theme';

import { Box, Paper } from '@mui/material';

import { Manual_Task_Events } from '../../../../../../../../services/graphql/types.generated';

const Bullet = ({
  event_type: type,
}: Pick<Manual_Task_Events, 'event_type'>) => {
  const bulletColor = () => {
    switch (type) {
      case 'waiting':
        return brandColors.purple.main;
      case 'reject':
        return brandColors.red.main;
      case 'approve':
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
            type === 'waiting'
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
