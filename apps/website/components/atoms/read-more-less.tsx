import { useState } from 'react';
import { Typography } from '@mui/material';

export const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <Typography
      variant="body1"
      marginBottom={(theme) => theme.spacing(4)}
      sx={{ wordBreak: 'break-word' }}
      paragraph={true}
    >
      {isReadMore ? text.slice(0, 125) + '...' : text}
      <Typography
        variant="body2"
        onClick={toggleReadMore}
        display="inline"
        fontSize={16}
        sx={(theme) => ({
          color: theme.palette.primary.main,
        })}
      >
        {isReadMore ? ' See more ' : ' See less '}
      </Typography>
    </Typography>
  );
};
