import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import { temporaryDropdown } from "apps/website/__mock__/daos";



const editSkills = () => {



    const [arr, setArr] = useState([]);

    const [value, setValue] = useState('');

    const [inputValue, setInputValue] = React.useState('');



    return (
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
                <Typography variant="h4">Edit Skills</Typography>
            </Box>
            <br />
            <br />
            <br />
            <Grid container spacing={5}  >
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">Skills</Typography>
                    <Typography variant="body2" style={{ fontWeight: 300, padding: '2px 0', fontSize: 13 }}>Lorem ispum doler sit amet</Typography>
                </Grid>
                <Grid item xs={12} md={5} >
                    <Box>
                        <Autocomplete
                            id="combo-box-demo"
                            options={temporaryDropdown}
                            sx={{ width: 300 }}

                            value={value}
                            onChange={(event: any, newValue: string | null) => {
                                setValue(newValue);
                            }}



                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}


                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    console.log('working', arr, value, inputValue);
                                    let newArr = [...arr];
                                    newArr.push(value);
                                    setArr(newArr);
                                }
                            }}


                            renderInput={(params) =>
                                <TextField {...params} label="SEARCH" onChange={(e) => {
                                    setValue(e.target.value)
                                    console.log(e.target.value)
                                }} />}
                        />
                        <Box style={{ margin: '20px 0', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} >
                            {
                                arr.map((item) => {
                                    return (
                                        <div
                                            key={item.key}
                                            style={{ borderRadius: 100, display: 'flex', justifyContent: "space-between", alignItems: 'center', background: "rgba(255,255,255, .25)", padding: '6px 12px', marginTop: 10, marginRight: 10 }}
                                        >
                                            <Typography style={{ marginRight: 6, fontSize: 14 }}>{item.label}</Typography>
                                            <CloseIcon style={{ fontSize: 24, marginLeft: 'auto' }}
                                                onClick={() => {
                                                    let newArr = [...arr];
                                                    for (let i = 0; i < newArr.length; i++) {
                                                        if (newArr[i].key === item.key) {
                                                            newArr.splice(i, 1);
                                                        }
                                                    }
                                                    setArr(newArr);
                                                    console.log(newArr);
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                        </Box>
                        <Box>
                            <Typography variant="h6" style={{ fontSize: 14, fontWeight: 600, margin: '10px 2px' }}>RECOMMENDATIONS</Typography>
                        </Box>
                        <Box style={{ margin: '20px 0' }} >
                            <Box style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                                <div style={{ borderRadius: 100, display: 'flex', justifyContent: "space-between", alignItems: 'center', background: "rgba(255,255,255, .25)", padding: ' 6px 12px', marginRight: 10 }}>
                                    <Typography style={{ marginRight: 6, fontSize: 14, fontWeight: 600 }}>Skills 1</Typography>
                                    <CloseIcon style={{ fontSize: 24, fontWeight: 700 }} />
                                </div>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

        </Container>
    );
}

export default editSkills;





const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    }
]