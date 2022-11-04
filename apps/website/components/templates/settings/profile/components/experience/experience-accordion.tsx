import { useState } from 'react';

import { PartialDeep } from 'type-fest';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

//date picker components
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AvatarFile } from '../../../../../atoms/avatar-file';
import { Experiences } from '../../../../../../services/graphql/types.generated';
import ExperienceCredential from './experience-credential';

type Props = {
  experience: PartialDeep<Experiences>;
};

export default function ExperienceAccordion({ experience }: Props) {
  const [visible, setVisible] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [contributing, setContributing] = useState(true);

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
          opacity: visible ? '1' : ' 0.4',
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
            <AvatarFile
              file={experience.dao.logo}
              fallback={experience.dao.logo_url}
            >
              {experience.dao.name[0]}
            </AvatarFile>
            <Typography
              sx={{
                fontWeight: '600',
                fontSize: '16px',
                color: '#fff',
              }}
            >
              {experience.dao.name}
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
        <AccordionDetails
          sx={{
            padding: '0!important',
          }}
        >
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
                      '& label.MuiFormLabel-filled': {
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
                      '& label.MuiFormLabel-filled': {
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
          <ExperienceCredential credential={experience.credentials[0]} />
          {/*<Divider light sx={{ width: '100%' }} />
          <ExperienceCredential title="Design Titans" />
          <Divider light sx={{ width: '100%' }} />
            <ExperienceCredential title="Design Titans" />*/}
        </AccordionDetails>
      </Accordion>
    </LocalizationProvider>
  );
}
