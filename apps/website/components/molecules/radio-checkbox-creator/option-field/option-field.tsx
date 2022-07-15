import { useForm } from 'react-hook-form';

import { CircleOutlined, SquareOutlined } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Stack, TextField } from '@mui/material';

export function OptionField({
  onRemove,
  onCheck,
  type = 'single',
  option,
  ...rest
}): JSX.Element {
  const { value, rightAnswer } = option;
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      sx={{ width: '100%', py: '17px' }}
    >
      <Stack direction={'row'} alignItems={'center'} sx={{ width: '100%' }}>
        {type === 'multiple' ? (
          <SquareOutlined sx={{ marginRight: '14px' }} />
        ) : (
          <CircleOutlined sx={{ marginRight: '14px' }} />
        )}
        <TextField
          fullWidth
          InputProps={{ disableUnderline: true }}
          variant={'standard'}
          value={value}
          {...rest}
        />
      </Stack>
      <Stack direction={'row'} alignItems={'center'}>
        <CheckCircleIcon
          sx={(theme) => ({
            marginRight: '25px',
            color: rightAnswer
              ? theme.palette.success.light
              : theme.palette.text.primary,
          })}
          onClick={onCheck}
        />
        <CloseIcon onClick={onRemove} />
      </Stack>
    </Stack>
  );
}
