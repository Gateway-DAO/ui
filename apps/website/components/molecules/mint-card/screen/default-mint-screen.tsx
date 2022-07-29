import { useRouter } from 'next/router';
import { useState } from 'react';

import copy from 'copy-to-clipboard';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Avatar,
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

import { useAuth } from '../../../../providers/auth';
import { TokenFilled } from '../assets/token-filled';
import { Subjects } from '../index';
import { showCategories } from '../utlis/categories';

export const DefaultMintScreen = ({
  mintProcessStatus,
  setMintProcessStatus,
  details,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { me } = useAuth();
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CardMedia
        component="img"
        height="275"
        image={details.image}
        alt="nft image"
        sx={{ cursor: 'pointer' }}
        onClick={() => router.push(`/credential/${details.id}`)}
      />
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
          details.title.length > 15
            ? details.title.slice(0, 13) + '...'
            : details.title
        }
      />
      {/* TODO: fix the description overflow */}

      <CardContent sx={{ mt: -2.0 }}>
        <Typography variant="body2" color="text.secondary">
          {details.description.length > 70
            ? details.description.substring(0, 67) + '...'
            : details.description}
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={1} px={2} pt={1} pb={2}>
        {me &&
          details.target_id == me?.id &&
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
                    details.nft_url && window.open(details.nft_url, '_blank')
                  }
                >
                  <TokenFilled sx={{ height: 18, width: 18 }} />
                </IconButton>
              </Avatar>
            </Tooltip>
          ))}
        {/* we can show maximum 2 categories , when mintProcessStauts is minted*/}
        {showCategories(mintProcessStatus, details.categories)}
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
          {/* for later use */}
          {/* <MenuItem>
            <ListItemIcon>
              <OpenInNewIcon fontSize="medium" color="disabled" />
            </ListItemIcon>
            Open on Ceramic
          </MenuItem> */}
          <MenuItem
            onClick={() => {
              copy(details.nft_url);
            }}
          >
            <ListItemIcon>
              <ContentCopyIcon fontSize="medium" color="disabled" />
            </ListItemIcon>
            Copy url address
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
