import normalizeUrl from 'normalize-url';

import DescriptionIcon from '@mui/icons-material/Description';
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';
import { useState } from 'react';

const ViewButton = ({ incrementView, link }) => {
  const [border, setBorder] = useState(false);
  function buttonLogic() {
    !border && incrementView();
    setBorder(true);
    window.open(
      normalizeUrl(`${link}`, {
        defaultProtocol: 'https:',
      }),
      '_blank'
    );
  }
  return (
    <Button variant={border ? 'outlined' : 'contained'} onClick={buttonLogic}>
      {border ? 'viewed' : 'view'}
    </Button>
  );
};

const SelfVerifyContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const [visit, setVisited] = useState<number>(0);
  const incrementView = () => {
    setVisited(visit + 1);
  };

  const files = data.files.map((file, index) => {
    return (
      <>
        {index == 0 ? null : <Divider />}
        <ListItem
          key={index}
          secondaryAction={
            <ViewButton {...{ incrementView, link: file.link }} />
          }
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              marginRight: theme.spacing(6),
            })}
            primary={file.title}
            secondary={file.description}
          />
        </ListItem>
      </>
    );
  });

  return (
    <>
      <List
        sx={(theme) => ({
          background: theme.palette.background.elevated,
          border: 1,
          borderRadius: theme.spacing(1),
          borderColor: theme.palette.divider,
          marginTop: theme.spacing(3.5),
        })}
      >
        {files}
      </List>
      {completed && (
        <Typography color="#c5ffe3" variant="subtitle2" marginTop={3.5}>
          Task completed at {formattedDate}
        </Typography>
      )}
      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({})}
          isLoading={isLoading}
          disabled={!(visit == data.files.length)}
        >
          Done
        </LoadingButton>
      )}
    </>
  );
};

export default SelfVerifyContent;
