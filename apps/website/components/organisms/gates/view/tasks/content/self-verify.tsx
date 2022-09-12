import Link from 'next/link';
import { useState } from 'react';

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

const ViewButton = ({ incrementView, link, completed }) => {
  const [border, setBorder] = useState(false);
  return (
    <Link passHref href={link}>
      <Button
        component="a"
        variant={completed ? 'outlined' : border ? 'outlined' : 'contained'}
        onClick={() => {
          !border && incrementView();
          setBorder(true);
        }}
        target="_blank"
      >
        {completed ? 'viewed' : border ? 'viewed' : 'view'}
      </Button>
    </Link>
  );
};

const SelfVerifyContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
  isAdmin,
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
            <ViewButton {...{ incrementView, link: file.link, completed }} />
          }
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              marginRight: theme.spacing(6),
              wordBreak: 'break-word',
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
      {completed && updatedAt && (
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
