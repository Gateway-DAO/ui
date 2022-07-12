import { useState } from 'react';
import {
  Grid,
  Stack,
  Typography,
  Divider,
  Box,
  IconButton,
  TextField,
  Avatar,
  FormControlLabel,
  Checkbox,
  Chip,
} from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//date picker components
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export function Experiences() {
  const [visible, setVisible] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const visiblityHandler = (e) => {
    e.stopPropagation();
    setVisible(!visible);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={6}
      >
        {/* TimeZone */}
        <Grid
          container
          direction={{ xs: 'column', md: 'row' }}
          sx={{ rowGap: '15px', marginTop: '24px', alignItems: 'flex-start' }}
        >
          <Grid item xs={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: '#fff' }}
              ml={{ xs: '0px', md: '40px' }}
            >
              Experience
            </Typography>
          </Grid>
          <Grid item xs={7.5}>
            <Stack gap={2}>
              <Accordion
                sx={{
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #10041C',
                  border: '1px solid rgba(229, 229, 229, 0.12)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '48px 0px',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                  sx={{
                    padding: '0px 66px 0px 16px',
                    [`& .MuiAccordionSummary-content`]: {
                      justifyContent: 'space-between',
                      zIndex: '123',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '16px',
                    }}
                  >
                    <DragIndicatorIcon
                      sx={{
                        margin: '0 3px',
                        color: 'rgba(255, 255, 255, 0.56)',
                      }}
                    ></DragIndicatorIcon>
                    <Avatar></Avatar>
                    <Typography
                      sx={{
                        fontWeight: '600',
                        fontSize: '16px',
                        color: '#fff',
                      }}
                    >
                      City Dao
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{
                      color: 'rgba(255, 255, 255, 0.56)',
                      marginRight: '23px',
                      zIndex: '1000',
                    }}
                    onClick={visiblityHandler}
                  >
                    {visible ? (
                      <Visibility></Visibility>
                    ) : (
                      <VisibilityOff></VisibilityOff>
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  {/*/////////    Dropdown Form   /////////*/}
                  <Stack
                    component="form"
                    padding={{ md: '0 48px', xs: '0 28px' }}
                    gap={2}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        columnGap: '16px',
                        flexDirection: { xs: 'column', md: 'row' },
                      }}
                    >
                      <DatePicker
                        disableFuture
                        label="START DATE"
                        inputFormat="dd-MM-yyyy"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                        }}
                        renderInput={(params) => (
                          <TextField
                            sx={{ width: { xs: '100%', md: '25%' } }}
                            {...params}
                          />
                        )}
                      />
                      <DatePicker
                        disablePast
                        label="END DATE"
                        inputFormat="dd-MM-yyyy"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={endDate}
                        onChange={(date) => {
                          setEndDate(date);
                        }}
                        renderInput={(params) => (
                          <TextField
                            sx={{ width: { xs: '100%', md: '25%' } }}
                            {...params}
                          />
                        )}
                      />
                      <FormControlLabel
                        sx={{ width: { xs: '100%', md: '50%' } }}
                        control={<Checkbox defaultChecked />}
                        label="I’m currently contributing here"
                      />
                    </Box>
                    <TextField
                      multiline
                      minRows={3}
                      required
                      label="DESCRIPTION"
                      id="description"
                    />
                  </Stack>
                  {/*/////////    Dropdown Experiences   /////////*/}
                  <Stack
                    gap={2}
                    display="flex"
                    direction="row"
                    margin="40px 0px 20px 0px"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '19px',
                        alignItems: 'center',
                      }}
                    >
                      <DragIndicatorIcon
                        sx={{
                          color: 'rgba(255, 255, 255, 0.56)',
                        }}
                      ></DragIndicatorIcon>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          columnGap: '12px',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar
                          sx={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '8px',
                          }}
                        ></Avatar>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '16px',
                              color: '#fff',
                            }}
                          >
                            Olympus Odyssey
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '14px',
                              color: 'rgba(255, 255, 255, 0.7)',
                            }}
                          >
                            This is the beginning of your journey in
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '12px',
                        alignItems: 'center',
                      }}
                    >
                      <Chip label="Onboarding" />
                      <Chip label="Beginner" />
                    </Box>
                    <IconButton
                      sx={{
                        color: 'rgba(255, 255, 255, 0.56)',
                        marginRight: '23px',
                        zIndex: '1000',
                      }}
                      onClick={visiblityHandler}
                    >
                      {visible ? (
                        <Visibility></Visibility>
                      ) : (
                        <VisibilityOff></VisibilityOff>
                      )}
                    </IconButton>
                  </Stack>

                  <Divider light sx={{ width: '100%' }} />

                  <Stack
                    gap={2}
                    display="flex"
                    direction="row"
                    margin="20px 0px"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '19px',
                        alignItems: 'center',
                      }}
                    >
                      <DragIndicatorIcon
                        sx={{
                          color: 'rgba(255, 255, 255, 0.56)',
                        }}
                      ></DragIndicatorIcon>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          columnGap: '12px',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar
                          sx={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '8px',
                          }}
                        ></Avatar>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '16px',
                              color: '#fff',
                            }}
                          >
                            Olympus Odyssey
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '14px',
                              color: 'rgba(255, 255, 255, 0.7)',
                            }}
                          >
                            This is the beginning of your journey in
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '12px',
                        alignItems: 'center',
                      }}
                    >
                      <Chip label="Onboarding" />
                      <Chip label="Beginner" />
                    </Box>
                    <IconButton
                      sx={{
                        color: 'rgba(255, 255, 255, 0.56)',
                        marginRight: '23px',
                        zIndex: '1000',
                      }}
                      onClick={visiblityHandler}
                    >
                      {visible ? (
                        <Visibility></Visibility>
                      ) : (
                        <VisibilityOff></VisibilityOff>
                      )}
                    </IconButton>
                  </Stack>

                  <Divider light sx={{ width: '100%' }} />

                  <Stack
                    gap={2}
                    display="flex"
                    direction="row"
                    margin="20px 0px"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '19px',
                        alignItems: 'center',
                      }}
                    >
                      <DragIndicatorIcon
                        sx={{
                          color: 'rgba(255, 255, 255, 0.56)',
                        }}
                      ></DragIndicatorIcon>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          columnGap: '12px',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar
                          sx={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '8px',
                          }}
                        ></Avatar>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '16px',
                              color: '#fff',
                            }}
                          >
                            Olympus Odyssey
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '14px',
                              color: 'rgba(255, 255, 255, 0.7)',
                            }}
                          >
                            This is the beginning of your journey in
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '12px',
                        alignItems: 'center',
                      }}
                    >
                      <Chip label="Onboarding" />
                      <Chip label="Beginner" />
                    </Box>
                    <IconButton
                      sx={{
                        color: 'rgba(255, 255, 255, 0.56)',
                        marginRight: '23px',
                        zIndex: '1000',
                      }}
                      onClick={visiblityHandler}
                    >
                      {visible ? (
                        <Visibility></Visibility>
                      ) : (
                        <VisibilityOff></VisibilityOff>
                      )}
                    </IconButton>
                  </Stack>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #10041C',
                  border: '1px solid rgba(229, 229, 229, 0.12)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '48px 0px',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                  sx={{
                    padding: '0px 66px 0px 16px',
                    [`& .MuiAccordionSummary-content`]: {
                      justifyContent: 'space-between',
                      zIndex: '123',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '16px',
                    }}
                  >
                    <DragIndicatorIcon
                      sx={{
                        margin: '0 3px',
                        color: 'rgba(255, 255, 255, 0.56)',
                      }}
                    ></DragIndicatorIcon>
                    <Avatar></Avatar>
                    <Typography
                      sx={{
                        fontWeight: '600',
                        fontSize: '16px',
                        color: '#fff',
                      }}
                    >
                      Yearn Finance
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{
                      color: 'rgba(255, 255, 255, 0.56)',
                      marginRight: '23px',
                      zIndex: '1000',
                    }}
                    onClick={visiblityHandler}
                  >
                    {visible ? (
                      <Visibility></Visibility>
                    ) : (
                      <VisibilityOff></VisibilityOff>
                    )}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  {/*/////////    Dropdown Form   /////////*/}
                  <Stack
                    component="form"
                    padding={{ md: '0 48px', xs: '0 28px' }}
                    gap={2}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        columnGap: '16px',
                        flexDirection: { xs: 'column', md: 'row' },
                      }}
                    >
                      <DatePicker
                        disableFuture
                        label="START DATE"
                        inputFormat="dd-MM-yyyy"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                        }}
                        renderInput={(params) => (
                          <TextField
                            sx={{ width: { xs: '100%', md: '25%' } }}
                            {...params}
                          />
                        )}
                      />
                      <DatePicker
                        disablePast
                        label="END DATE"
                        inputFormat="dd-MM-yyyy"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={endDate}
                        onChange={(date) => {
                          setEndDate(date);
                        }}
                        renderInput={(params) => (
                          <TextField
                            sx={{ width: { xs: '100%', md: '25%' } }}
                            {...params}
                          />
                        )}
                      />
                      <FormControlLabel
                        sx={{ width: { xs: '100%', md: '50%' } }}
                        control={<Checkbox defaultChecked />}
                        label="I’m currently contributing here"
                      />
                    </Box>
                    <TextField
                      multiline
                      minRows={3}
                      required
                      label="DESCRIPTION"
                      id="description"
                    />
                  </Stack>
                  {/*/////////    Dropdown Experiences   /////////*/}
                  <Stack
                    gap={2}
                    display="flex"
                    direction="row"
                    margin="40px 0px 20px 0px"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '19px',
                        alignItems: 'center',
                      }}
                    >
                      <DragIndicatorIcon
                        sx={{
                          color: 'rgba(255, 255, 255, 0.56)',
                        }}
                      ></DragIndicatorIcon>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          columnGap: '12px',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar
                          sx={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '8px',
                          }}
                        ></Avatar>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '16px',
                              color: '#fff',
                            }}
                          >
                            Olympus Odyssey
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '14px',
                              color: 'rgba(255, 255, 255, 0.7)',
                            }}
                          >
                            This is the beginning of your journey in
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '12px',
                        alignItems: 'center',
                      }}
                    >
                      <Chip label="Onboarding" />
                      <Chip label="Beginner" />
                    </Box>
                    <IconButton
                      sx={{
                        color: 'rgba(255, 255, 255, 0.56)',
                        marginRight: '23px',
                        zIndex: '1000',
                      }}
                      onClick={visiblityHandler}
                    >
                      {visible ? (
                        <Visibility></Visibility>
                      ) : (
                        <VisibilityOff></VisibilityOff>
                      )}
                    </IconButton>
                  </Stack>

                  <Divider light sx={{ width: '100%' }} />

                  <Stack
                    gap={2}
                    display="flex"
                    direction="row"
                    margin="20px 0px"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '19px',
                        alignItems: 'center',
                      }}
                    >
                      <DragIndicatorIcon
                        sx={{
                          color: 'rgba(255, 255, 255, 0.56)',
                        }}
                      ></DragIndicatorIcon>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          columnGap: '12px',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar
                          sx={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '8px',
                          }}
                        ></Avatar>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '16px',
                              color: '#fff',
                            }}
                          >
                            Olympus Odyssey
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '14px',
                              color: 'rgba(255, 255, 255, 0.7)',
                            }}
                          >
                            This is the beginning of your journey in
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '12px',
                        alignItems: 'center',
                      }}
                    >
                      <Chip label="Onboarding" />
                      <Chip label="Beginner" />
                    </Box>
                    <IconButton
                      sx={{
                        color: 'rgba(255, 255, 255, 0.56)',
                        marginRight: '23px',
                        zIndex: '1000',
                      }}
                      onClick={visiblityHandler}
                    >
                      {visible ? (
                        <Visibility></Visibility>
                      ) : (
                        <VisibilityOff></VisibilityOff>
                      )}
                    </IconButton>
                  </Stack>

                  <Divider light sx={{ width: '100%' }} />

                  <Stack
                    gap={2}
                    display="flex"
                    direction="row"
                    margin="20px 0px"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '19px',
                        alignItems: 'center',
                      }}
                    >
                      <DragIndicatorIcon
                        sx={{
                          color: 'rgba(255, 255, 255, 0.56)',
                        }}
                      ></DragIndicatorIcon>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          columnGap: '12px',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar
                          sx={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '8px',
                          }}
                        ></Avatar>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '16px',
                              color: '#fff',
                            }}
                          >
                            Olympus Odyssey
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '14px',
                              color: 'rgba(255, 255, 255, 0.7)',
                            }}
                          >
                            This is the beginning of your journey in
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '12px',
                        alignItems: 'center',
                      }}
                    >
                      <Chip label="Onboarding" />
                      <Chip label="Beginner" />
                    </Box>
                    <IconButton
                      sx={{
                        color: 'rgba(255, 255, 255, 0.56)',
                        marginRight: '23px',
                        zIndex: '1000',
                      }}
                      onClick={visiblityHandler}
                    >
                      {visible ? (
                        <Visibility></Visibility>
                      ) : (
                        <VisibilityOff></VisibilityOff>
                      )}
                    </IconButton>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Grid>
        </Grid>
        <Divider light sx={{ width: '100%' }} />
      </Stack>
    </LocalizationProvider>
  );
}
