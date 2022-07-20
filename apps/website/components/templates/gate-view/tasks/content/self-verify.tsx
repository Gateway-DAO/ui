import normalizeUrl from 'normalize-url';

import DescriptionIcon from '@mui/icons-material/Description';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

const SelfVerifyContent = ({ data }) => {
  console.log(data.files);
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

  return <List>{files}</List>;
};

export default SelfVerifyContent;
