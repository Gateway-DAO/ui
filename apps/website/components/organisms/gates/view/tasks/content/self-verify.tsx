import normalizeUrl from 'normalize-url';

import DescriptionIcon from '@mui/icons-material/Description';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const SelfVerifyContent = ({ data, completeTask }) => {
  const files = data.files.map((file, index) => {
    return (
      <ListItem
        key={index}
        sx={{ cursor: 'pointer' }}
        onClick={() =>
          window.open(
            normalizeUrl(`${file.link}`, {
              defaultProtocol: 'https:',
            }),
            '_blank'
          )
        }
      >
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary={file.title} secondary={file.description} />
      </ListItem>
    );
  });

  return (
    <List>
      {files}
      <Button
        variant="contained"
        sx={{ marginTop: '15px' }}
        onClick={() => completeTask({})}
      >
        Submit
      </Button>
    </List>
  );
};

export default SelfVerifyContent;
