import { useState } from 'react';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';

const QuizContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const { questions } = data;
  const formattedDate = new Date(updatedAt?.toLocaleString()).toLocaleString();
  const initialAnswers = questions.map((question, index) => {
    return { questionIdx: index, answers: [] };
  });

  const [answers, setAnswers] = useState(initialAnswers);

  const updateAnswers = (e, question, questionIndex) => {
    const answersCopy = answers;
    const answerValue = e.target.value;
    const answerIndex = question.options.findIndex(
      (option) => option.value === answerValue
    );

    // Single answer
    if (question.type === 'single') {
      answersCopy[questionIndex].answers = [answerIndex];
      setAnswers(answersCopy);
    }

    // Multiple answers
    if (question.type === 'multiple') {
      if (e.target.checked) {
        answersCopy[questionIndex].answers.push(answerIndex);
      } else {
        answersCopy[questionIndex].answers = answersCopy[
          questionIndex
        ].answers.filter((answer) => answer !== answerIndex);
      }
      setAnswers(answersCopy);
    }
  };

  return (
    <Stack alignItems="start" marginTop={3} gap={2}>
      {questions.map((question, index) => {
        return (
          <FormControl
            key={index}
            onChange={(e) => updateAnswers(e, question, index)}
          >
            <FormLabel>{question.question}</FormLabel>
            {question.type === 'single' ? (
              <RadioGroup>
                {question.options.map((answer, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={answer.value}
                      checked={answer.correct}
                      control={<Radio />}
                      label={answer.value}
                      disabled={readOnly || completed}
                    />
                  );
                })}
              </RadioGroup>
            ) : (
              <FormGroup>
                {question.options.map((answer, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={answer.value}
                      control={<Checkbox />}
                      label={answer.value}
                      disabled={readOnly || completed}
                    />
                  );
                })}
              </FormGroup>
            )}
          </FormControl>
        );
      })}
      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({ questions: answers })}
          isLoading={isLoading}
        >
          Submit
        </LoadingButton>
      )}
      {completed && (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default QuizContent;
