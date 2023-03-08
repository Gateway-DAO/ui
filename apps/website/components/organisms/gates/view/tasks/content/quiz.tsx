import { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
  isAdmin,
  attemptCount,
}) => {
  const isInitialAttempt = attemptCount === undefined ? true : false;
  const attemptLimit = isInitialAttempt
    ? data.attempt_limit
    : attemptCount > data.attempt_limit
    ? 0
    : data.attempt_limit - attemptCount;

  const { questions } = data;
  const formattedDate = new Date(updatedAt?.toLocaleString()).toLocaleString();
  const initialAnswers = questions.map((question, index) => {
    return { questionIdx: index, answers: [] };
  });

  const [answers, setAnswers] = useState(initialAnswers);
  const randomQuestion =
    questions[Math.floor(Math.random() * questions.length)];
  const [spammers, setSpammers] = useState(false);

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
      {/* Honey pot trap  for bot/scripts(Spammers)*/}
      <FormControl
        key={'d232'}
        onChange={() => setSpammers(true)}
        sx={{
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          height: 0,
          width: 0,
          zIndex: -1,
        }}
      >
        <FormLabel>{randomQuestion.question}</FormLabel>
        {randomQuestion.type === 'single' ? (
          <RadioGroup>
            {randomQuestion.options
              .sort((a, b) => a.order - b.order)
              .map((answer, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={answer.value}
                    control={<Radio />}
                    {...(isAdmin &&
                      (readOnly || completed) && {
                        checked: answer.correct,
                      })}
                    label={answer.value}
                    disabled={readOnly || completed || isLoading}
                  />
                );
              })}
          </RadioGroup>
        ) : (
          <FormGroup>
            {randomQuestion.options.map((answer, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={answer.value}
                  control={<Checkbox />}
                  label={answer.value}
                  disabled={readOnly || completed || isLoading}
                />
              );
            })}
          </FormGroup>
        )}
      </FormControl>
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
                      {...(isAdmin &&
                        (readOnly || completed) && {
                          checked: answer.correct,
                        })}
                      label={answer.value}
                      disabled={readOnly || completed || isLoading}
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
                      disabled={readOnly || completed || isLoading}
                    />
                  );
                })}
              </FormGroup>
            )}
          </FormControl>
        );
      })}
      {!readOnly && !completed && (
        <>
          {data.attempt_limit !== null && (
            <Stack direction="row" justifyContent="space-between">
              <InfoOutlinedIcon
                color={attemptLimit === 0 ? 'error' : 'inherit'}
              />
              <Typography
                color={(theme) =>
                  attemptLimit === 0 ? 'red' : theme.palette.text.secondary
                }
                variant="subtitle2"
                sx={{ marginLeft: '10px' }}
              >
                {attemptLimit === 0
                  ? `You have ${attemptLimit} out of ${data.attempt_limit} attempts to
                answer.You're no longer able to answer`
                  : `You have ${attemptLimit} out of ${data.attempt_limit} attempts to
                answer`}
              </Typography>
            </Stack>
          )}
          <LoadingButton
            variant="contained"
            sx={{ marginTop: '15px' }}
            onClick={() =>
              !spammers ? completeTask({ questions: answers }) : null
            }
            disabled={attemptLimit === 0}
            isLoading={isLoading}
          >
            Submit
          </LoadingButton>
        </>
      )}
      {completed && updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default QuizContent;
