import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';










const editProfile = () => {

    useEffect(() => {
        setImage(window.localStorage.getItem('image'));
        setName(window.localStorage.getItem('name'));
        setUsername(window.localStorage.getItem('username'));
    }, [])


    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

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
                                    defaultValue={name ? name : ''}
                                    onChange={(e) => {
                                        window.localStorage.setItem('name', e.target.value);
                                        setName(e.target.value)
                                    }}
                                />
                                <TextField id="outlined-basic" label="USERNAME" variant="outlined"
                                    style={{ width: '100%', marginTop: 20 }}
                                    defaultValue={username ? username : ''}
                                    onChange={(e) => {
                                        window.localStorage.setItem('username', e.target.value);
                                        setUsername(e.target.value)
                                    }}
                                />
                                <TextField
                                    id="standard-textarea"
                                    label="Multiline Placeholder"
                                    multiline
                                    style={{ width: '100%', marginTop: 20 }}
                                    variant="outlined"
                                    defaultValue={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."}
                                />
                            </Box>
                            <Box>
                                <Typography variant="h6" style={{ fontSize: 12, padding: '10px 0' }}>SOCIALS</Typography>
                                <TextField id="outlined-basic" label="EMAIL" variant="outlined"
                                    style={{ width: '100%' }}
                                    defaultValue="Johndoe@gmail.com"
                                />
                                <TextField id="outlined-basic" label="TWITTER" variant="outlined"
                                    style={{ width: '100%', marginTop: 20 }}
                                    defaultValue="www.twitter.com/johndoe"
                                />
                                <TextField id="outlined-basic" label="DISCORD" variant="outlined"
                                    style={{ width: '100%', marginTop: 20 }}
                                    defaultValue="john.doe#1234"
                                />
                                <TextField id="outlined-basic" label="Github" variant="outlined"
                                    style={{ width: '100%', marginTop: 20 }}
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
                                <div style={{ background: "rgba(255,255,255,0.15)", padding: '8px', height: "42px", borderRadius: 100, width: 42, position: 'absolute', right: 10, top: 10, cursor: 'pointer' }} >
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
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <EditIcon />
                                    </label>
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






    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }
}

export default editProfile;