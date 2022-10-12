import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { CircleWithNumber } from '../../../atoms/circle-with-number';
import GithubDataCard from '../../../organisms/tasks/github-data-card';
import {
  CreateGateTypes,
  GithubContributeDataError,
} from '../../../templates/create-gate/schema';

type GithubPRTaskProps = {
  taskId: number;
  deleteTask: (taskId: number) => void;
};

export default function GithubPRTask({
  taskId,
  deleteTask,
}: GithubPRTaskProps) {
  const { t } = useTranslation('gate-new');

  const {
    register,
    setValue,
    setError,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<CreateGateTypes>();

  const [title, repository_url] = getValues([
    `tasks.data.${taskId}.title`,
    `tasks.data.${taskId}.task_data.repository_link`,
  ]);

  const fetchRepositoryData = async (repository_url) => {
    if (!repository_url) return;
    const isValid = await trigger(
      `tasks.data.${taskId}.task_data.repository_link`
    );

    if (!isValid) {
      return null;
    }

    const repository_owner = repository_url
      .replace('https://github.com/', '')
      .split('/')[0];
    const repository_name = repository_url
      .replace('https://github.com/', '')
      .split('/')[1];

    const fetch_url = `https://api.github.com/repos/${repository_owner}/${repository_name}`;
    const data = await fetch(fetch_url);

    if (data.status !== 200) {
      setError(`tasks.data.${taskId}.task_data.repository_link`, {
        type: 'custom',
        message: 'Repository private or not found.',
      });

      return null;
    }

    return data.json();
  };

  const { data: githubData, mutate: mutateGithubData } = useMutation(
    ['github-data', repository_url],
    (repository_url) => fetchRepositoryData(repository_url)
  );

  useEffect(() => {
    if (title === '') {
      setValue(`tasks.data.${taskId}.title`, 'Untitled Task');
    }
  }, [setValue, taskId]);

  const [taskVisible, setTaskVisible] = useState(false);

  return (
    <Stack
      sx={(theme) => ({
        padding: '50px',
        border: '2px solid rgba(229, 229, 229, 0.08)',
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), ${theme.palette.background.paper}`,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
          padding: '20px',
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
          sx={{ width: '100%', mr: '20px' }}
        >
          <CircleWithNumber
            number={taskId + 1}
            sx={(theme) => ({
              mr: theme.spacing(3.75),
              [theme.breakpoints.down('sm')]: { mr: theme.spacing(2.5) },
            })}
          />
          <Stack>
            <Typography variant="subtitle2">
              {t('tasks.github_prs.title')}
            </Typography>
            <TextField
              variant="standard"
              autoFocus
              sx={{
                minWidth: { md: '600px', xs: '110%' },
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
              id="task-title"
              {...register(`tasks.data.${taskId}.title`)}
              error={!!errors.tasks?.data?.[taskId]?.title}
              helperText={errors.tasks?.data?.[taskId]?.title?.message}
            />
          </Stack>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
      </Stack>
      <FormControl style={!taskVisible ? {} : { display: 'none' }}>
        <TextField
          required
          multiline
          minRows={3}
          label="Task Description"
          id="task-description"
          {...register(`tasks.data.${taskId}.description`)}
          error={!!errors.tasks?.data?.[taskId]?.description}
          helperText={errors.tasks?.data?.[taskId]?.description?.message}
          sx={{
            marginBottom: '60px',
            '& fieldset legend span': {
              marginRight: '10px',
            },
          }}
        />
        <Typography variant="body1" sx={{ paddingBottom: 2 }}>
          {t('tasks.github_prs.amount_description')}
        </Typography>
        <FormControl>
          <InputLabel htmlFor="requested_pr_amount">
            {t('tasks.github_prs.amount_action')}
          </InputLabel>
          <Select
            id="requested_pr_amount"
            sx={{ maxWidth: { md: '50%', xs: '100%' } }}
            {...register(`tasks.data.${taskId}.task_data.requested_pr_amount`)}
          >
            <MenuItem value={1}>1+</MenuItem>
            <MenuItem value={5}>5+</MenuItem>
            <MenuItem value={10}>10+</MenuItem>
            <MenuItem value={25}>25+</MenuItem>
            <MenuItem value={50}>50+</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body1" sx={{ paddingTop: 4, paddingBottom: 2 }}>
          {t('tasks.github_prs.repository_description')}
        </Typography>
        <TextField
          required
          label="Repository link"
          {...register(`tasks.data.${taskId}.task_data.repository_link`, {
            onBlur: (e) => mutateGithubData(e.target.value),
          })}
          error={
            !!(
              errors.tasks?.data?.[taskId]
                ?.task_data as GithubContributeDataError
            )?.repository_link
          }
          helperText={
            (
              errors.tasks?.data?.[taskId]
                ?.task_data as GithubContributeDataError
            )?.repository_link?.message
          }
          sx={{
            marginBottom: '60px',
            '& fieldset legend span': {
              marginRight: '10px',
            },
          }}
        />
        {githubData && <GithubDataCard data={githubData} />}
      </FormControl>
    </Stack>
  );
}
