import { Box, BoxProps, Typography } from '@mui/material';

interface CircleWithNumberProps extends BoxProps {
  number: number;
}

export function CircleWithNumber({
  number,
  ...props
}: CircleWithNumberProps): JSX.Element {
  return (
    <Box {...props}>
      <Typography
        variant="h6"
        component="span"
        sx={(theme) => ({
          width: theme.spacing(5),
          height: theme.spacing(5),
          color: theme.palette.background.default,
          background: theme.palette.text.primary,
          overflow: 'hidden',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        {number}
      </Typography>
    </Box>
  );
}
