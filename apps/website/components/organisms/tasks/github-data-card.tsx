import Link from 'next/link';

import { AiFillGithub } from 'react-icons/ai';
import { BiGitPullRequest, BiGitRepoForked } from 'react-icons/bi';

import { BookOutlined } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Chip, Divider, Stack, Typography } from '@mui/material';

import * as colors from './colors.json';

type GithubDataProps = {
  name: string;
  description: string;
  language: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
};

type GithubDataCardProps = {
  data: GithubDataProps;
  requested_pr_amount?: number;
};

export default function GithubDataCard({
  data,
  requested_pr_amount,
}: GithubDataCardProps) {
  const repository = {
    name: data?.name || '',
    description: data?.description || '',
    language: data?.language || '',
    url: data?.html_url || '',
    stars_count: data?.stargazers_count || 0,
    forks_count: data?.forks_count || 0,
  };

  return (
    <Stack
      sx={{
        width: '100%',
        color: 'black',
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
    >
      {requested_pr_amount && (
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ padding: '2rem' }}
        >
          <Stack
            flexDirection="row"
            gap={2}
            sx={{
              border: '1px solid #BDBEC0',
              borderRadius: '15px',
              padding: '10px',
            }}
          >
            <BiGitPullRequest fontSize="2rem" />
            <Typography fontSize={20} fontWeight="bold">
              {requested_pr_amount}
            </Typography>
          </Stack>
          <AiFillGithub fontSize="2rem" />
        </Stack>
      )}
      {requested_pr_amount && (
        <Typography variant="body2" sx={{ padding: '1rem 2rem' }}>
          Pull requests created and merged
        </Typography>
      )}
      {requested_pr_amount && (
        <Divider color="#BDBEC0" sx={{ marginTop: '20px' }} />
      )}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
        sx={{ padding: '2rem' }}
      >
        <Stack flexDirection="row" gap={2}>
          <BookOutlined fontSize="medium" />
          <Link passHref href={repository.url}>
            <Typography
              color="blue"
              fontSize={20}
              fontWeight="bold"
              sx={{ cursor: 'pointer' }}
            >
              {repository.name}
            </Typography>
          </Link>
          <Chip
            label="Public"
            variant="outlined"
            sx={{ color: 'black', fontWeight: 'bold' }}
          />
        </Stack>
        {!requested_pr_amount && <AiFillGithub fontSize="2rem" />}
      </Stack>
      <Stack sx={{ padding: '0 2rem' }}>
        <Typography>{repository.description}</Typography>
      </Stack>
      <Stack
        flexDirection="row"
        alignItems="center"
        gap={2}
        sx={{ padding: '2rem' }}
      >
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <CircleIcon
            fontSize="small"
            sx={{ color: colors[repository.language] }}
          />
          <Typography>{repository.language}</Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <StarBorderOutlinedIcon fontSize="small" />
          <Typography>{repository.stars_count}</Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <BiGitRepoForked />
          <Typography>{repository.forks_count}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
