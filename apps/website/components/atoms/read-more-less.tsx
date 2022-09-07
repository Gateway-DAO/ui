import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { Typography } from '@mui/material';

export const ReadMore = ({ children }) => {
  const { t } = useTranslation('common');
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
      {text.length > 100 ? (
        <>
          {isReadMore ? text.slice(0, 100) + '...' : text}
          <Typography
            variant="body2"
            onClick={toggleReadMore}
            display="inline"
            fontSize={16}
            sx={(theme) => ({
              color: theme.palette.primary.main,
              cursor: 'pointer',
            })}
          >
            {isReadMore
              ? ` ${t('actions.see-more')} `
              : ` ${t('actions.see-less')} `}
          </Typography>
        </>
      ) : (
        text
      )}
    </Typography>
  );
};
