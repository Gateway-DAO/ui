import Link from 'next/link';

import { AiFillGithub } from 'react-icons/ai';
import { BiGitRepoForked } from 'react-icons/bi';

import { BookOutlined } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Chip, Stack, Typography } from '@mui/material';

import * as colors from './colors.json';

const GithubDataCard = ({ data }) => {
  const repository = {
    name: data.name || '',
    description: data.description || '',
    language: data.language || '',
    url: data.html_url || '',
    stars_count: data.stargazers_count || 0,
    forks_count: data.forks_count || 0,
  };

  return (
    <Stack
      sx={{ color: 'black', backgroundColor: 'white', borderRadius: '10px' }}
    >
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
        <AiFillGithub fontSize="2rem" />
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
};

export default GithubDataCard;
