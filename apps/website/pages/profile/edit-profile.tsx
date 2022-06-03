import { Box, Button, Container, Grid, InputAdornment, TextField, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';

import CancelIcon from '@mui/icons-material/Cancel';








const editProfile = () => {

    useEffect(() => {
        setImage(window.localStorage.getItem('image'));
        setName(window.localStorage.getItem('name'));
        setUsername(window.localStorage.getItem('username'));
    }, [])


    const [name, setName] = useState('');
    const [username, setUsername] = useState('');


    const [email, setEmail] = useState('');
    const [discord, setDiscord] = useState('');
    const [github, setGithub] = useState('');
    const [twitter, setTwitter] = useState('');

    const [image, setImage] = useState('/images/home.png');


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


    const nameHandler = () => {
        setName('');
    }

    const userNameHandler = () => {
        setUsername('');
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <div>
            <Container>
                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '30px 0' }}>
                    <div style={{ background: "rgba(255,255,255,0.15)", padding: '8px', height: "42px", borderRadius: 100 }} >
                        <ArrowBackIcon />
                    </div>
                    <div>
                        <Button variant="outlined" style={{ marginRight: 10 }}>Cancel</Button>
                        <Button variant="contained">Save</Button>
                    </div>
                </Box>
                <Box>
                    <Typography variant="h4">Edit Profile</Typography>
                </Box>
                <br />
                <br />
                <Box>
                    <Grid container spacing={5}  >
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6">Details</Typography>
                            <Typography variant="body2" style={{ fontWeight: 300, padding: '2px 0', fontSize: 13 }}>Lorem ispum doler sit amet</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} >
                            <Box>

                                <TextField id="outlined-basic" label="DISPLAY NAME" variant="outlined"
                                    style={{ width: '100%' }}
                                    value={name}
                                    onChange={(e) => {
                                        window.localStorage.setItem('name', e.target.value);
                                        setName(e.target.value)
                                    }}
                                />
                                <TextField id="outlined-basic" label="USERNAME" variant="outlined"
                                    style={{ width: '100%', marginTop: 20 }}
                                    value={username}
                                    onChange={(e) => {
                                        window.localStorage.setItem('username', e.target.value);
                                        setUsername(e.target.value)
                                    }}
                                />
                                <TextField
                                    id="standard-textarea"
                                    label="ABOUT"
                                    multiline
                                    style={{ width: '100%', marginTop: 20 }}
                                    variant="outlined"
                                    defaultValue={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."}
                                />
                            </Box>
                            <Box>
                                <Typography variant="h6" style={{ fontSize: 12, padding: '10px 0' }}>SOCIALS</Typography>
                                <Box style={{ position: 'relative' }}>
                                    <TextField id="outlined-basic" label="EMAIL" variant="outlined"
                                        style={{ width: '100%' }}
                                        // defaultValue={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        type="email"
                                        value={email}
                                        InputProps={{
                                            endAdornment: email && (
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setEmail("")}>
                                                    <CancelIcon style={{ color: 'white' }} />
                                                </IconButton>
                                            )
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <TextField id="outlined-basic" label="TWITTER" variant="outlined"
                                        style={{ width: '100%', marginTop: 20 }}
                                        value={twitter}
                                        onChange={(e) => {
                                            setTwitter(e.target.value)
                                        }}
                                        type="text"
                                        InputProps={{
                                            endAdornment: twitter && (
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setTwitter("")}>
                                                    <CancelIcon style={{ color: 'white' }} />
                                                </IconButton>
                                            )
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <TextField id="outlined-basic" label="DISCORD" variant="outlined"
                                        style={{ width: '100%', marginTop: 20 }}
                                        value={discord}
                                        onChange={(e) => {
                                            setDiscord(e.target.value)
                                        }
                                        }
                                        type="text"
                                        InputProps={{
                                            endAdornment: discord && (
                                                <IconButton

                                                    aria-label="toggle password visibility"
                                                    onClick={() => setDiscord("")}>
                                                    <CancelIcon style={{ color: 'white' }} />
                                                </IconButton>
                                            )
                                        }}
                                    />
                                </Box>
                                <TextField id="outlined-basic" label="Github" variant="outlined"
                                    style={{ width: '100%', marginTop: 20 }}
                                    value={github}
                                    onChange={(e) => {
                                        setGithub(e.target.value)
                                    }
                                    }
                                    type="text"
                                    InputProps={{
                                        endAdornment: github && (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setGithub("")}>
                                                <CancelIcon style={{ color: 'white' }} />
                                            </IconButton>
                                        )
                                    }}

                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4} >
                            <Card sx={{ maxWidth: 325, borderRadius: '8px', margin: 'auto', width: '100%', position: 'relative' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="320"
                                        image={image ? image : "/images/home.png"}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {name ? name : "Loading...."}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {username ? username : "Loading...."}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <div style={{ background: "#9A53FF", padding: '8px', height: "42px", borderRadius: 100, width: 42, position: 'absolute', right: 10, bottom: 22, cursor: 'pointer' }} >
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
                                            <input type="file" id="profile-image" hidden
                                                style={{ width: 42, cursor: 'pointer' }}
                                                onChange={(e) => {
                                                    readFileDataAsBase64(e).then((data) => {
                                                        setImage(data);
                                                        window.localStorage.setItem('image', data);
                                                    });
                                                }}
                                            />
                                            <label htmlFor="profile-image"
                                                style={{ cursor: 'pointer', width: '100%' }}
                                            >
                                                Upload
                                            </label>
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            window.localStorage.removeItem('image')
                                            window.location.reload()
                                        }}>Remove Photo</MenuItem>
                                        <MenuItem onClick={handleClose} disabled >Select NFT (soon)</MenuItem>
                                    </Menu>
                                </div>
                            </Card>
                        </Grid>
                    </Grid>

                </Box>
            </Container>
            <div style={{ height: '20vh' }} >

            </div>
        </div >
    );
}

export default editProfile;



{/* <div style={{ background: "#9A53FF", padding: '8px', height: "42px", borderRadius: 100, width: 42, position: 'absolute', right: 10, bottom: 22, cursor: 'pointer' }} >
<input type="file" id="profile-image" hidden
    style={{ width: 42, cursor: 'pointer' }}
    onChange={(e) => {
        readFileDataAsBase64(e).then((data) => {
            setImage(data);
            window.localStorage.setItem('image', data);
        });
    }}
/>
<label htmlFor="profile-image"
    style={{ cursor: 'pointer', }}
>
    <EditIcon />
</label>
</div> */}