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
import {
  CreateGateTypes,
  FileTaskDataError,
} from '../../../templates/create-gate/schema';

const FileLinkTask = ({ taskId, deleteTask }) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useFormContext<CreateGateTypes>();

  const formValues = getValues();

  const {
    fields: files,
    append,
    remove,
  } = useFieldArray({
    name: `tasks.data.${taskId}.task_data.files`,
    control,
  });

  useEffect(() => {
    if (formValues.tasks.data[taskId].title === '') {
      setValue(`tasks.data.${taskId}.title`, 'Untitled Task');
    }
  }, [setValue, taskId, formValues.tasks.data]);

  const [taskVisible, setTaskVisible] = useState(false);

  return (
    <Stack
      sx={(theme) => ({
        padding: '50px',
        border: '2px solid rgba(229, 229, 229, 0.08)',
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), ${theme.palette.background.paper}`,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
          padding: '20px',
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
          sx={{ width: '100%', mr: '20px' }}
        >
          <CircleWithNumber
            number={taskId + 1}
            sx={(theme) => ({
              mr: theme.spacing(3.75),
              [theme.breakpoints.down('sm')]: { mr: theme.spacing(2.5) },
            })}
          />
          <Stack>
            <Typography variant="subtitle2">File &#38; Text</Typography>
            <TextField
              variant="standard"
              autoFocus
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
              {...register(`tasks.data.${taskId}.title`)}
              error={!!errors.tasks?.data?.[taskId]?.title}
              helperText={errors.tasks?.data?.[taskId]?.title?.message}
            />
          </Stack>
        </Stack>
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
      </Stack>
      <FormControl style={!taskVisible ? {} : { display: 'none' }}>
        <TextField
          required
          multiline
          minRows={3}
          label="Task Description"
          id="file-description"
          {...register(`tasks.data.${taskId}.description`)}
          error={!!errors.tasks?.data?.[taskId]?.description}
          helperText={errors.tasks?.data?.[taskId]?.description?.message}
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
                  {...register(
                    `tasks.data.${taskId}.task_data.files.${idx}.title`
                  )}
                  error={
                    !!(
                      errors.tasks?.data?.[taskId]
                        ?.task_data as FileTaskDataError
                    )?.files?.[idx]?.title
                  }
                  helperText={
                    (
                      errors.tasks?.data?.[taskId]
                        ?.task_data as FileTaskDataError
                    )?.files?.[idx]?.title?.message
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
                  `tasks.data.${taskId}.task_data.files.${idx}.description`
                )}
                error={
                  !!(
                    errors.tasks?.data?.[taskId]?.task_data as FileTaskDataError
                  )?.files?.[idx]?.description
                }
                helperText={
                  (errors.tasks?.data?.[taskId]?.task_data as FileTaskDataError)
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
                {...register(
                  `tasks.data.${taskId}.task_data.files.${idx}.link`
                )}
                error={
                  !!(
                    errors.tasks?.data?.[taskId]?.task_data as FileTaskDataError
                  )?.files?.[idx]?.link
                }
                helperText={
                  (errors.tasks?.data?.[taskId]?.task_data as FileTaskDataError)
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
