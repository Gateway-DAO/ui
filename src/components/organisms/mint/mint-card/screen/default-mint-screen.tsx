import Link from 'next/link';
import { useState } from 'react';

import { ROUTES } from '@/constants/routes';
import { Credentials } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  CardActionArea,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Stack,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Categories } from '../utlis/categories';

export const DefaultMintScreen = ({
  details,
  isProtocol,
}: {
  details: {
    error?: any;
    credential: PartialDeep<Credentials>;
    protocolMintData?: {
      chain: string;
      transaction: string;
    };
  };
  isProtocol?: boolean;
  mint: () => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Link
        href={ROUTES.GATE_PROFILE.replace('[id]', details.credential.gate_id)}
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
      <CardContent sx={{ mt: -2.0 }}>
        <Typography variant="body2" color="text.secondary">
          {details.credential.description.length > 53
            ? details.credential.description.substring(0, 50) + '...'
            : details.credential.description}
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={1} px={2} pt={1} pb={2}>
        {/* we can show maximum 2 categories , when mintProcessStauts is minted*/}
        <Categories categories={details.credential.categories} />
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
          {(isProtocol
            ? !!details.protocolMintData?.transaction
            : details.credential.status == 'minted') && (
            <MenuItem>
              <a
                href={
                  isProtocol
                    ? details.protocolMintData.transaction
                    : details.credential.transaction_url
                }
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
