import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ComponentType, useState } from 'react';

import { PartialDeep } from 'type-fest';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  AvatarGroup,
  Chip,
  Grid,
  Stack,
  Typography,
  Divider,
  Tooltip,
  Box,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  IconButton,
  Avatar,
} from '@mui/material';

import { useAuth } from '../../../providers/auth';
import { Credentials } from '../../../services/graphql/types.generated';
import { AvatarFile } from '../../atoms/avatar-file';
import CircularProgressWithLabel from '../../atoms/circular-progress-label';
import { Props as MintCredentialButtonProps } from '../../atoms/mint-button';
import { ReadMore } from '../../atoms/read-more-less';
import { ShareButton } from '../../atoms/share-button';
import { Task, TaskGroup } from '../../organisms/tasks';

const MintCredentialButton: ComponentType<MintCredentialButtonProps> = dynamic(
  () =>
    import('../../atoms/mint-button').then((mod) => mod.MintCredentialButton),
  {
    ssr: false,
  }
);

type Props = {
  credential: PartialDeep<Credentials>;
  openModal: () => void;
};

export function CredentialTemplate({ credential, openModal }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { me, gqlAuthMethods } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      container
      height="100%"
      sx={{ flexWrap: 'nowrap', flexDirection: { xs: 'column', md: 'row' } }}
    >
      <Grid
        item
        xs={12}
        md={5}
        sx={(theme) => ({
          padding: {
            xs: `${theme.spacing(5)} ${theme.spacing(2)}`,
            md: `${theme.spacing(5)} ${theme.spacing(7)}`,
          },
        })}
      >
        {/* DAO info */}
        <Link passHref href={`/dao/${credential?.dao.id}`}>
          <Stack
            direction="row"
            alignItems="center"
            width="fit-content"
            marginBottom={(theme) => theme.spacing(2)}
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                width: '100%',
              },
              cursor: 'pointer',
            })}
          >
            <AvatarFile
              alt={credential?.dao.name}
              file={credential?.dao.logo}
              fallback={credential?.dao.logo_url}
              sx={{
                height: (theme) => theme.spacing(3),
                width: (theme) => theme.spacing(3),
                marginRight: (theme) => theme.spacing(1),
              }}
            />
            <Typography
              variant="body2"
              color={(theme) => theme.palette.text.secondary}
            >
              {credential?.dao.name}
            </Typography>
          </Stack>
        </Link>

        <Typography variant="h4" marginBottom={(theme) => theme.spacing(2)}>
          {credential?.name}
        </Typography>

        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          marginBottom={(theme) => theme.spacing(4)}
        >
          <Box>
            {credential.categories.map((category, idx) => (
              <Chip
                key={'category-' + (idx + 1)}
                label={category}
                sx={{
                  marginRight: (theme) => theme.spacing(1),
                  marginBottom: (theme) => theme.spacing(1),
                }}
              />
            ))}
          </Box>

          <IconButton
            aria-label="settings"
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'more' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar>
              <MoreVertIcon />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            id="more"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            variant={'menu'}
            PaperProps={{
              sx: {
                mt: 1.5,
              },
            }}
          >
            <MenuList>
              {credential.status == 'minted' && (
                <MenuItem>
                  <a
                    href={credential.transaction_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                    }}
                  >
                    <Stack direction="row" alignItems="center">
                      <ListItemIcon>
                        <OpenInNewIcon fontSize="medium" color="disabled" />
                      </ListItemIcon>
                      Open on Explorer
                    </Stack>
                  </a>
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <ListItemIcon>
                  <ContentCopyIcon fontSize="medium" color="disabled" />
                </ListItemIcon>
                Copy URL address
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>

        {credential?.description?.length > 250 ? (
          <ReadMore>{credential?.description}</ReadMore>
        ) : (
          <Typography
            variant="body1"
            marginBottom={(theme) => theme.spacing(4)}
            sx={{ wordBreak: 'break-word' }}
            paragraph={true}
          >
            {credential?.description}
          </Typography>
        )}

        {credential?.target_id == me?.id && (
          <MintCredentialButton credential={credential} />
        )}

        <Box
          component="img"
          src={credential?.image}
          alt={credential?.name + ' image'}
          marginBottom={(theme) => theme.spacing(4)}
          sx={{
            width: '100%',
            borderRadius: (theme) => theme.spacing(1),
          }}
        />

        <Grid
          container
          rowGap={(theme) => theme.spacing(3)}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {credential?.gate?.holders.length > 0 && (
            <>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.text.secondary}
                >
                  Holders
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <AvatarGroup
                  total={
                    credential?.gate?.holders.length >= 5
                      ? 5
                      : credential?.gate?.holders.length
                  }
                  sx={{
                    justifyContent: 'flex-end',
                  }}
                >
                  {credential?.gate?.holders.map((holder) => {
                    return (
                      <Link
                        key={holder.id}
                        passHref
                        href={`/profile/${holder.username}`}
                      >
                        <Tooltip title={holder.name}>
                          <Box component="a" sx={{ display: 'inline-block' }}>
                            <AvatarFile
                              alt={holder.username}
                              file={holder.picture}
                              fallback={holder.pfp || '/logo.png'}
                            />
                          </Box>
                        </Tooltip>
                      </Link>
                    );
                  })}
                </AvatarGroup>
              </Grid>
            </>
          )}
          <Grid item xs={4}>
            <Typography
              variant="body2"
              color={(theme) => theme.palette.text.secondary}
            >
              Skills
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {credential?.skills.map((skill, idx) => (
              <Chip
                key={'skill-' + (idx + 1)}
                label={skill}
                sx={{
                  marginRight: (theme) => theme.spacing(1),
                  marginBottom: (theme) => theme.spacing(1),
                }}
              />
            ))}
          </Grid>
          {credential?.gate?.creator && (
            <>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.text.secondary}
                >
                  Created By
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Link
                  passHref
                  href={`/profile/${credential?.gate?.creator.username}`}
                >
                  <Tooltip title={credential?.gate?.creator.name}>
                    <Box component="a" sx={{ display: 'inline-block' }}>
                      <AvatarFile
                        alt={credential?.gate?.creator.username}
                        file={credential?.gate?.creator.picture}
                        fallback={credential?.gate?.creator.pfp || '/logo.png'}
                      />
                    </Box>
                  </Tooltip>
                </Link>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item xs={12} md>
        {/* Task Counter */}
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            margin: { xs: '16px 16px 40px 16px', md: '60px' },
          }}
        >
          <CircularProgressWithLabel
            variant="determinate"
            value={100}
            label={`${credential?.pow.length}/${credential?.pow.length}`}
            sx={{
              color: '#6DFFB9',
            }}
          />
          <Stack
            sx={{
              marginLeft: (theme) => theme.spacing(4),
            }}
          >
            <Typography variant="h6">Tasks</Typography>
            <Typography variant="caption">
              Completed tasks to earn this credential
            </Typography>
          </Stack>
        </Stack>

        <TaskGroup>
          {credential?.pow.map((task, idx) => (
            <Task
              key={'task-' + (idx + 1)}
              task={task}
              readOnly
              completed={true}
              isAdmin={credential?.target_id == me?.id}
            />
          ))}
        </TaskGroup>
      </Grid>
    </Grid>
  );
}
