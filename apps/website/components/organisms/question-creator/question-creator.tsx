import { useState } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

export function QuestionCreator({
  questions,
  onSelectChange,
  onQuestionFieldChange,
}): JSX.Element {
  return (
    <Stack alignItems={'flex-start'} sx={{ width: '100%' }}>
      {questions.map((question, index) => (
        <Stack
          key={index}
          direction="row"
          alignItems={'center'}
          sx={{ width: '100%' }}
        >
          <TextField
            variant="outlined"
            label="Question"
            id={`question-textfield${index}`}
            value={question.question}
            onChange={(event) =>
              onQuestionFieldChange(index, 'question', event.target.value)
            }
          />
          <FormControl>
            <InputLabel id={`question-label${index}`}>Type</InputLabel>
            <Select
              variant="outlined"
              label="Type"
              labelId={`question-select-label${index}`}
              id={`question-select${index}`}
              value={question.type}
              onChange={(event) =>
                onSelectChange(index, 'type', event.target.value)
              }
            >
              <MenuItem value={'single'}>Single answer</MenuItem>
              <MenuItem value={'multiple'}>Multiple answers</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      ))}
    </Stack>
  );
}
