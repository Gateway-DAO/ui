import { useEffect, useState } from 'react';

import { Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';
import GithubConnectionCard from '../../../../../../components/organisms/tasks/github-connection-card';
import GithubDataCard from '../../../../../../components/organisms/tasks/github-data-card';
import { GithubContributeData } from 'apps/website/components/templates/create-gate/schema';
import { useQuery } from '@tanstack/react-query';

type GithubContributeContentProps = {
  data: GithubContributeData;
  completeTask: ({
    githubAccessToken,
    repository_name,
    repository_owner,
  }) => void;
  completed: boolean;
  updatedAt: string;
  readOnly: boolean;
  isLoading: boolean;
};

export default function GithubContributeContent({
  data,
  completeTask,
  completed,
  updatedAt,
  readOnly,
  isLoading,
}: GithubContributeContentProps) {
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const [githubAccessToken, setGithubAccessToken] = useState('');

  const { repository_link } = data;

  const repository_owner = repository_link
    .replace('https://github.com/', '')
    .split('/')[0];
  const repository_name = repository_link
    .replace('https://github.com/', '')
    .split('/')[1];

  const fetchRepository = async () => {
    const response = await fetch(
      `https://api.github.com/repos/${repository_owner}/${repository_name}`
    );
    const data = await response.json();

    return data;
  };

  const { data: repository } = useQuery(['github-data', repository_link], () =>
    fetchRepository()
  );

  useEffect(() => {
    if (window) {
      setGithubAccessToken(
        JSON.parse(window.localStorage.getItem('github_access_token'))
      );
    }
  });

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
              githubAccessToken,
              repository_name,
              repository_owner,
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
}
