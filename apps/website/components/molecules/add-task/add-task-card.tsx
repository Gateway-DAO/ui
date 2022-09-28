import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import GitHubIcon from '@mui/icons-material/GitHub';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import QuizIcon from '@mui/icons-material/Quiz';
import StarIcon from '@mui/icons-material/Star';
import { Grid, Paper, Stack, Typography } from '@mui/material';

import { CircleWithNumber } from '../../atoms/circle-with-number';
import AddTaskButton from './add-task-button';

const AddTaskCard = ({ numberOfTasks, addTask }) => {
  return (
    <Stack
      sx={{
        padding: { md: '50px', xs: '20px' },
        marginBottom: '80px',
        border: '2px solid rgba(229, 229, 229, 0.08)',
        borderRadius: '10px',
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        marginBottom={{ xs: '24px', md: '40px' }}
      >
        <CircleWithNumber
          number={numberOfTasks + 1}
          sx={(theme) => ({
            mr: theme.spacing(3.75),
            [theme.breakpoints.down('sm')]: { mr: theme.spacing(2.5) },
          })}
        />
        <Stack>
          <Typography variant="h6">Add a requirement</Typography>
          <Typography variant="subtitle2">
            Select your next requirement
          </Typography>
        </Stack>
      </Stack>
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        direction={{ xs: 'column', md: 'row' }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<InsertLinkIcon />}
              title={'Open Links'}
              addTask={() => addTask('self_verify')}
            />
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<QuizIcon />}
              title={'Take Quiz'}
              addTask={() => addTask('quiz')}
            />
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<MonetizationOnIcon />}
              title={'Verify Token'}
              addTask={() => addTask('token_hold')}
            />
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<ElectricBoltIcon />}
              title={'Verify Proposal'}
              addTask={() => addTask('snapshot')}
            />
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<NumbersIcon />}
              title={'Verify Code'}
              addTask={() => addTask('meeting_code')}
            />
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<GitHubIcon />}
              title={'Contribute to repository'}
              addTask={() => addTask('github_contribute')}
            />
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<GitHubIcon />}
              title={'Verify Pull Requests'}
              addTask={() => addTask('github_prs')}
            />
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<StarIcon />}
              title={'Bounty'}
              disabled
              addTask={() => {
                return;
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AddTaskCard;
