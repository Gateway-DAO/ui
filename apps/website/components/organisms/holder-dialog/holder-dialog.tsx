import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import useTranslation from 'next-translate/useTranslation';
import { Dispatch, Fragment, SetStateAction, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from 'react';
import { PartialObjectDeep } from 'type-fest/source/partial-deep';
import { Users } from 'apps/website/services/graphql/types.generated';
import { useAuth } from 'apps/website/providers/auth';
import { ROUTES } from 'apps/website/constants/routes';
import { FollowButtonUser } from '../../atoms/follow-button-user';
import { Link as MUILink } from '@mui/material';
import { AvatarFile } from '../../atoms/avatar-file';
import Link from 'next/link';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  holders: PartialObjectDeep<Users>[];
};

export function HolderDialog({ isOpen, setIsOpen, holders }: Props) {
  const { me } = useAuth();
  const [filter, setFilter] = useState('');
  const { t } = useTranslation('credential');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredUsers = useMemo(
    () =>
      filter.length > 0
        ? holders.filter(
            (holder) =>
              holder.username.toLowerCase().includes(filter.toLowerCase()) ||
              holder.name.toLowerCase().includes(filter.toLowerCase())
          )
        : holders,
    [filter, holders]
  );
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      keepMounted={false}
      fullWidth
    >
      <DialogTitle> {t('holders-dialog.title')} </DialogTitle>
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
        {filteredUsers.map((holder, index) => {
          const url = ROUTES.PROFILE.replace('[username]', holder.username);
          return (
            <Fragment key={index}>
              <ListItem
                secondaryAction={
                  me?.wallet !== holder.wallet ? (
                    <FollowButtonUser
                      wallet={holder.wallet}
                      variant="outlined"
                    />
                  ) : undefined
                }
              >
                <ListItemAvatar>
                  <Link passHref href={url}>
                    <AvatarFile
                      component="a"
                      file={holder.picture}
                      target="_blank"
                      fallback="/avatar.png"
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
                      {holder.name}
                    </MUILink>
                  </Link>
                  <Link passHref href={url}>
                    <MUILink
                      variant="body2"
                      color="text.secondary"
                      underline="hover"
                      target="_blank"
                    >
                      {`@${holder.username}`}
                    </MUILink>
                  </Link>
                </Stack>
              </ListItem>
              {index !== holders.length - 1 && <Divider component="li" />}
            </Fragment>
          );
        })}
        {!filteredUsers.length && filter.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mx: 3 }}>
            {t('holders-dialog.no-result', { filter })}
          </Typography>
        )}
      </List>
      <DialogActions sx={{ pt: 2 }}>
        <Button onClick={() => setIsOpen(false)} variant="contained" fullWidth>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
