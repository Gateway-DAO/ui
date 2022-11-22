import { useState, ChangeEvent } from 'react';

import {
  Box,
  Button,
  Collapse,
  Stack,
  Typography,
  ToggleButton,
  InputAdornment,
  TextField,
  FormHelperText,
  FormControl,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import EditIcon from '@mui/icons-material/Edit';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { CreateGateData } from './schema';

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.MuiToggleButton-root': {
    fontWeight: 700,
    minWidth: '64px',
    color: '#FFFFFF',
  },
  '&.Mui-selected , &.Mui-selected:hover': {
    border: '2px solid #9A53FF',
  },
}));

const claimLimitValues = [
  { label: '1', value: 1 },
  {
    label: '100',
    value: 100,
  },
  {
    label: '1000',
    value: 1000,
  },
  {
    label: '10000',
    value: 10000,
  },
  {
    label: 'unlimited',
    value: null,
  },
];

export function AdvancedSetting() {
  
  const [collapse, setCollapse] = useState(false);
  const {
    formState: { errors },
    setValue,
    control,
    getValues,
  } = useFormContext<CreateGateData>();

  return (
    <section>
      <Button
        variant="text"
        endIcon={collapse ? <ExpandLess /> : <ExpandMore />}
        onClick={() => setCollapse(!collapse)}
      >
        advanced settings
      </Button>
      <Collapse in={collapse} timeout="auto" unmountOnExit>
        <Stack spacing={3} padding={1}>
          <div>
            <Typography gutterBottom variant="body1">
              Expire date
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              color="text.secondary"
              marginBottom={4}
            >
              Set a expiration date to claim the credential
            </Typography>
            <Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name="expire_date"
                  defaultValue={null}
                  render={({ field }) => (
                    <>
                      <DesktopDatePicker
                        label="Add expire date"
                        inputFormat="MM/DD/YYYY"
                        disablePast
                        value={field?.value}
                        onChange={(date: Date) => field.onChange(date.toISOString())}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </>
                  )}
                />
              </LocalizationProvider>
            </Stack>
          </div>
          <div>
            <Typography gutterBottom variant="body1">
              Amount limit
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              color="text.secondary"
              marginBottom={4}
            >
              Limit amount of people who can claim the credential
            </Typography>
            <Controller
              name="claim_limit"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, value, ref } }) => {
                const isCustomValue = !claimLimitValues.some((btn) => btn.value === value);
                console.log(errors?.claim_limit, value)
                return (
                    <FormControl>
                      <Stack
                        direction={'row'}
                        sx={{
                          flexDirection: { xs: 'column', md: 'row' },
                        }}
                        gap={2}
                      >
                        <>
                          {claimLimitValues.map((btn) => {
                            return (
                              <StyledToggleButton
                                aria-label={btn.label}
                                key={btn.value}
                                value={btn.value}
                                color="primary"
                                size={'medium'}
                                sx={{
                                  px: 3,
                                }}
                                selected={value === btn.value}
                                onClick={() => {
                                  onChange(btn.value);
                                }}
                              >
                                {btn.label}
                              </StyledToggleButton>
                            );
                          })}
                        </>
    
                        <OutlinedInput
                          aria-label="others"
                          key={'cutom-input'}
                          size="small"
                          value={isCustomValue ? value : ''}
                          error={!!errors?.claim_limit}
                          placeholder="OTHERS"
                          type="number"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if(e.target.value === '') {
                              onChange(null);
                            } else {
                              onChange(e.target.valueAsNumber);
                            }
                          }}
                          sx={[
                            isCustomValue && {
                              border: '2px solid #9A53FF',
                            },
                          ]}
                          endAdornment={
                            <InputAdornment position="end">
                              <EditIcon />
                            </InputAdornment>
                          }
                          ref={ref}
                        />
                      </Stack>
                      {!!errors.claim_limit && (
                        <FormHelperText error id="outlined-weight-helper-text">
                          {errors?.claim_limit?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                )
              }}
            />
          </div>
        </Stack>
      </Collapse>
    </section>
  );
}
