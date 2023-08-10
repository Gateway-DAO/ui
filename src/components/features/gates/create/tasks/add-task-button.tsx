import { TaskIcon } from '@/components/atoms/icons/task-icon';
import { TaskType } from '@/types/tasks';

import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

type AddTaskButtonProps = {
  type: TaskType;
  title: string;
  description: string;
  disabled?: boolean;
  addTask: () => void;
};

const AddTaskButton = ({
  type,
  title,
  description,
  addTask,
  disabled = false,
}: AddTaskButtonProps) => {
  return (
    <Stack
      sx={{
        minWidth: '150px',
        backgroundColor: disabled
          ? 'rgba(255, 255, 255, 0.02)'
          : 'rgba(229, 229, 229, 0.08)',
        color: 'rgba(255, 255, 255, 0.56)',
        border: 'solid',
        borderWidth: '1px',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row',
        columnGap: '10px',
        padding: '20px',
        cursor: !disabled && 'pointer',
        '&:hover': {
          backgroundColor: !disabled && 'background.paper',
        },
      }}
      onClick={!disabled ? () => addTask() : () => null}
    >
      <TaskIcon type={type} />
      <Stack>
        <Typography
          variant="subtitle2"
          color={'#FFFFFF'}
          fontWeight={600}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="caption">
          {!disabled ? description : 'Currently unavailable'}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AddTaskButton;
