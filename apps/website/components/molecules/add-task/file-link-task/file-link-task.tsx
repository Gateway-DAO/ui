import { useEffect } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import Clear from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { CircleWithNumber } from '../../../atoms/circle-with-number';
import {
  CreateGateTypes,
  FileTypes,
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

  const {
    fields: files,
    append,
    remove,
  } = useFieldArray({
    name: `tasks.data.${taskId}.task_data.files`,
    control,
  });

  useEffect(() => {
    const taskData = getValues().tasks.data[taskId].task_data;
    setValue(`tasks.data.${taskId}.task_type`, 'self_verify');

    if ('files' in taskData && taskData.files.length === 0) {
      setValue(`tasks.data.${taskId}.task_data.files`, [
        { title: '', description: '', link: '' },
      ]);
    }
  }, [taskId, setValue, getValues]);

  return (
    <Stack
      sx={{
        padding: '50px',
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
            sx={{ minWidth: '600px' }}
            id="file-title"
            {...register(`tasks.data.${taskId}.title`)}
            error={!!errors.tasks?.data[taskId]?.title}
            helperText={errors.tasks?.data[taskId]?.title?.message}
          />
        </Stack>
        <DeleteIcon
          fontSize="large"
          sx={{ position: 'absolute', right: '0', cursor: 'pointer' }}
          onClick={() => deleteTask(taskId)}
        />
      </Stack>
      <FormControl>
        <TextField
          required
          multiline
          minRows={3}
          label="Task Description"
          id="file-description"
          {...register(`tasks.data.${taskId}.description`)}
          error={!!errors.tasks?.data[taskId]?.description}
          helperText={errors.tasks?.data[taskId]?.description?.message}
          sx={{ marginBottom: '60px' }}
        />
        {files.map((file: FileTypes, idx: number) => {
          return (
            <Stack gap={2} key={idx}>
              <Stack>
                <TextField
                  required
                  label="File Title"
                  {...register(
                    `tasks.data.${taskId}.task_data.files.${idx}.title`
                  )}
                  error={
                    !!(
                      errors.tasks?.data[taskId].task_data as FileTaskDataError
                    )?.files[idx].title
                  }
                  helperText={
                    (errors.tasks?.data[taskId].task_data as FileTaskDataError)
                      ?.files[idx].title?.message
                  }
                  sx={{ maxWidth: '700px' }}
                />
                <Clear
                  fontSize="large"
                  sx={{ position: 'absolute', right: '0', cursor: 'pointer' }}
                  onClick={() => remove(idx)}
                />
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
                  !!(errors.tasks?.data[taskId].task_data as FileTaskDataError)
                    ?.files[idx].description
                }
                helperText={
                  (errors.tasks?.data[taskId].task_data as FileTaskDataError)
                    ?.files[idx].description?.message
                }
              />
              <TextField
                required
                label="Link"
                {...register(
                  `tasks.data.${taskId}.task_data.files.${idx}.link`
                )}
                error={
                  !!(errors.tasks?.data[taskId].task_data as FileTaskDataError)
                    ?.files[idx].link
                }
                helperText={
                  (errors.tasks?.data[taskId].task_data as FileTaskDataError)
                    ?.files[idx].link?.message
                }
              />
              <Divider sx={{ margin: '40px 0' }} />
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
