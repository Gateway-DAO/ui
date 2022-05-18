import { Box } from '@mui/material';

type Props = {
  value: string;
  isOver?: boolean;
};

export function BackgroundImage({ value, isOver }: Props) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${value})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        transition: 'opacity 0.2s ease-in-out',
      }}
      style={{
        opacity: isOver ? 0.5 : 1,
      }}
    />
  );
}
