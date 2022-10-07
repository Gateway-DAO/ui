import { Stack, Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';
import GithubConnectionCard from '../../../../../../components/organisms/tasks/github-connection-card';
import GithubDataCard from '../../../../../../components/organisms/tasks/github-data-card';
import { GithubPRData } from 'apps/website/components/templates/create-gate/schema';
import { useQuery } from '@tanstack/react-query';
import { useLocalStorage } from 'react-use';

type completeTaskData = {
  githubAccessToken: string;
  repository_name: string;
  repository_owner: string;
  requested_pr_amount: number;
};

type GithubContributeContentProps = {
  data: GithubPRData;
  completeTask: (data: completeTaskData) => void;
  completed: boolean;
  updatedAt: string;
  readOnly: boolean;
  isLoading: boolean;
};

export default function GithubPRContent({
  data,
  completeTask,
  completed,
  updatedAt,
  readOnly,
  isLoading,
}: GithubContributeContentProps) {
  const { t } = useTranslation('gate-profile');

  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const [githubAccessToken, setGithubAccessToken, remove] = useLocalStorage(
    'github_access_token',
    ''
  );
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

    return response.json();
  };

  const { data: repository } = useQuery(['github-data', repository_link], () =>
    fetchRepository()
  );

  return (
    <Stack alignItems="start">
      <Typography variant="body1" padding={'30px 0'}>
        {t('tasks.github_prs.description')}
      </Typography>
      <GithubDataCard
        data={repository}
        requested_pr_amount={data.requested_pr_amount}
      />
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
              requested_pr_amount: data.requested_pr_amount,
            })
          }
        >
          {t('tasks.github_prs.action')}
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
          {t('tasks.completed')} {formattedDate}
        </Typography>
      )}
    </Stack>
  );
}
