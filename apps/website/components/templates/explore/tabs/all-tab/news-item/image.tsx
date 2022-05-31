import { Box } from '@mui/material';

import { NewsProp } from './type';

type Props = {
  title: string;
  src: string;
};

export function NewsImage({ title, src, isBig }: Props & NewsProp) {
  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      zIndex={1}
      left="50%"
      role="img"
      aria-label={title}
      sx={{
        backgroundSize: isBig
          ? {
              xs: 'cover',
              md: 'contain',
            }
          : 'contain',
        backgroundPosition: isBig
          ? {
              xs: 'left',
              md: 'right',
            }
          : 'right',
        backgroundRepeat: 'no-repeat',
      }}
      style={{
        backgroundImage: `url(${src})`,
      }}
    />
  );
}
