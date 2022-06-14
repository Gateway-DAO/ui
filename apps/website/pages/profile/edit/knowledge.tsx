import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { temporaryKnowledge } from 'apps/website/__mock__/daos';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const EditKnowledge = () => {
  const router = useRouter();
  const [Knowledges, setKnowledges] = useState([]);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <Container>
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
            <Button variant="contained">Save</Button>
          </div>
        </Box>
        <Box>
          <Typography variant="h4">Edit Knowledges</Typography>
        </Box>
        <br />
        <br />
        <br />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Knowledges</Typography>
            <Typography
              variant="body2"
              style={{ fontWeight: 300, padding: '2px 0', fontSize: 13 }}
            >
              Lorem ispum doler sit amet
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Autocomplete
                id="combo-box-demo"
                options={temporaryKnowledge}
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
                    console.log('working', Knowledges, value, inputValue);
                    const newArr = [...Knowledges];
                    newArr.push(value);
                    setKnowledges(newArr);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="SEARCH"
                    onChange={(e) => {
                      setValue(e.target.value);
                      console.log(e.target.value);
                    }}
                  />
                )}
              />

              <Box
                style={{
                  margin: '20px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}
              >
                {Knowledges.map((item) => {
                  return (
                    <div
                      key={item.key}
                      style={{
                        borderRadius: 100,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(255,255,255, .25)',
                        padding: '6px 12px',
                        marginTop: 10,
                        marginRight: 10,
                      }}
                    >
                      <Typography style={{ marginRight: 6, fontSize: 14 }}>
                        {item.label}
                      </Typography>
                      <CloseIcon
                        style={{ fontSize: 24, marginLeft: 'auto' }}
                        onClick={() => {
                          const newArr = [...Knowledges];
                          for (let i = 0; i < newArr.length; i++) {
                            if (newArr[i].key === item.key) {
                              newArr.splice(i, 1);
                            }
                          }
                          setKnowledges(newArr);
                          console.log(newArr);
                        }}
                      />
                    </div>
                  );
                })}
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  style={{ fontSize: 14, fontWeight: 600, margin: '10px 2px' }}
                >
                  RECOMMENDATIONS
                </Typography>
              </Box>
              <Box style={{ margin: '20px 0' }}>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '10px 0',
                  }}
                >
                  <div
                    style={{
                      borderRadius: 100,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(255,255,255, .25)',
                      padding: '10px 12px',
                      marginRight: 10,
                    }}
                  >
                    <Typography style={{ marginRight: 6, fontSize: 13 }}>
                      Skills 1
                    </Typography>
                    <CloseIcon style={{ fontSize: 24 }} />
                  </div>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default EditKnowledge;

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
  },
];
