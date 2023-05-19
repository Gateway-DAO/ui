import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useFormContext } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, IconButton, Stack } from '@mui/material';

import { QuestionField } from '@/components/molecules/add-task/quiz-task/question-field/question-field';
import { RadioCheckBoxCreator } from '@/components/molecules/radio-checkbox-creator/radio-checkbox-creator';
import { CreateGateData, Question } from '@/components/templates/create-gate/schema';

export function QuestionCreator({
  questions,
  taskId,
  removeQuestion,
  moveQuestion,
  ...rest
}): JSX.Element {
  const { setValue } = useFormContext<CreateGateData>();

  const onDragUpdate = (result) => {
    if (!result.destination) {
      return;
    }

    moveQuestion(result.source.index, result.destination.index);

    // Update the order field for all affected questions
    for (let i = 0; i < questions.length; i++) {
      setValue(`tasks.${taskId}.task_data.questions.${i}.order`, i);
    }
  };

  return (
    <Stack
      alignItems={'flex-start'}
      sx={{
        width: '100%',
      }}
      {...rest}
    >
      <DragDropContext onDragEnd={onDragUpdate}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ width: '100%' }}
            >
              {questions.map((question: Question, index: number) => (
                <Draggable
                  key={question.id}
                  draggableId={`q-${question.id}`}
                  index={index}
                >
                  {(provided) => (
                    <Stack
                      key={question.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={(theme) => ({
                        width: '100%',
                        py: '48px',
                        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), ${theme.palette.background.paper}`,
                        [theme.breakpoints.down('sm')]: {
                          pt: '38px',
                          pb: '28px',
                        },
                      })}
                    >
                      {index !== 0 && (
                        <Divider
                          sx={(theme) => ({
                            margin: '-40px -50px 60px -50px',
                            [theme.breakpoints.down('sm')]: {
                              margin: '-38px -20px 40px -20px',
                            },
                          })}
                        />
                      )}
                      <Stack
                        direction="row"
                        alignItems={'center'}
                        sx={(theme) => ({
                          width: '100%',
                          position: 'relative',
                          mb: '24px',
                          [theme.breakpoints.down('sm')]: {
                            alignItems: 'flex-start',
                          },
                        })}
                      >
                        <DragIndicatorIcon
                          sx={(theme) => ({
                            position: 'absolute',
                            left: '-30px',
                            top: '15px',
                            color: '#ddd',
                            [theme.breakpoints.down('sm')]: {
                              position: 'relative',
                              left: '-5px',
                              top: '0',
                            },
                          })}
                        />
                        <QuestionField questionIndex={index} taskId={taskId} />

                        {questions.length > 1 && (
                          <IconButton
                            sx={(theme) => ({
                              marginLeft: '24px',
                              cursor: 'pointer',
                              [theme.breakpoints.down('sm')]: {
                                marginLeft: '6px',
                              },
                            })}
                            onClick={() => removeQuestion(index)}
                          >
                            <CloseIcon />
                          </IconButton>
                        )}
                      </Stack>
                      <RadioCheckBoxCreator
                        questionIndex={index}
                        taskId={taskId}
                      />
                    </Stack>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Stack>
  );
}
