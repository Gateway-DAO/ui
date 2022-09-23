import { Twitter } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';

const TwitterTweetContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const { tweet_text } = data;
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();

  return (
    <Stack marginTop={5} alignItems="start">
      <Stack
        sx={{
          background: (theme) => theme.palette.secondary.light,
          justifyContent: 'space-between',
          borderRadius: '8px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            padding: '20px',
          }}
        >
          <Twitter sx={{ color: '#5B7083' }} />
          <Typography
            variant="subtitle1"
            fontWeight={'bold'}
            marginTop={2}
            sx={{
              color: '#5B7083',
              size: '1rem',
              fontFamily: 'sans-serif',
            }}
          >
            {tweet_text}
          </Typography>
        </Box>
        <Box
          sx={{
            background: '#188CD8',
            borderRadius: '0 0 8px 8px',
            padding: '10px',
            textAlign: 'right',
          }}
        >
          <Button
            onClick={() => console.log('joao')}
            href={`https://twitter.com/intent/tweet?text=${tweet_text}`}
            sx={{
              background: (theme) => theme.palette.grey[300],
              color: 'black',
              fontSize: '0.75rem',
              padding: '6px 16px',
              lineHeight: '24px',
              '&:hover': {
                background: (theme) => theme.palette.grey[100],
              },
            }}
          >
            Tweet
          </Button>
        </Box>
      </Stack>
      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({})}
          isLoading={isLoading}
        >
          Check Tweet text
        </LoadingButton>
      )}
      {completed && updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default TwitterTweetContent;
