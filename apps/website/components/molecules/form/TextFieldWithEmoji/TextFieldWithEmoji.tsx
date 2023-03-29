import { EmojiStyle } from 'emoji-picker-react';
import { EmojiPicker, EmojiPickerProps } from '../emoji-picker/emoji-picker';
import { useEffect, useRef, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';

export default function TextFieldWithEmoji({
  formValues,
  taskId,
  setValue,
  register,
  errors,
}: {
  formValues: any;
  taskId: number;
  setValue: any;
  register: any;
  errors: any;
}) {
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [emoji, setEmoji] = useState('');
  const [description, setDescription] = useState(
    formValues.tasks[taskId]?.description
      ? formValues.tasks[taskId]?.description
      : ''
  );

  useEffect(() => {
    if (
      descriptionRef?.current?.selectionStart > 0 &&
      descriptionRef?.current?.selectionStart < description.length
    ) {
      const firstPart = description.substring(
        0,
        descriptionRef?.current?.selectionStart
      );
      const secondPart = description.substring(
        descriptionRef?.current?.selectionStart,
        description.length
      );
      setDescription(firstPart + emoji + secondPart);
      setValue(`tasks.${taskId}.description`, firstPart + emoji + secondPart);
    } else {
      setDescription(description + emoji);
      setValue(`tasks.${taskId}.description`, description + emoji);
    }
  }, [emoji]);

  const emojiProps: EmojiPickerProps = {
    onEmoji: setEmoji,
    emojiStyle: EmojiStyle.TWITTER,
    boxSxProps: {
      position: 'absolute',
      top: '142px',
      left: '10px',
      zIndex: '2',
    },
    pickerSxProps: {
      position: 'absolute',
      left: { xs: '-40px', md: '0' },
    },
    iconColor: '#9B96A0',
  };
  return (
    <TextField
      multiline
      maxRows={4}
      minRows={3}
      fullWidth
      required
      value={description}
      inputRef={descriptionRef}
      label="Requirement Description"
      id="quiz-description"
      {...register(`tasks.${taskId}.description`)}
      error={!!errors.tasks?.[taskId]?.description}
      helperText={errors.tasks?.[taskId]?.description?.message}
      sx={{
        '& fieldset legend span': {
          marginRight: '10px',
        },
      }}
      onChange={(event) => {
        setDescription(event.target.value);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {<EmojiPicker {...emojiProps} />}
          </InputAdornment>
        ),
      }}
    />
  );
}
