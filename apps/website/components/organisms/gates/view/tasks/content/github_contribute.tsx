import { useEffect, useState } from 'react';

import { Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';
import GithubDataCard from '../../../../../../components/organisms/tasks/github-data-card';

const GithubContributeContent = ({
  data,
  completed,
  updatedAt,
  readOnly,
  isLoading,
}) => {
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const { repository_link } = data;

  const [repository, setRepository] = useState({
    name: '',
    description: '',
    language: '',
    html_url: '',
    stargazers_count: 0,
    forks_count: 0,
  });

  useEffect(() => {
    const fetchRepository = async () => {
      const repository_owner = repository_link
        .replace('https://github.com/', '')
        .split('/')[0];
      const repository_name = repository_link
        .replace('https://github.com/', '')
        .split('/')[1];
      const response = await fetch(
        `https://api.github.com/repos/${repository_owner}/${repository_name}`
      );
      const data = await response.json();

      setRepository({
        name: data.name,
        description: data.description,
        language: data.language,
        html_url: data.html_url,
        stargazers_count: data.stargazers_count,
        forks_count: data.forks_count,
      });
    };

    fetchRepository();
  }, [repository_link]);

  return (
    <Stack alignItems="start">
      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          isLoading={isLoading}
        >
          Submit
        </LoadingButton>
      )}
      <Typography variant="body2" padding={'30px 0'}>
        You must contribute to
      </Typography>
      <GithubDataCard data={repository} />
      {completed && !!updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default GithubContributeContent;
