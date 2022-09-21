import { useEffect, useState } from 'react';

import { Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';
import GithubConnectionCard from '../../../../../../components/organisms/tasks/github-connection-card';
import GithubDataCard from '../../../../../../components/organisms/tasks/github-data-card';

const GithubContributeContent = ({
  data,
  completeTask,
  completed,
  updatedAt,
  readOnly,
  isLoading,
}) => {
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const githubAccessToken = JSON.parse(
    window.localStorage.getItem('github_access_token')
  );
  const { repository_link } = data;

  const [repository, setRepository] = useState({
    name: '',
    description: '',
    language: '',
    html_url: '',
    stargazers_count: 0,
    forks_count: 0,
  });

  const repository_owner = repository_link
    .replace('https://github.com/', '')
    .split('/')[0];
  const repository_name = repository_link
    .replace('https://github.com/', '')
    .split('/')[1];

  useEffect(() => {
    const fetchRepository = async () => {
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
  }, [repository_link, repository_owner, repository_name]);

  return (
    <Stack alignItems="start">
      <Typography variant="body2" padding={'30px 0'}>
        You must contribute to
      </Typography>
      <GithubDataCard data={repository} />
      {!completed && !readOnly && githubAccessToken && (
        <LoadingButton
          isLoading={isLoading}
          variant="contained"
          sx={{
            marginTop: '30px',
          }}
          onClick={() =>
            completeTask({
              info: { githubAccessToken, repository_name, repository_owner },
            })
          }
        >
          Verify
        </LoadingButton>
      )}
      {!completed && !readOnly && !githubAccessToken && (
        <GithubConnectionCard />
      )}
      {completed && !!updatedAt && (
        <Typography
          color="#c5ffe3"
          variant="subtitle2"
          sx={{ paddingTop: '20px' }}
        >
          Task completed at {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default GithubContributeContent;
