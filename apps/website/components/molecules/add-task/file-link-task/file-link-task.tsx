import { useEffect } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

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
    formState: { errors },
    control,
  } = useFormContext<CreateGateTypes>();

  const {
    fields: files,
    append,
    remove,
  } = useFieldArray({
    name: `tasks.data.${taskId}.task_data.files`,
    control,
  });

  useEffect(() => {
    setValue(`tasks.data.${taskId}.title`, 'Untitled Task');
  }, [setValue, taskId]);

  return (
    <Stack
      sx={{
        backgroundColor: 'rgb(33,22,44)',
        padding: { md: '50px', xs: '16px' },
        border: '2px solid rgba(229, 229, 229, 0.08)',
        borderRadius: '10px',
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        marginBottom="40px"
        sx={{ position: 'relative' }}
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
            sx={{
              minWidth: { md: '600px', xs: '110%' },
              maxWidth: { xs: '100%', md: '110%' },
            }}
            id="file-title"
            {...register(`tasks.data.${taskId}.title`)}
            error={!!errors.tasks?.data?.[taskId]?.title}
            helperText={errors.tasks?.data?.[taskId]?.title?.message}
          />
        </Stack>
        <IconButton
          sx={{
            position: 'absolute',
            right: '0',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.56)',
            fontSize: { xs: '26px' },
          }}
        >
          <DeleteIcon fontSize="large" onClick={() => deleteTask(taskId)} />
        </IconButton>
      </Stack>
      <FormControl>
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
                  <Clear
                    fontSize="large"
                    sx={{
                      cursor: 'pointer',
                      color: 'rgba(255, 255, 255, 0.3)',
                      fontSize: '26px',
                      margin: '0px 10px',
                    }}
                    onClick={() => remove(idx)}
                  />
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
