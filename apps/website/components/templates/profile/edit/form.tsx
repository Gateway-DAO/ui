import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import { Users } from '../../../../services/graphql/types.generated';
import { EditUserSchema } from './schema';

type Props = {
  userData: Partial<Users>;
  isLoading: boolean;
  onSubmit: (data: EditUserSchema) => void;
};

function readFileDataAsBase64(e) {
  const file = e.target.files[0];

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
}

/*
  TODO: Change hardcoded text to translate
  TODO: Loading submit button
  TODO: Disable submit button on form error
  */

export function Form({ userData, isLoading, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<EditUserSchema>();

  const router = useRouter();

  const [name, setName] = useState(userData.name || '');
  const [username, setUsername] = useState(userData.username || '');
  const [about, setAbout] = useState(userData.about || '');
  const [email, setEmail] = useState(userData.email_address || '');
  const [discord, setDiscord] = useState(userData.discord_id || '');
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');
  const [image, setImage] = useState('/images/home.png');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setImage(window.localStorage.getItem('image'));
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          margin: '30px 0',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '8px',
            height: '42px',
            borderRadius: 100,
          }}
        >
          <ArrowBackIcon />
        </div>
        <div>
          <Button
            variant="outlined"
            style={{ marginRight: 10 }}
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </Box>
      <Box>
        <Typography variant="h4">Edit Profile</Typography>
      </Box>
      <br />
      <br />
      <Box>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Details</Typography>
            {/* <Typography
              variant="body2"
              style={{ fontWeight: 300, padding: '2px 0', fontSize: 13 }}
            >
              Lorem ispum doler sit amet
            </Typography> */}
          </Grid>

          <Grid item xs={12} md={4}>
            <br />
            <TextField
              id="outlined-basic"
              label="DISPLAY NAME"
              variant="outlined"
              style={{ width: '100%' }}
              value={name}
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              onChange={(e) => {
                window.localStorage.setItem('name', e.target.value);
                setName(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="USERNAME"
              variant="outlined"
              style={{ width: '100%', marginTop: 20 }}
              value={username}
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
              onChange={(e) => {
                window.localStorage.setItem('username', e.target.value);
                setUsername(e.target.value);
              }}
            />
            <TextField
              id="standard-textarea"
              label="ABOUT"
              multiline
              minRows={5}
              style={{ width: '100%', marginTop: 20 }}
              variant="outlined"
              {...register('about')}
              error={!!errors.about}
              helperText={errors.about?.message}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
              value={about}
            />
            {/* <Typography
              variant="h6"
              style={{ fontSize: 12, padding: '10px 0' }}
            >
              SOCIALS
            </Typography>
            <TextField
              id="outlined-basic"
              label="EMAIL"
              variant="outlined"
              style={{ width: '100%' }}
              {...register('email_address')}
              error={!!errors.email_address}
              helperText={errors.email_address?.message}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              value={email}
              InputProps={{
                endAdornment: email && (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setEmail('')}
                  >
                    <CancelIcon style={{ color: 'white' }} />
                  </IconButton>
                ),
              }}
            />
            <TextField
              id="outlined-basic"
              label="TWITTER"
              disabled
              variant="outlined"
              style={{ width: '100%', marginTop: 20 }}
              value={twitter}
              onChange={(e) => {
                setTwitter(e.target.value);
              }}
              type="text"
              InputProps={{
                endAdornment: twitter && (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setTwitter('')}
                  >
                    <CancelIcon style={{ color: 'white' }} />
                  </IconButton>
                ),
              }}
            />
            <TextField
              id="outlined-basic"
              label="DISCORD"
              variant="outlined"
              style={{ width: '100%', marginTop: 20 }}
              value={discord}
              {...register('discord_id')}
              error={!!errors.discord_id}
              helperText={errors.discord_id?.message}
              onChange={(e) => {
                setDiscord(e.target.value);
              }}
              type="text"
              InputProps={{
                endAdornment: discord && (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setDiscord('')}
                  >
                    <CancelIcon style={{ color: 'white' }} />
                  </IconButton>
                ),
              }}
            />
            <TextField
              id="outlined-basic"
              label="Github"
              disabled
              variant="outlined"
              style={{ width: '100%', marginTop: 20 }}
              value={github}
              onChange={(e) => {
                setGithub(e.target.value);
              }}
              type="text"
              InputProps={{
                endAdornment: github && (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setGithub('')}
                  >
                    <CancelIcon style={{ color: 'white' }} />
                  </IconButton>
                ),
              }}
            /> */}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                maxWidth: 325,
                borderRadius: '8px',
                margin: 'auto',
                width: '100%',
                position: 'relative',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="320"
                  image={image ? image : '/images/home.png'}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {name ? name : 'Loading....'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {username ? username : 'Loading....'}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <div
                style={{
                  background: '#9A53FF',
                  padding: '8px',
                  height: '42px',
                  borderRadius: 100,
                  width: 42,
                  position: 'absolute',
                  right: 10,
                  bottom: 22,
                  cursor: 'pointer',
                }}
              >
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  style={{ minWidth: 0, padding: 0 }}
                >
                  <EditIcon style={{ color: 'white' }} />
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem>
                    <input
                      type="file"
                      id="profile-image"
                      hidden
                      style={{ width: 42, cursor: 'pointer' }}
                      onChange={(e) => {
                        readFileDataAsBase64(e).then((data: string) => {
                          setImage(data);
                          window.localStorage.setItem('image', data);
                        });
                      }}
                    />
                    <label
                      htmlFor="profile-image"
                      style={{ cursor: 'pointer', width: '100%' }}
                    >
                      Upload
                    </label>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.localStorage.removeItem('image');
                      window.location.reload();
                    }}
                  >
                    Remove Photo
                  </MenuItem>
                  <MenuItem onClick={handleClose} disabled>
                    Select NFT (soon)
                  </MenuItem>
                </Menu>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
