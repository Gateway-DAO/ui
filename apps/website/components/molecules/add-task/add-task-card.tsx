import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import QuizIcon from '@mui/icons-material/Quiz';
import StarIcon from '@mui/icons-material/Star';
import { Grid, Paper, Stack, Typography } from '@mui/material';

import AddTaskButton from './add-task-button';
import FileLinkTask from './file-link-task/file-link-task';

const AddTaskCard = ({ addTask }) => {
  return (
    <Stack
      sx={{
        padding: '50px',
        border: '2px solid rgba(229, 229, 229, 0.08)',
        borderRadius: '10px',
      }}
    >
      <Stack direction={'row'} alignItems={'center'} marginBottom="40px">
        <LooksOneIcon fontSize="large" style={{ marginRight: '30px' }} />
        <Stack>
          <Typography variant="h6">Add a task</Typography>
          <Typography variant="subtitle2">Select your next task</Typography>
        </Stack>
      </Stack>
      <Grid
        container
        spacing={{ xs: 0.5, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<InsertLinkIcon />}
              title={'Files & Links'}
              addTask={() => addTask(FileLinkTask, 'self_verify')}
            />
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<QuizIcon />}
              title={'Create Quizz'}
              disabled
              addTask={() => {
                return;
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<MonetizationOnIcon />}
              title={'Hold Token'}
              disabled
              addTask={() => {
                return;
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<ElectricBoltIcon />}
              title={'Snapshot Governance'}
              disabled
              addTask={() => {
                return;
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <AddTaskButton
              icon={<NumbersIcon />}
              title={'Verification Code'}
              disabled
              addTask={() => {
                return;
              }}
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
