import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useFieldArray, useFormContext } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, IconButton, Stack } from '@mui/material';

import { QuestionField } from '../../molecules/add-task/quiz-task/question-field/question-field';
import { RadioCheckBoxCreator } from '../../molecules/radio-checkbox-creator/radio-checkbox-creator';
import { CreateGateData, Question } from '../../templates/create-gate/schema';

export function QuestionCreator({
  questions,
  taskId,
  onRemove,
  ...rest
}): JSX.Element {
  const { control } = useFormContext<CreateGateData>();

  const { fields, remove, swap, update } = useFieldArray({
    name: `tasks.${taskId}.task_data.questions`,
    control,
  });

  const onDragEnd = () => {
    fields.forEach((q, i) => {
      q.order = i;
      update(i, q);
    });
  };

  const onDragUpdate = (result) => {
    if (!result.destination) {
      return;
    }
    swap(result.source.index, result.destination.index);
  };

  return (
    <Stack
      alignItems={'flex-start'}
      sx={{
        width: '100%',
      }}
      {...rest}
    >
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ width: '100%' }}
            >
              {questions.map((question: Question, index: number) => (
                <Draggable key={index} draggableId={`q-${index}`} index={index}>
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
                            onClick={() => onRemove(index)}
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
