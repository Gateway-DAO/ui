import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ChangeEvent, Fragment, useMemo, useState } from 'react';

import { PartialDeep } from 'type-fest';

import SearchIcon from '@mui/icons-material/Search';
import {
  Divider,
  ListItem,
  ListItemAvatar,
  Link as MUILink,
  Stack,
  List,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';

import { ROUTES } from '../../../../constants/routes';
import { useAuth } from '../../../../providers/auth';
import { Users } from '../../../../services/graphql/types.generated';
import { AvatarFile } from '../../../atoms/avatar-file';

const FollowButtonUser = dynamic<any>(
  () =>
    import('../../../atoms/follow-button-user').then(
      (mod) => mod.FollowButtonUser
    ),
  {
    ssr: false,
  }
);

type Props = {
  users: PartialDeep<Users>[];
};

export function UsersList({ users }: Props) {
  const { me } = useAuth();
  const [filter, setFilter] = useState('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const { t } = useTranslation('user-profile');

  const filteredUsers = useMemo(
    () =>
      filter.length > 0
        ? users.filter(
            (user) =>
              user.username.toLowerCase().includes(filter.toLowerCase()) ||
              user.name.toLowerCase().includes(filter.toLowerCase())
          )
        : users,
    [filter, users]
  );
  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        sx={{ mx: 2, mt: 1 }}
        onChange={handleChange}
        value={filter}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                paddingRight: 1,
              }}
            >
              <SearchIcon
                sx={{
                  color: 'rgba(255, 255, 255, 0.56)',
                }}
              />
            </InputAdornment>
          ),
          fullWidth: true,
          sx: {
            borderRadius: 100,
          },
          size: 'small',
        }}
      />
      <List sx={{ mt: 2, overflowY: 'auto', maxHeight: '60vh' }}>
        {filteredUsers.map((user, index) => {
          const url = ROUTES.PROFILE.replace('[username]', user.username);
          return (
            <Fragment key={index}>
              <ListItem
                secondaryAction={
                  me?.wallet !== user.wallet ? (
                    <FollowButtonUser wallet={user.wallet} variant="outlined" />
                  ) : undefined
                }
              >
                <ListItemAvatar>
                  <Link passHref href={url}>
                    <AvatarFile
                      component="a"
                      file={user.picture}
                      target="_blank"
                    />
                  </Link>
                </ListItemAvatar>
                <Stack direction="column">
                  <Link passHref href={url}>
                    <MUILink
                      color="text.primary"
                      underline="hover"
                      target="_blank"
                    >
                      {user.name}
                    </MUILink>
                  </Link>
                  <Link passHref href={url}>
                    <MUILink
                      variant="body2"
                      color="text.secondary"
                      underline="hover"
                      target="_blank"
                    >
                      {`@${user.username}`}
                    </MUILink>
                  </Link>
                </Stack>
              </ListItem>
              {index !== users.length - 1 && <Divider component="li" />}
            </Fragment>
          );
        })}
        {!filteredUsers.length && filter.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mx: 3 }}>
            {t('connections-modal.no-result', { filter })}
          </Typography>
        )}
      </List>
    </>
  );
}
