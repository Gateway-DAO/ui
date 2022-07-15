/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import-helpers/order-imports */
/* eslint-disable prettier/prettier */
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//date picker components
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ExperienceCredential from './ExperienceCredential';

export default function ExperienceAccordion(props) {
  const [visible, setVisible] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [contributing, setContributing] = useState(false);

  const visiblityHandler = (e) => {
    e.stopPropagation();
    setVisible(!visible);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          '&.MuiAccordion-root:before': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
          sx={{
            padding: {
              xs: '0px 16px 0px 12px',
              md: '0px 66px 0px 48px',
            },
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
            <Avatar></Avatar>
            <Typography
              sx={{
                fontWeight: '600',
                fontSize: '16px',
                color: '#fff',
              }}
            >
              {props.title}
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
              <Visibility ></Visibility>
            ) : (
              <VisibilityOff></VisibilityOff>
            )}
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          {/*/////////    Dropdown Form   /////////*/}

          <Stack
            component="form"
            padding={{ md: '0 48px', xs: '0 6px' }}
            marginBottom="48px"
            gap={2}
          >
            <Box
              sx={{
                display: 'flex',
                columnGap: '16px',
                rowGap: '16px',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <DatePicker
                disableFuture
                label="Start Date"
                inputFormat="MMM-yyyy"
                openTo="year"
                views={['year', 'month']}
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      width: { xs: '100%', md: '25%' },
                      '& label.Mui-focused': {
                        textTransform: 'uppercase',
                      },
                      '& div fieldset legend span': {
                        marginRight: '6px',
                        paddingRight: '6px',
                      },
                    }}
                    {...params}
                  />
                )}
              />
              <DatePicker
                disabled={contributing ? true : false}
                disablePast
                label="End Date"
                inputFormat="MMM-yyyy"
                openTo="year"
                views={['year', 'month']}
                value={endDate}
                onChange={(date) => {
                  setEndDate(date);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      width: { xs: '100%', md: '25%' },
                      '& label.Mui-focused': {
                        textTransform: 'uppercase',
                      },
                      '& div fieldset legend span': {
                        marginRight: '4px',
                        paddingRight: '4px',
                      },
                    }}
                    {...params}
                  />
                )}
              />
              <FormControlLabel
                sx={{ width: { xs: '100%', md: '50%' } }}
                control={
                  <Checkbox
                    defaultChecked
                    onChange={(e) => setContributing(e.target.checked)}
                  />
                }
                label="I’m currently contributing here"
                on
              />
            </Box>
            <TextField
              multiline
              minRows={3}
              required
              label="Description"
              id="description"
              sx={{
                '& label.Mui-focused': {
                  textTransform: 'uppercase',
                },
                '& div fieldset legend span': {
                  marginRight: '4px',
                  paddingRight: '4px',
                },
              }}
            />
          </Stack>

          {/*/////////  Credentials   /////////*/}
          <ExperienceCredential title="Olympus Odyssey" />
          <Divider light sx={{ width: '100%' }} />
          <ExperienceCredential title="Design Titans" />
          <Divider light sx={{ width: '100%' }} />
          <ExperienceCredential title="Design Titans" />
        </AccordionDetails>
      </Accordion>
    </LocalizationProvider>
  );
}
