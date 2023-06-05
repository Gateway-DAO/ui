import { useMemo, useRef, useState, useEffect } from 'react';

import CategoriesInput from '@/components/molecules/form/categories-input';
import CreatedByInput from '@/components/molecules/form/creators-input';
import {
  EmojiPicker,
  EmojiPickerProps,
} from '@/components/molecules/form/emoji-picker';
import { CATEGORIES } from '@/constants/gate';
import { useAuth } from '@/providers/auth';
import { EmojiStyle } from 'emoji-picker-react';
import { useFormContext } from 'react-hook-form';

import { InputAdornment, Stack, TextField } from '@mui/material';

import { CreateGateData } from './schema';

export function GateDetailsForm() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<CreateGateData>();
  const { me } = useAuth();
  const creators = useMemo(() => ({ id: me?.id, name: me?.name }), [me]);
  const { categories } = getValues();
  const formValues = getValues();
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [emoji, setEmoji] = useState('');
  const [description, setDescription] = useState(
    formValues.description ? formValues.description : ''
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
      setValue(`description`, firstPart + emoji + secondPart);
    } else {
      setDescription(description + emoji);
      setValue(`description`, description + emoji);
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
    <Stack direction="column" gap={2}>
      <TextField
        label="Title"
        id="title"
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
        sx={{
          '& div fieldset legend span': {
            marginRight: '4px',
          },
        }}
      />
      <CategoriesInput
        label="Categories"
        id="categories"
        name="categories"
        error={!!errors.categories}
        errors={errors.categories}
        defaultValue={categories}
        {...register('categories')}
        categories={CATEGORIES}
        helperText={errors.categories?.message}
        sx={{
          width: '100%',
          '& div fieldset legend span': {
            marginRight: '10px',
          },
        }}
        set={(categories: string[]) => {
          setValue('categories', categories);
        }}
      />
      <TextField
        multiline
        minRows={4}
        label="Description"
        id="description"
        {...register('description')}
        value={description}
        inputRef={descriptionRef}
        error={!!errors.description}
        helperText={errors.description?.message}
        sx={{
          '& div fieldset legend span': {
            marginRight: '12px',
          },
        }}
        onChange={(event) => {
          setDescription(event.target.value);
          setValue('description', event.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {<EmojiPicker {...emojiProps} />}
            </InputAdornment>
          ),
        }}
      />
      <CreatedByInput
        label="Created By"
        id="creator"
        name="creator"
        disabled
        {...register('creator')}
        creators={[creators]}
        defaultValue={[creators]}
        error={!!errors.creator}
        errors={errors.creator}
        helperText={errors.creator && 'Invalid creator added'}
        sx={{
          width: '100%',
          '& div fieldset legend span': {
            marginRight: '6px',
          },
        }}
        set={(creator) => setValue('creator', creator)}
      />
    </Stack>
  );
}
