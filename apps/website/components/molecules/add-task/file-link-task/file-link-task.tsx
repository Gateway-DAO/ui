import { useState } from 'react';

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

const FileLinkTask = ({ taskId, deleteTask }) => {
  const [filesCount, setFilesCount] = useState(1);

  const [files, setFiles] = useState([
    {
      id: 0,
      title: '',
      description: '',
      link: '',
    },
  ]);

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
          <TextField variant="standard" sx={{ minWidth: '600px' }} />
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
          sx={{ marginBottom: '60px' }}
        />
        {files.map((file) => {
          return (
            <Stack gap={2} key={file.id}>
              <Stack>
                <TextField
                  required
                  label="File Title"
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
              />
              <TextField required label="Link" />
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
