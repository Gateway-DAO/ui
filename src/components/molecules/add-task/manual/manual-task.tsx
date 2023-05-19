import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { CircleWithNumber } from '@/components/atoms/circle-with-number';
import { CreateGateData } from '@/components/templates/create-gate/schema';
import TextFieldWithEmoji from '../../form/TextFieldWithEmoji/TextFieldWithEmoji';

export const ManualTask = ({ dragAndDrop, taskId, deleteTask }) => {
  const { t } = useTranslation('gate-new');
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<CreateGateData>();

  const formValues = getValues();

  useEffect(() => {
    if (formValues.tasks[taskId]?.title === '') {
      setValue(`tasks.${taskId}.title`, 'Untitled Task');
    }
    setValue(`tasks.${taskId}.task_type`, 'manual');
  }, [setValue, taskId, formValues.tasks]);

  useEffect(() => {
    setTaskVisible(dragAndDrop);
    setTaskIsMoving(dragAndDrop);
  }, [dragAndDrop]);

  const [taskVisible, setTaskVisible] = useState(true);
  const [taskIsMoving, setTaskIsMoving] = useState(true);

  return (
    <Stack
      sx={(theme) => ({
        padding: '50px',
        border: '2px solid rgba(229, 229, 229, 0.08)',
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), ${theme.palette.background.paper}`,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
          padding: taskIsMoving ? '20px 20px 20px 40px' : '20px',
        },
      })}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        marginBottom={!taskVisible ? '40px' : 0}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          sx={(theme) => ({
            width: '100%',
            mr: '20px',
            [theme.breakpoints.between('md', 'lg')]: {
              margin: '-22px',
            },
            [theme.breakpoints.between('lg', 'xl')]: {
              margin: '-22px',
            },
          })}
        >
          <CircleWithNumber
            number={taskId + 1}
            sx={(theme) => ({
              mr: theme.spacing(3.75),
              marginLeft: 4,
              [theme.breakpoints.down('sm')]: { mr: theme.spacing(2.5) },
            })}
          />
          <Stack>
            <Typography variant="subtitle2">
              {t(`tasks.manual.title`)}
            </Typography>
            <TextField
              variant="standard"
              sx={{
                minWidth: { md: '400px', xs: '110%', lg: '500px' },
                maxWidth: { xs: '100%', md: '110%' },
              }}
              InputProps={{
                style: {
                  fontSize: '20px',
                  fontWeight: 'bolder',
                },
                disableUnderline: true,
                sx: {
                  '&.Mui-focused': {
                    borderBottom: '2px solid #9A53FF',
                  },
                },
              }}
              id="submit-link-title"
              {...register(`tasks.${taskId}.title`)}
              error={!!errors.tasks?.[taskId]?.title}
              helperText={errors.tasks?.[taskId]?.title?.message}
            />
          </Stack>
        </Stack>
        {!taskIsMoving && (
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              [theme.breakpoints.between('md', 'lg')]: {
                marginLeft: '-55px',
              },
              [theme.breakpoints.between('lg', 'xl')]: {
                marginLeft: '-55px',
              },
            })}
          >
            <IconButton
              onClick={() => deleteTask(taskId)}
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                cursor: 'pointer',
                marginRight: '20px',
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              })}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
            {taskVisible ? (
              <IconButton
                onClick={() => setTaskVisible(false)}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  cursor: 'pointer',
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                })}
              >
                <ExpandMore fontSize="medium" />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => setTaskVisible(true)}
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  cursor: 'pointer',
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                })}
              >
                <ExpandLess fontSize="medium" />
              </IconButton>
            )}
          </Box>
        )}
      </Stack>
      <FormControl style={!taskVisible ? {} : { display: 'none' }}>
        <TextFieldWithEmoji
          errors={errors}
          formValues={formValues}
          register={register}
          setValue={setValue}
          taskId={taskId}
        />
        <FormLabel id="demo-radio-buttons-group-label">
          Ask users to submit a
        </FormLabel>

        <Controller
          name={`tasks.${taskId}.task_data.event_type`}
          control={control}
          defaultValue={'send_link'}
          render={({ field }) => (
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              {...field}
            >
              <FormControlLabel
                value="send_link"
                control={<Radio />}
                label="URL link"
              />
              <FormControlLabel
                value="comment"
                control={<Radio />}
                label="Text"
              />
            </RadioGroup>
          )}
        />
      </FormControl>
    </Stack>
  );
};
