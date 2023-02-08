import { useEffect, useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Clear from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { CircleWithNumber } from '../../../atoms/circle-with-number';
import { TaskIcon } from '../../../atoms/task-icon';
import {
  CreateGateData,
  FileTaskDataError,
} from '../../../templates/create-gate/schema';

const FileLinkTask = ({ dragAndDrop, taskId, deleteTask }) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useFormContext<CreateGateData>();

  const formValues = getValues();

  const {
    fields: files,
    append,
    remove,
  } = useFieldArray({
    name: `tasks.${taskId}.task_data.files`,
    control,
  });

  useEffect(() => {
    if (formValues.tasks[taskId]?.title === '') {
      setValue(`tasks.${taskId}.title`, 'Untitled Requirement');
    }
  }, [setValue, taskId, formValues.tasks]);

  useEffect(() => {
    setTaskVisible(dragAndDrop);
    setTaskIsMoving(dragAndDrop);
  }, [dragAndDrop]);

  const [taskVisible, setTaskVisible] = useState(true);
  const [taskIsMoving, setTaskIsMoving] = useState(true);

  return (
    <Stack
      sx={(theme) => ({
        padding: '50px',
        border: '2px solid rgba(229, 229, 229, 0.08)',
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), ${theme.palette.background.paper}`,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
          padding: taskIsMoving ? '20px 20px 20px 40px' : '20px',
        },
      })}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        marginBottom={!taskVisible ? '40px' : 0}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          sx={(theme) => ({
            width: '100%',
            mr: '20px',
            [theme.breakpoints.between('md', 'lg')]: {
              margin: '-22px',
            },
            [theme.breakpoints.between('lg', 'xl')]: {
              margin: '-22px',
            },
          })}
        >
          <TaskIcon type="self_verify" sx={{ marginRight: 3 }} />
          <Stack>
            <Typography variant="subtitle2">File &#38; Text</Typography>
            <TextField
              variant="standard"
              sx={{
                minWidth: { md: '600px', xs: '110%' },
                maxWidth: { xs: '100%', md: '110%' },
              }}
              InputProps={{
                style: {
                  fontSize: '20px',
                  fontWeight: 'bolder',
                },
                disableUnderline: true,
                sx: {
                  '&.Mui-focused': {
                    borderBottom: '2px solid #9A53FF',
                  },
                },
              }}
              id="file-title"
              {...register(`tasks.${taskId}.title`)}
              error={!!errors.tasks?.[taskId]?.title}
              helperText={errors.tasks?.[taskId]?.title?.message}
            />
          </Stack>
        </Stack>
        {!taskIsMoving && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => deleteTask(taskId)}
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                cursor: 'pointer',
                marginRight: '20px',
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              })}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
            {taskVisible ? (
              <IconButton
                onClick={() => setTaskVisible(false)}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  cursor: 'pointer',
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                })}
              >
                <ExpandMore fontSize="medium" />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => setTaskVisible(true)}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  cursor: 'pointer',
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                })}
              >
                <ExpandLess fontSize="medium" />
              </IconButton>
            )}
          </Box>
        )}
      </Stack>
      <FormControl style={!taskVisible ? {} : { display: 'none' }}>
        <TextField
          required
          multiline
          minRows={3}
          label="Requirement Description"
          id="file-description"
          {...register(`tasks.${taskId}.description`)}
          error={!!errors.tasks?.[taskId]?.description}
          helperText={errors.tasks?.[taskId]?.description?.message}
          sx={{
            marginBottom: '60px',
            '& fieldset legend span': {
              marginRight: '10px',
            },
          }}
        />
        {files.map((file, idx: number) => {
          return (
            <Stack gap={2} key={file.id}>
              <Stack
                sx={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextField
                  required
                  label="File Title"
                  {...register(`tasks.${taskId}.task_data.files.${idx}.title`)}
                  error={
                    !!(errors.tasks?.[taskId]?.task_data as FileTaskDataError)
                      ?.files?.[idx]?.title
                  }
                  helperText={
                    (errors.tasks?.[taskId]?.task_data as FileTaskDataError)
                      ?.files?.[idx]?.title?.message
                  }
                  sx={{ minWidth: { md: '60%', xs: '80%' } }}
                />
                {files.length > 1 && (
                  <IconButton
                    sx={{
                      cursor: 'pointer',
                      color: 'rgba(255, 255, 255, 0.3)',
                      fontSize: '26px',
                      margin: '0px 10px',
                    }}
                    onClick={() => setTaskVisible(false)}
                  >
                    <Clear fontSize="medium" onClick={() => remove(idx)} />
                  </IconButton>
                )}
              </Stack>
              <TextField
                required
                multiline
                minRows={3}
                label="File Description"
                {...register(
                  `tasks.${taskId}.task_data.files.${idx}.description`
                )}
                error={
                  !!(errors.tasks?.[taskId]?.task_data as FileTaskDataError)
                    ?.files?.[idx]?.description
                }
                helperText={
                  (errors.tasks?.[taskId]?.task_data as FileTaskDataError)
                    ?.files?.[idx]?.description?.message
                }
                sx={{
                  '& fieldset legend span': {
                    marginRight: '10px',
                  },
                }}
              />
              <TextField
                required
                label="Link"
                {...register(`tasks.${taskId}.task_data.files.${idx}.link`)}
                error={
                  !!(errors.tasks?.[taskId]?.task_data as FileTaskDataError)
                    ?.files?.[idx]?.link
                }
                helperText={
                  (errors.tasks?.[taskId]?.task_data as FileTaskDataError)
                    ?.files?.[idx]?.link?.message
                }
              />
              <Divider sx={{ margin: '40px -50px' }} />
            </Stack>
          );
        })}
        <Box>
          <Button
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              append({ title: '', description: '', link: '' });
            }}
          >
            Add File &#38; Link
          </Button>
        </Box>
      </FormControl>
    </Stack>
  );
};

export default FileLinkTask;
