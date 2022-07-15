import { useState } from 'react';

import { Button, Stack } from '@mui/material';

import { OptionField } from './option-field/option-field';

export function RadioCheckBoxCreator(): JSX.Element {
  const [options, setOptions] = useState<any[]>([]);

  const handleChange = (index, key, value) => {
    const arr = [...options];
    arr[index][key] = value;
    setOptions(arr);
  };

  return (
    <Stack alignItems={'flex-start'} sx={{ width: '100%' }}>
      {options.map((option, index) => (
        <OptionField
          key={index}
          type={'single'}
          onCheck={() =>
            handleChange(index, 'rightAnswer', !option.rightAnswer)
          }
          option={option}
          onChange={(event) => handleChange(index, 'value', event.target.value)}
          onRemove={() => {
            const arr = [...options];
            arr.splice(index, 1);
            setOptions([...arr]);
          }}
        />
      ))}
      <Button
        variant="text"
        sx={{ display: 'inline-block' }}
        onClick={() =>
          setOptions([...options, { value: '', rightAnswer: false }])
        }
      >
        Add option
      </Button>
    </Stack>
  );
}
