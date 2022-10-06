import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ChangeEvent, Fragment, useMemo, useState } from 'react';

import { PartialDeep } from 'type-fest';

import SearchIcon from '@mui/icons-material/Search';
import {
  Divider,
  List,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';

import { useAuth } from '../../../../providers/auth';
import { Users } from '../../../../services/graphql/types.generated';

import { UserList } from 'apps/website/components/atoms/users-list';

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
          return (
            <Fragment key={index}>
              <UserList {...{ user, index }} />
              {index !== users?.length - 1 && <Divider />}
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
