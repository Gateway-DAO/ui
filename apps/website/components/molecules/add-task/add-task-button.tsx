import { Stack } from '@mui/material';

type AddTaskButtonProps = {
  icon: JSX.Element;
  title: string;
  disabled?: boolean;
};

const AddTaskButton = ({ icon, title, disabled }: AddTaskButtonProps) => {
  return (
    <Stack
      sx={{
        minWidth: '150px',
        backgroundColor: disabled
          ? 'rgba(255, 255, 255, 0.02)'
          : 'rgba(229, 229, 229, 0.08)',
        borderRadius: '10px',
        alignItems: 'center',
        padding: '20px 0',
        cursor: !disabled && 'pointer',
        '&:hover': {
          filter: !disabled && 'brightness(150%)',
        },
      }}
    >
      <p>{icon}</p>
      {disabled ? title + ' (Soon)' : title}
    </Stack>
  );
};

export default AddTaskButton;
