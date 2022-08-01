import { Stack } from '@mui/material';

type AddTaskButtonProps = {
  icon: JSX.Element;
  title: string;
  disabled?: boolean;
  addTask: () => void;
};

const AddTaskButton = ({
  icon,
  title,
  disabled,
  addTask,
}: AddTaskButtonProps) => {
  return (
    <Stack
      sx={{
        minWidth: '150px',
        backgroundColor: disabled
          ? 'rgba(255, 255, 255, 0.02)'
          : 'rgba(229, 229, 229, 0.08)',
        color: 'rgba(255, 255, 255, 0.56)',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: { xs: 'row', md: 'column' },
        columnGap: '10px',
        padding: '20px 0',
        cursor: !disabled && 'pointer',
        '&:hover': {
          filter: !disabled && 'brightness(150%)',
        },
      }}
      onClick={() => addTask()}
    >
      <span>{icon}</span>
      <span style={{ margin: '0px 0px 5px 0px' }}>
        {disabled ? title + ' (Soon)' : title}
      </span>
    </Stack>
  );
};

export default AddTaskButton;
