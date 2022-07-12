import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import Clear from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  CreateGateTypes,
  FileTypes,
  FileTaskDataError,
} from '../../../templates/create-gate/schema';

const FileLinkTask = ({ taskId, deleteTask }) => {
  const {
    register,
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
        <LooksOneIcon fontSize="large" style={{ marginRight: '30px' }} />
        <Stack>
          <Typography variant="subtitle2">File &#38; Text</Typography>
          <TextField
            variant="standard"
            sx={{ minWidth: '600px' }}
            id="file-title"
            {...register(`tasks.data.${taskId}.title`)}
            error={!!errors.tasks?.data[taskId].title}
            helperText={errors.tasks?.data[taskId].title?.message}
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
          error={!!errors.tasks?.data[taskId].description}
          helperText={errors.tasks?.data[taskId].description?.message}
          sx={{ marginBottom: '60px' }}
        />
        {files.map((file: FileTypes, idx: number) => {
          return (
            <Stack gap={2} key={file.id}>
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
              append({ id: uuidv4(), title: '', description: '', link: '' });
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
