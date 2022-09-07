import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import copy from 'copy-to-clipboard';
import { PartialDeep } from 'type-fest';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Avatar,
  CardActionArea,
  Chip,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { ROUTES } from '../../../../constants/routes';
import { useAuth } from '../../../../providers/auth';
import { Credentials } from '../../../../services/graphql/types.generated';
import { CategoriesList } from '../../categories-list';
import { TokenFilled } from '../assets/token-filled';
import { Subjects } from '../index';
import { Categories } from '../utlis/categories';

export const DefaultMintScreen = ({
  mintProcessStatus,
  setMintProcessStatus,
  details,
}: {
  mintProcessStatus: Subjects;
  setMintProcessStatus: React.Dispatch<React.SetStateAction<Subjects>>;
  details: {
    error?: any;
    credential: PartialDeep<Credentials>;
  };
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { me } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Link
        href={ROUTES.EARNED.replace('[id]', details.credential.id)}
        passHref
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="275"
            image={details.credential.image}
            alt="nft image"
            sx={{ cursor: 'pointer' }}
          />
        </CardActionArea>
      </Link>
      <CardHeader
        action={
          <IconButton
            aria-label="settings"
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'more' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={
          details.credential.name.length > 15
            ? details.credential.name.slice(0, 13) + '...'
            : details.credential.name
        }
      />
      {/* TODO: fix the description overflow */}

      <CardContent sx={{ mt: -2.0 }}>
        <Typography variant="body2" color="text.secondary">
          {details.credential.description.length > 70
            ? details.credential.description.substring(0, 67) + '...'
            : details.credential.description}
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={1} px={2} pt={1} pb={2}>
        {details.credential.target_id === me?.id &&
          (mintProcessStatus === Subjects.default ? (
            <Chip
              key={'mint button'}
              label={'MINT AS NFT'}
              size="small"
              color="primary"
              icon={<TokenFilled height={20} width={20} color="action" />}
              onClick={() => setMintProcessStatus(Subjects.start)}
            />
          ) : (
            <Tooltip title="Verify NFT mint transaction">
              <Avatar sx={{ height: 24, width: 24 }}>
                <IconButton
                  onClick={() =>
                    details.credential.transaction_url &&
                    window.open(details.credential.transaction_url, '_blank')
                  }
                >
                  <TokenFilled sx={{ height: 18, width: 18 }} />
                </IconButton>
              </Avatar>
            </Tooltip>
          ))}
        {/* we can show maximum 2 categories , when mintProcessStauts is minted*/}
        <Categories
          mintProcessStatus={mintProcessStatus}
          categories={details.credential.categories}
        />
      </Stack>
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
          {details.credential.status == 'minted' && (
            <MenuItem>
              <a
                href={details.credential.transaction_url}
                target="_blank"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
                rel="noreferrer"
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
              navigator.clipboard.writeText(
                window.location.protocol +
                  '//' +
                  window.location.hostname +
                  (window.location.port && ':' + window.location.port) +
                  '/credential/' +
                  details.credential.id
              );
            }}
          >
            <ListItemIcon>
              <ContentCopyIcon fontSize="medium" color="disabled" />
            </ListItemIcon>
            Copy URL address
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
