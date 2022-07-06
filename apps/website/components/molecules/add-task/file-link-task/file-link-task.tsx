import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

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

import { CreateGateTypes } from '../../../templates/create-gate/schema';

const FileLinkTask = ({ taskId, deleteTask }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateGateTypes>();

  const [filesCount, setFilesCount] = useState(1);

  const [files, setFiles] = useState([
    {
      id: 0,
      title: '',
      description: '',
      link: '',
    },
  ]);

  useEffect(() => {
    setValue(`tasks.${taskId}.files`, files);
  }, [files, taskId, setValue]);

  const deleteFile = (id: number) =>
    setFiles(files.filter((file) => file.id !== id));

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
            {...register(`tasks.${taskId}.title`)}
            // error={!!errors.tasks[taskId].title}
            // helperText={errors.tasks[taskId].title?.message}
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
          {...register(`tasks.${taskId}.description`)}
          // error={!!errors.tasks[taskId].description}
          // helperText={errors.tasks[taskId].description?.message}
          sx={{ marginBottom: '60px' }}
        />
        {files.map((file) => {
          return (
            <Stack gap={2} key={file.id}>
              <Stack>
                <TextField
                  required
                  label="File Title"
                  {...register(`tasks.${taskId}.files.${file.id}.title`)}
                  // error={!!errors.tasks[taskId].files[file.id].title}
                  // helperText={
                  //   errors.tasks[taskId].files[file.id].title?.message
                  // }
                  sx={{ maxWidth: '700px' }}
                />
                <Clear
                  fontSize="large"
                  sx={{ position: 'absolute', right: '0', cursor: 'pointer' }}
                  onClick={() => deleteFile(file.id)}
                />
              </Stack>
              <TextField
                required
                multiline
                minRows={3}
                label="File Description"
                {...register(`tasks.${taskId}.files.${file.id}.description`)}
                // error={!!errors.tasks[taskId].files[file.id].description}
                // helperText={
                //   errors.tasks[taskId].files[file.id].description?.message
                // }
              />
              <TextField
                required
                label="Link"
                {...register(`tasks.${taskId}.files.${file.id}.link`)}
                // error={!!errors.tasks[taskId].files[file.id].link}
                // helperText={errors.tasks[taskId].files[file.id].link?.message}
              />
              <Divider sx={{ margin: '40px 0' }} />
            </Stack>
          );
        })}
        <Box>
          <Button
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setFilesCount(filesCount + 1);
              setFiles([
                ...files,
                { id: filesCount, title: '', description: '', link: '' },
              ]);
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
