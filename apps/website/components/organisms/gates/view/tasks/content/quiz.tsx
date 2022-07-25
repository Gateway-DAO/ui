import { useState } from 'react';

import {
  Button,
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

const QuizContent = ({ data, completed, updatedAt, completeTask }) => {
  const { questions } = data;
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
                      control={<Radio />}
                      label={answer.value}
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
                    />
                  );
                })}
              </FormGroup>
            )}
          </FormControl>
        );
      })}
      {completed ? (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {updatedAt}
        </Typography>
      ) : (
        <Button
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({ questions: answers })}
        >
          Submit
        </Button>
      )}
    </Stack>
  );
};

export default QuizContent;
