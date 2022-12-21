import AddIcon from '@mui/icons-material/Add';
import { Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/material';

import { TaskType } from '../../../types/tasks';
import AddTaskButton from './add-task-button';

type taskStructure = {
  type: TaskType;
  title: string;
  description: string;
};

const AddTaskCard = ({ tasks, addTask }) => {
  // Rules
  const hasManualTask = !!tasks?.some((task) => task.task_type === 'manual');

  const Tasks: taskStructure[] = [
    {
      type: 'self_verify' as TaskType,
      title: 'Open Links',
      description: 'Ask users to access a link address',
    },
    {
      type: 'quiz' as TaskType,
      title: 'Take Quiz',
      description: 'Ask questions with multiple or single answer choices',
    },
    {
      type: 'token_hold' as TaskType,
      title: 'Verify Token',
      description: 'Check if the users hold a token',
    },
    {
      type: 'manual' as TaskType,
      title: 'Manual Submission',
      description: 'Submit links as proof of work',
    },
    {
      type: 'nft_hold' as TaskType,
      title: 'Verify NFT',
      description: 'Check if the users hold a token',
    },
    {
      type: 'meeting_code' as TaskType,
      title: 'Verify Code',
      description: 'Ask users to put a code',
    },
    {
      type: 'twitter_follow' as TaskType,
      title: 'Follow Profile',
      description: 'Ask users to follow a profile on Twitter',
    },
    {
      type: 'twitter_retweet' as TaskType,
      title: 'Retweet Post',
      description: 'Ask users to retweet a post on Twitter',
    },
    {
      type: 'twitter_tweet' as TaskType,
      title: 'Post Tweet',
      description: 'Ask users to post a tweet on Twitter',
    },
    {
      type: 'github_contribute' as TaskType,
      title: 'Contribute to repository',
      description: 'Check if users contribute to the repository',
    },
    {
      type: 'github_prs' as TaskType,
      title: 'Verify Pull Requests',
      description: 'Check the number of pull requests',
    },
    {
      type: 'snapshot' as TaskType,
      title: 'Verify Proposal',
      description: 'Check if the user created or voted on a proposal',
    },
  ].filter((task) => !hasManualTask || task.type !== 'manual');
  return (
    <Stack
      sx={{
        padding: { md: '50px', xs: '20px' },
        border: '2px solid rgba(229, 229, 229, 0.08)',
        borderRadius: '10px',
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        marginBottom={{ xs: '24px', md: '40px' }}
      >
        <Box
          padding={1.5}
          sx={{
            display: 'flex',
            border: 2,
            borderRadius: 1,
            borderStyle: 'dashed',
            borderColor: (theme) => theme.palette.primary.main,
            alignContent: 'center',
          }}
          marginRight={4}
        >
          <AddIcon htmlColor="#9A53FF" />
        </Box>

        <Stack>
          <Typography variant="h6">Add a requirement for user</Typography>
          <Typography variant="subtitle2">
            Select your next requirement
          </Typography>
        </Stack>
      </Stack>
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        direction={{ xs: 'column', md: 'row' }}
        columns={{ xs: 4, sm: 8, md: 8 }}
      >
        {Tasks.map((task, index) => (
          <Grid item xs={2} sm={4} md={4} key={task.type}>
            <Paper sx={{ height: '100%' }}>
              <AddTaskButton
                type={task.type}
                title={task.title}
                description={task.description}
                addTask={() => addTask(task.type)}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default AddTaskCard;
